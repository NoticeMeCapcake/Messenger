package mess.messagecontrolservice.entity;

import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Document(collection = "chats")
public class Chat extends BaseEntity {

    private String[] userIds;

    private Type type;


    public enum Type {
        group,
        channel,
        personal
    }
}
