package mess.messagecontrolservice.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;

public abstract class BaseEntity {
    @Id
    @Indexed
    protected String id;

    protected LocalDateTime createdAt = LocalDateTime.now();
}
