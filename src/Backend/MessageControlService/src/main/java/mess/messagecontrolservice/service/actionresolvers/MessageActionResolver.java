package mess.messagecontrolservice.service.actionresolvers;

import lombok.RequiredArgsConstructor;
import mess.messagecontrolservice.dto.KafkaMessageDTO;
import mess.messagecontrolservice.entity.MessageEntity;
import mess.messagecontrolservice.repository.MessageRepository;
import mess.messagecontrolservice.service.types.KafkaInfoRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.time.ZoneOffset;
import java.util.function.Function;

@Component
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@Scope("prototype")
public class MessageActionResolver {
    private final MessageRepository repository;

    public Object resolveAction(KafkaInfoRequest<KafkaMessageDTO> messageInfo) {
        Function<KafkaMessageDTO, Object> action = switch (messageInfo.action()) {
            case create -> this::doCreate;
            case get -> this::doGet;
            case getAll -> this::doGetAll;
            case update -> this::doUpdate;
            case delete -> this::doDelete;
        };
        return doAction(action, messageInfo.messageDTO());
    }

    public Object doAction(Function<KafkaMessageDTO, Object> action, KafkaMessageDTO messageDTO) {
        return action.apply(messageDTO);
    }

    private Object doCreate(KafkaMessageDTO messageDTO) { // todo: check for exceptions
        var insertingObject = MessageEntity.builder()
                .text(messageDTO.text())
                .isRead(false)
                .userId(messageDTO.userId())
                .chatId(messageDTO.chatId())
                .build();
        repository.insert(insertingObject);

        return new KafkaMessageDTO[]{new KafkaMessageDTO(insertingObject.getId(),
                messageDTO.tempId(),
                messageDTO.userId(),
                messageDTO.chatId(),
                messageDTO.text(),
                insertingObject.getCreatedAt().toEpochSecond(ZoneOffset.UTC))};
    }

    private Object doUpdate(KafkaMessageDTO messageDTO) {
        var entity = repository.findById(messageDTO.id()).orElseThrow();
        entity.setText(messageDTO.text());
        repository.save(entity);
        return new KafkaMessageDTO[]{new KafkaMessageDTO(entity.getId(),
                messageDTO.tempId(),
                messageDTO.userId(),
                messageDTO.chatId(),
                messageDTO.text(),
                entity.getCreatedAt().toEpochSecond(ZoneOffset.UTC))};
    }

    private Object doDelete(KafkaMessageDTO messageDTO) {
        repository.deleteById(messageDTO.id());
        return new KafkaMessageDTO[]{messageDTO};
    }

    private Object doGet(KafkaMessageDTO messageDTO) {
        var entity = repository.findById(messageDTO.id()).orElseThrow();
        return new KafkaMessageDTO[]{new KafkaMessageDTO(entity.getId(),
                null,
                entity.getUserId(),
                entity.getChatId(),
                entity.getText(),
                entity.getCreatedAt().toEpochSecond(ZoneOffset.UTC))};
    }
    private Object doGetAll(KafkaMessageDTO messageDTO) {
        var entities = repository.getAllByChatId(messageDTO.chatId());
        return entities.stream().map(
                entity -> new KafkaMessageDTO(entity.getId(),
                        null,
                        entity.getUserId(),
                        entity.getChatId(),
                        entity.getText(),
                        entity.getCreatedAt().toEpochSecond(ZoneOffset.UTC)))
                .toList()
                .toArray(new KafkaMessageDTO[0]);
    }
}
