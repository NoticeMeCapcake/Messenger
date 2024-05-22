package develop.gateway.service.types;

public record MessageResponseDTO(String id, String tempId, String userId, String chatId, String text, long createdAt) {
}
