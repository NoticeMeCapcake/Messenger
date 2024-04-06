package mess.messagecontrolservice.service;

import lombok.extern.slf4j.Slf4j;
import mess.messagecontrolservice.dto.KafkaMessageDTO;
import mess.messagecontrolservice.entity.MessageEntity;
import mess.messagecontrolservice.repository.ChatRepository;
import mess.messagecontrolservice.repository.MessageRepository;
import mess.messagecontrolservice.service.messages.MessageActionResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Component
@Slf4j
public class MessageConsumer {
    @Autowired
    private MessageProducer messageProducer;


    @KafkaListener(topics = "test-process-message", groupId = "message-control-service", containerFactory = "kafkaListenerContainerFactoryMessage")
    public void listenMessage(KafkaMessageInfoRequest messageInfo) {
        log.info("Received message: " + messageInfo.messageDTO().text());
        var messageDTOs = (KafkaMessageDTO[]) MessageActionResolver.resolveAction(messageInfo);
//        log.info(LocalDateTime.ofEpochSecond(messageDto.createdAt(), 0, ZoneOffset.UTC).toString());
        messageProducer.sendMessage("message-info-topic", new KafkaMessageInfoResponse(
                messageInfo.action(),
                messageDTOs,
                messageInfo.sessionId()
        ));
    }

//    @KafkaListener(topics = "process-chat", groupId = "message-control-service", containerFactory = "kafkaListenerContainerFactoryChat")
//    public void listenChat(String message) {
//        System.out.println("Received message: " + message);
//        messageRepository.save(MessageEntity.builder().text(message).isRead(false).userId("1").build());
//    }

}