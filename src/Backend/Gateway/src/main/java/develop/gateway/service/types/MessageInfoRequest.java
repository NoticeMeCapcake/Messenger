package develop.gateway.service.types;

import develop.gateway.dto.KafkaMessageDTO;
import develop.gateway.service.BaseAction;

public record MessageInfoRequest(BaseAction action, KafkaMessageDTO messageDTO, String sessionId) {
}
