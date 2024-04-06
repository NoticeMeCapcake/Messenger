package develop.gateway.service;

import develop.gateway.dto.KafkaMessageDTO;
import develop.gateway.dto.message.MessageWsRequestDTO;
import org.springframework.stereotype.Service;

@Service
public class DtoMapper {
    public MessageInfoRequest messageRequestToMessageInfo(String sessionId, MessageWsRequestDTO request, BaseAction action) {
        return new MessageInfoRequest(
                action,
                new KafkaMessageDTO(
                        null,
                        request.tempId(),
                        request.text(),
                        request.userId(),
                        request.chatId(),
                        0

                ),
                sessionId
        );
    }
}
