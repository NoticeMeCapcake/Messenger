package mess.messagecontrolservice.service.messages;

import mess.messagecontrolservice.dto.KafkaMessageDTO;
import mess.messagecontrolservice.entity.MessageEntity;
import mess.messagecontrolservice.repository.MessageRepository;
import mess.messagecontrolservice.service.KafkaMessageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@Scope("singleton")
public class MessageActionResolver {
    private static MessageRepository repository;

    private MessageActionResolver(@Autowired MessageRepository _repository) {
        repository = _repository;
    }

    public static Object resolveAction(KafkaMessageInfo messageInfo) {
        Function<KafkaMessageDTO, Object> action = switch (messageInfo.action()) {
            case create -> MessageActionResolver::doCreate;
            case get -> MessageActionResolver::doGet;
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
        return new KafkaMessageDTO(insertingObject.getId(),
                messageDTO.tempId(),
                messageDTO.tempId(),
                messageDTO.chatId(),
                messageDTO.text(),
                insertingObject.getCreatedAt());
    }

    private static Object doUpdate(KafkaMessageDTO messageDTO) {
        var entity = repository.findById(messageDTO.id()).orElseThrow();
        entity.setText(messageDTO.text());
        repository.save(entity);
        return new KafkaMessageDTO(entity.getId(),
                messageDTO.tempId(),
                messageDTO.tempId(),
                messageDTO.chatId(),
                messageDTO.text(),
                entity.getCreatedAt());
    }

    private static Object doDelete(KafkaMessageDTO messageDTO) {
        repository.deleteById(messageDTO.id());
        return messageDTO;
    }

    private static Object doGet(KafkaMessageDTO messageDTO) {  // todo: change for kafka producer
        var entity = repository.findById(messageDTO.id()).orElseThrow();
        return new KafkaMessageDTO(entity.getId(),
                messageDTO.tempId(),
                messageDTO.tempId(),
                messageDTO.chatId(),
                messageDTO.text(),
                entity.getCreatedAt());
    }
}
