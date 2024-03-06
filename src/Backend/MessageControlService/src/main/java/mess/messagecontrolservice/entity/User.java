package mess.messagecontrolservice.entity;

import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Builder
@Document(collection = "users")
public class User extends BaseEntity {
    private String username;
    private String password;
    private String email;
    private String[] chatIds;
    private LocalDateTime lastSeen;
}
