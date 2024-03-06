package develop.gateway.service;

import develop.gateway.dto.KafkaMessageDTO;
import lombok.Getter;


public record MessageInfo(BaseAction action, KafkaMessageDTO messageDTO) {
}
