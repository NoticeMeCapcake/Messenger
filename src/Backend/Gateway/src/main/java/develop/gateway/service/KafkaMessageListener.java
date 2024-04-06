package develop.gateway.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Slf4j
public class KafkaMessageListener {
    private final SimpMessagingTemplate template;

    public KafkaMessageListener(SimpMessagingTemplate template) {
        this.template = template;
    }

    @KafkaListener(topics = "message-info-topic", groupId = "gateway-service", containerFactory = "kafkaListenerContainerFactoryMessage")
    public void listenMessage(MessageInfoResponse messageInfo) {
        log.info("Received message: " + messageInfo.messageDTO()[0].text());
        var messageDto = messageInfo.messageDTO();
        template.convertAndSend(
                "/queue/message" + (messageInfo.action() == BaseAction.getAll
                        ? "/all" + messageDto[0].chatId()
                        : (messageInfo.action() == BaseAction.delete
                        ? "/delete" + messageDto[0].id()
                        : messageDto[0].tempId())) + "-user" + messageInfo.sessionId(),
                messageInfo.action() == BaseAction.getAll
                        ? Arrays.stream(messageDto).map(message ->
                            new MessageResponseDTO(message.id(),
                            message.tempId(),
                            message.userId(),
                            message.chatId(),
                            message.text(),
                            message.createdAt()))
                        : new MessageResponseDTO(messageDto[0].id(),
                        messageDto[0].tempId(),
                        messageDto[0].userId(),
                        messageDto[0].chatId(),
                        messageDto[0].text(),
                        messageDto[0].createdAt())
        );
    }
}
