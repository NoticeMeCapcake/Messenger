package mess.messagecontrolservice.entity;

import com.mongodb.lang.Nullable;
import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Document(collection = "messages")
public class MessageEntity extends BaseEntity {
    private String text;
    private String userId;
    private boolean isRead;

//    @OneToMany
//    Todo: read about connections between documents
    @Nullable
    private String[] fileId;
}
