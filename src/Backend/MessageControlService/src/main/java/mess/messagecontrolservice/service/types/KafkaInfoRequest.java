package mess.messagecontrolservice.service.types;

import mess.messagecontrolservice.service.BaseAction;

public record KafkaInfoRequest<TDto>(BaseAction action, TDto messageDTO, String sessionId) {
}
