package develop.gateway.dto;

import java.time.LocalDateTime;

//TODO: добавить вторую дто, чтобы разнести данные для запроса и ответа
public record KafkaMessageDTO(String id, String tempId, String text, String userId, String chatId, long createdAt) {
}
