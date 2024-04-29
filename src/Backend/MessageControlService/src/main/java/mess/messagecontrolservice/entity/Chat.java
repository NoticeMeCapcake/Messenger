package mess.messagecontrolservice.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import mess.messagecontrolservice.dto.ChatType;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Getter
@Setter
@Document(collection = "chats")
public class Chat extends BaseEntity {

    private String[] userIds;

    private String name;

    private ChatType type;

    private UserWithRole[] users;

    public enum ChatRole {
        admin,
        member
    }
    public record UserWithRole(String id, ChatRole role) {
    }

}
