package mess.messagecontrolservice.dto;

public record KafkaChatDTO(
        String id, // 0 if unset
        String tempId,
        String chatName,
        String[] userIds,
        String userId,
        ChatType type
) {
}
