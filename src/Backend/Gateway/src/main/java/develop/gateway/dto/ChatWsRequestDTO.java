package develop.gateway.dto;

import develop.gateway.service.BaseAction;

public record ChatWsRequestDTO(String id, String chatName, String[] userIds, String userId, String tempId, ChatType chatType, BaseAction action) {
}
