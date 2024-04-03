package develop.gateway.service;

import develop.gateway.dto.KafkaMessageDTO;

public record MessageInfo(BaseAction action, KafkaMessageDTO messageDTO, String sessionId) {
}
