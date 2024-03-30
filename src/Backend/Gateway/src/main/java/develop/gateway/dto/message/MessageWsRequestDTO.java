package develop.gateway.dto.message;

public record MessageWsRequestDTO(String text, String userId, String chatId, String id, String tempId) {
}
