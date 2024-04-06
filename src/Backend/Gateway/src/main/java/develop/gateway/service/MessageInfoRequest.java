package develop.gateway.service;

import develop.gateway.dto.KafkaMessageDTO;

public record MessageInfoRequest(BaseAction action, KafkaMessageDTO messageDTO, String sessionId) {
}
