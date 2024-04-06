package develop.gateway.service;

import develop.gateway.dto.KafkaMessageDTO;

public record MessageInfoResponse(BaseAction action, KafkaMessageDTO[] messageDTO, String sessionId) {
}
