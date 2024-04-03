package mess.messagecontrolservice.dto;

import java.time.LocalDateTime;

public record KafkaMessageDTO(String id, String tempId, String userId, String chatId, String text, long createdAt) {

}
