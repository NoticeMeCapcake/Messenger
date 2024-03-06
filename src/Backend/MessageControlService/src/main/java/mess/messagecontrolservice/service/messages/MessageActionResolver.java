package mess.messagecontrolservice.service.messages;

import mess.messagecontrolservice.dto.KafkaMessageDTO;
import mess.messagecontrolservice.entity.MessageEntity;
import mess.messagecontrolservice.repository.MessageRepository;
import mess.messagecontrolservice.service.KafkaMessageInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.function.Consumer;

public class MessageActionResolver {
    @Autowired
    private static MessageRepository repository;

    public static void resolveAction(KafkaMessageInfo messageInfo) {
        Consumer<KafkaMessageDTO> consumer = switch (messageInfo.action()) {
            case create -> MessageActionResolver::doCreate;
            case get -> MessageActionResolver::doGet;
            case update -> MessageActionResolver::doUpdate;
            case delete -> MessageActionResolver::doDelete;
        };
        doAction(consumer, messageInfo.messageDTO());
    }

    public static void doAction(Consumer<KafkaMessageDTO> action, KafkaMessageDTO messageDTO) {
        action.accept(messageDTO);
    }

    private static void doCreate(KafkaMessageDTO messageDTO) { // todo: check for exceptions
        repository.insert(MessageEntity.builder()
                .text(messageDTO.text())
                .isRead(false)
                .userId(messageDTO.userId())
                .chatId(messageDTO.chatId())
                .build()
        );
    }

    private static void doUpdate(KafkaMessageDTO messageDTO) {
        var entity = repository.findById(messageDTO.id()).orElseThrow();
        entity.setText(messageDTO.text());
        repository.save(entity);
    }

    private static void doDelete(KafkaMessageDTO messageDTO) {
        repository.deleteById(messageDTO.id());
    }

    private static void doGet(KafkaMessageDTO messageDTO) {  // todo: change for kafka producer
        repository.findById(messageDTO.id()).orElseThrow();
    }
}
