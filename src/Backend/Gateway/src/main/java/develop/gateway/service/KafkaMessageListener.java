package develop.gateway.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaMessageListener {
    private final SimpMessagingTemplate template;

    public KafkaMessageListener(SimpMessagingTemplate template) {
        this.template = template;
    }

    @KafkaListener(topics = "message-info-topic", groupId = "gateway-service", containerFactory = "kafkaListenerContainerFactoryMessage")
    public void listenMessage(MessageInfo messageInfo) {
        System.out.println("Received message: " + messageInfo.messageDTO().text());
        var messageDto = messageInfo.messageDTO();
        template.convertAndSendToUser(
                messageInfo.messageDTO().tempId(),
                "/" + messageInfo.messageDTO().userId() +"/topic/message/",
                new MessageResponseDTO(messageDto.id(),
                        messageDto.tempId(),
                        messageDto.userId(),
                        messageDto.chatId(),
                        messageDto.text())
        );
    }
}
