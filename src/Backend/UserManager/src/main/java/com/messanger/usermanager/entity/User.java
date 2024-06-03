package com.messanger.usermanager.entity;

import lombok.Builder;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@SuperBuilder
@Document(collection = "users")
public class User extends BaseEntity {
    private String username;
    private String password;
    private String token;
    private Boolean status;
    private String email;
    private String[] chatIds;
    private LocalDateTime lastSeen;
}
