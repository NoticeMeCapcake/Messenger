package com.messanger.usermanager.entity;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;

@Getter
public abstract class BaseEntity {
    @Id
    @Indexed
    protected String id;

    protected LocalDateTime createdAt = LocalDateTime.now();
}
