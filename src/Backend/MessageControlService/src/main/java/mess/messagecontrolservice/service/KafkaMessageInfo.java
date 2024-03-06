package mess.messagecontrolservice.service;

import mess.messagecontrolservice.dto.KafkaMessageDTO;

public record KafkaMessageInfo(BaseAction action, KafkaMessageDTO messageDTO) {
}
