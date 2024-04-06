package mess.messagecontrolservice.service;

import mess.messagecontrolservice.dto.KafkaMessageDTO;

public record KafkaMessageInfoResponse(BaseAction action, KafkaMessageDTO[] messageDTO, String sessionId) {
}
