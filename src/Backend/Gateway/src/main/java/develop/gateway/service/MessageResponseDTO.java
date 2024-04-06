package develop.gateway.service;

public record MessageResponseDTO(String id, String tempId, String userId, String chatId, String text, long createdAt) {
}
