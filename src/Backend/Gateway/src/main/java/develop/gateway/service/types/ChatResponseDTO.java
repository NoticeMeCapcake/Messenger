package develop.gateway.service.types;

import develop.gateway.dto.ChatType;

public record ChatResponseDTO(
        String id, // 0 if unset
        String tempId,
        String chatName,
        String[] userIds,
        ChatType type
) {}
