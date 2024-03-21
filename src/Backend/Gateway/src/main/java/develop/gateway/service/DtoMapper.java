package develop.gateway.service;

import develop.gateway.dto.KafkaMessageDTO;
import develop.gateway.dto.message.MessageWsRequestDTO;
import org.springframework.stereotype.Service;

@Service
public class DtoMapper {
    public MessageInfo messageRequestToMessageInfo(MessageWsRequestDTO request, BaseAction action) {
        return new MessageInfo(
                action,
                new KafkaMessageDTO(
                        null,
                        request.text(),
                        request.userId(),
                        request.chatId(),
                        null
                )
        );
    }
}
