package mess.messagecontrolservice.service;

import mess.messagecontrolservice.entity.MessageEntity;
import mess.messagecontrolservice.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class MessageConsumer {
    @Autowired
    private MessageRepository messageRepository;

    @KafkaListener(topics = "my-topic", groupId = "my-group-id")
    public void listen(String message) {
        System.out.println("Received message: " + message);
        messageRepository.save(MessageEntity.builder().text(message).isRead(false).userId("1").build());
    }

}