package develop.gateway.service;

import develop.gateway.dto.KafkaChatDTO;
import develop.gateway.dto.KafkaMessageDTO;
import develop.gateway.service.types.KafkaInfoResponse;
import develop.gateway.service.types.MessageResponseDTO;
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

    private String resolveUrl(KafkaInfoResponse<KafkaMessageDTO> messageInfo) {
        var messageDto = messageInfo.messageDTO()[0];

        var action = messageInfo.action();

        return "/queue/message" + (action == BaseAction.getAll
                ? "/all" + messageDto.chatId()
                : action == BaseAction.create
                ? messageDto.tempId()
                : messageDto.id()) + "-user" + messageInfo.sessionId();
    }

    private String resolveChatUrl(KafkaInfoResponse<KafkaChatDTO> messageInfo) {
        var messageDto = messageInfo.messageDTO()[0];

        var action = messageInfo.action();

        return "/queue/chat" + (action == BaseAction.getAll
                ? "/all" + messageDto.userId()
                : action == BaseAction.create
                ? messageDto.tempId()
                : messageDto.id()) + "-user" + messageInfo.sessionId();
    }

    @KafkaListener(topics = "message-info-topic", groupId = "gateway-service", containerFactory = "kafkaListenerContainerFactoryMessage")
    public void listenMessage(KafkaInfoResponse<KafkaMessageDTO> messageInfo) {
        log.info("Received message: {}", messageInfo.messageDTO()[0].text());
        var messageDto = messageInfo.messageDTO();
        template.convertAndSend(
                resolveUrl(messageInfo),
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

    @KafkaListener(topics = "chat-info-topic", groupId = "gateway-service", containerFactory = "kafkaListenerContainerFactoryChat")
    public void listenChat(KafkaInfoResponse<KafkaChatDTO> messageInfo) {
        log.info("Received chat: {}", messageInfo.messageDTO()[0].chatName());
        var messageDto = messageInfo.messageDTO();
        template.convertAndSend(
                resolveChatUrl(messageInfo),
                messageInfo.action() == BaseAction.getAll
                        ? messageDto
                        : messageDto[0]
        );
    }
}
