package mess.messagecontrolservice.service;

import mess.messagecontrolservice.dto.KafkaMessageDTO;

public record KafkaMessageInfoRequest(BaseAction action, KafkaMessageDTO messageDTO, String sessionId) {
}
