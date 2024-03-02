package mess.messagecontrolservice.entity;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public abstract class BaseEntity {
    @Id
    protected String id;

    protected LocalDateTime createdAt;
}
