package mess.messagecontrolservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mess.messagecontrolservice.dto.KafkaChatDTO;
import mess.messagecontrolservice.dto.KafkaMessageDTO;
import mess.messagecontrolservice.service.actionresolvers.ChatActionResolver;
import mess.messagecontrolservice.service.actionresolvers.MessageActionResolver;
import mess.messagecontrolservice.service.types.KafkaInfoRequest;
import mess.messagecontrolservice.service.types.KafkaInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class MessageConsumer {
    private final MessageProducer messageProducer;
    private final MessageActionResolver messageActionResolver;
    private final ChatActionResolver chatActionResolver;


    @KafkaListener(topics = "test-process-message", groupId = "message-control-service", containerFactory = "kafkaListenerContainerFactoryMessage")
    public void listenMessage(KafkaInfoRequest<KafkaMessageDTO> messageInfo) {
        log.info("Received message: " + messageInfo.messageDTO().text());
        var messageDTOs = (KafkaMessageDTO[]) messageActionResolver.resolveAction(messageInfo);

        messageProducer.sendMessage("message-info-topic", new KafkaInfoResponse<>(
                messageInfo.action(),
                messageDTOs,
                messageInfo.sessionId()
        ));
    }

    @KafkaListener(topics = "test-process-chat", groupId = "message-control-service", containerFactory = "kafkaListenerContainerFactoryChat")
    public void listenChat(KafkaInfoRequest<KafkaChatDTO> messageInfo) {
        log.info("Received chat: " + messageInfo.messageDTO().chatName());
        var messageDTOs = (KafkaChatDTO[]) chatActionResolver.resolveAction(messageInfo);

        messageProducer.sendMessage("chat-info-topic", new KafkaInfoResponse<>(
                messageInfo.action(),
                messageDTOs,
                messageInfo.sessionId()
        ));
    }

}