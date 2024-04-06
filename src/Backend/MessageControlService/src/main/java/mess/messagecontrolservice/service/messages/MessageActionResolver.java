package mess.messagecontrolservice.service.messages;

import mess.messagecontrolservice.dto.KafkaMessageDTO;
import mess.messagecontrolservice.entity.MessageEntity;
import mess.messagecontrolservice.repository.MessageRepository;
import mess.messagecontrolservice.service.KafkaMessageInfoRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@Scope("singleton")
public class MessageActionResolver {
    private static MessageRepository repository;

    private MessageActionResolver(@Autowired MessageRepository _repository) {
        repository = _repository;
    }

    public static Object resolveAction(KafkaMessageInfoRequest messageInfo) {
        Function<KafkaMessageDTO, Object> action = switch (messageInfo.action()) {
            case create -> MessageActionResolver::doCreate;
            case get -> MessageActionResolver::doGet;
            case getAll -> MessageActionResolver::doGetAll;
            case update -> MessageActionResolver::doUpdate;
            case delete -> MessageActionResolver::doDelete;
        };
        return doAction(action, messageInfo.messageDTO());
    }

    public static Object doAction(Function<KafkaMessageDTO, Object> action, KafkaMessageDTO messageDTO) {
        return action.apply(messageDTO);
    }

    private static Object doCreate(KafkaMessageDTO messageDTO) { // todo: check for exceptions
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

    private static Object doUpdate(KafkaMessageDTO messageDTO) {
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

    private static Object doDelete(KafkaMessageDTO messageDTO) {
        repository.deleteById(messageDTO.id());
        return new KafkaMessageDTO[]{messageDTO};
    }

    private static Object doGet(KafkaMessageDTO messageDTO) {
        var entity = repository.findById(messageDTO.id()).orElseThrow();
        return new KafkaMessageDTO[]{new KafkaMessageDTO(entity.getId(),
                null,
                entity.getUserId(),
                entity.getChatId(),
                entity.getText(),
                entity.getCreatedAt().toEpochSecond(ZoneOffset.UTC))};
    }
    private static Object doGetAll(KafkaMessageDTO messageDTO) {
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
