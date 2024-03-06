package mess.messagecontrolservice.entity;

import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Document(collection = "chats")
public class Chat extends BaseEntity {

    private String[] userIds;

    private Type type;

    private UserWithRole[] users;
    public enum Type {
        group,
        channel,
        personal
    }

    public enum ChatRole {
        admin,
        member
    }
    public record UserWithRole(String id, ChatRole role) {
    }

}
