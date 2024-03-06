package mess.messagecontrolservice.dto;

import java.time.LocalDateTime;

public record KafkaMessageDTO(String text, String userId, String chatId, LocalDateTime createdAt, String id, boolean isRead) {

}
