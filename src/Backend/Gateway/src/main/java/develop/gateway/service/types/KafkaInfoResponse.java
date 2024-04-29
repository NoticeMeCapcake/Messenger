package develop.gateway.service.types;

import develop.gateway.service.BaseAction;

public record KafkaInfoResponse<TDto>(BaseAction action, TDto[] messageDTO, String sessionId) {
}
