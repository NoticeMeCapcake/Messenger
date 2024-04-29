package develop.gateway.dto;

import develop.gateway.service.BaseAction;

public record MessageWsRequestDTO(String text, String userId, String chatId, String id, String tempId, BaseAction action) {
}
