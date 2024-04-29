package develop.gateway.service;

import develop.gateway.dto.ChatWsRequestDTO;
import develop.gateway.dto.KafkaChatDTO;
import develop.gateway.dto.KafkaMessageDTO;
import develop.gateway.dto.MessageWsRequestDTO;
import develop.gateway.service.types.KafkaInfoRequest;
import develop.gateway.service.types.MessageInfoRequest;
import org.springframework.stereotype.Service;

@Service
public class DtoMapper {
    public KafkaInfoRequest<KafkaMessageDTO> messageRequestToMessageInfo(String sessionId, MessageWsRequestDTO request, BaseAction action) {
        return new KafkaInfoRequest<>(
                action,
                new KafkaMessageDTO(
                        request.id(),
                        request.tempId(),
                        request.text(),
                        request.userId(),
                        request.chatId(),
                        0
                ),
                sessionId
        );
    }

    public KafkaInfoRequest<KafkaMessageDTO> messageRequestToMessageInfo(String sessionId, MessageWsRequestDTO request) {
        return messageRequestToMessageInfo(sessionId, request, request.action());
    }

    public KafkaInfoRequest<KafkaChatDTO> ChatRequestToChatInfo(String sessionId, ChatWsRequestDTO request, BaseAction action) {
        return new KafkaInfoRequest<>(
                action,
                new KafkaChatDTO(
                        request.id(),
                        request.tempId(),
                        request.chatName(),
                        request.userIds(),
                        request.userId(),
                        request.chatType()
                ),
                sessionId
        );
    }

    public KafkaInfoRequest<KafkaChatDTO> ChatRequestToChatInfo(String sessionId, ChatWsRequestDTO request) {
        return ChatRequestToChatInfo(sessionId, request, request.action());
    }
}
