package develop.gateway.dto;

import java.time.LocalDateTime;

public record KafkaMessageDTO(String text, String userId, String chatId, LocalDateTime createdAt) {
}
