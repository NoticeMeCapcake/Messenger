package mess.messagecontrolservice.service.types;

import mess.messagecontrolservice.dto.KafkaMessageDTO;
import mess.messagecontrolservice.service.BaseAction;

public record KafkaMessageInfoRequest(BaseAction action, KafkaMessageDTO messageDTO, String sessionId) {
}
