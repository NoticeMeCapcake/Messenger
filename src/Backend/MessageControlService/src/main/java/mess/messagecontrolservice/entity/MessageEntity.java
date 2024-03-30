package mess.messagecontrolservice.entity;

import com.mongodb.lang.Nullable;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Setter
@Getter
@Document(collection = "messages")
public class MessageEntity extends BaseEntity {
    private String text;
    private String userId;
    private boolean isRead;
    private String chatId;

//    @OneToMany
//    Todo: read about connections between documents
    @Nullable
    private String[] fileId;
}
