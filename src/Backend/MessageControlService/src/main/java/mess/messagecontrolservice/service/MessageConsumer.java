package mess.messagecontrolservice.service;

import mess.messagecontrolservice.entity.MessageEntity;
import mess.messagecontrolservice.repository.ChatRepository;
import mess.messagecontrolservice.repository.MessageRepository;
import mess.messagecontrolservice.service.messages.MessageActionResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class MessageConsumer {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatRepository chatRepository;


    @KafkaListener(topics = "test-process-message", groupId = "message-control-service", containerFactory = "kafkaListenerContainerFactoryMessage")
    public void listenMessage(KafkaMessageInfo messageInfo) {
        System.out.println("Received message: " + messageInfo.messageDTO().text());
        MessageActionResolver.resolveAction(messageInfo);
    }
//    @KafkaListener(topics = "process-chat", groupId = "message-control-service", containerFactory = "kafkaListenerContainerFactoryChat")
//    public void listenChat(String message) {
//        System.out.println("Received message: " + message);
//        messageRepository.save(MessageEntity.builder().text(message).isRead(false).userId("1").build());
//    }

}