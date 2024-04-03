package develop.gateway.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Component;

import java.security.Principal;

@Component
@Slf4j
public class KafkaMessageListener {
    private final SimpMessagingTemplate template;

    public KafkaMessageListener(SimpMessagingTemplate template) {
        this.template = template;
    }

    @KafkaListener(topics = "message-info-topic", groupId = "gateway-service", containerFactory = "kafkaListenerContainerFactoryMessage")
    public void listenMessage(MessageInfo messageInfo) {
        log.info("Received message: " + messageInfo.messageDTO().text());
        var messageDto = messageInfo.messageDTO();
        log.info("/user/"+messageInfo.sessionId()+"/queue/message" + messageInfo.messageDTO().tempId());
        template.convertAndSend(
                "/queue/message" + messageDto.tempId() + "-user" + messageInfo.sessionId(),
                new MessageResponseDTO(messageDto.id(),
                        messageDto.tempId(),
                        messageDto.userId(),
                        messageDto.chatId(),
                        messageDto.text())
        );
    }
}
