package develop.gateway.service.types;

import develop.gateway.service.BaseAction;

public record KafkaInfoRequest<TDto>(BaseAction action, TDto messageDTO, String sessionId) {
}
