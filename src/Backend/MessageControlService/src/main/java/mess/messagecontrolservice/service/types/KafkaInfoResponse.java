package mess.messagecontrolservice.service.types;

import mess.messagecontrolservice.service.BaseAction;

public record KafkaInfoResponse<TDto>(BaseAction action, TDto[] messageDTO, String sessionId) {
}
