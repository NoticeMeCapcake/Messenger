package com.messanger.usermanager.dto;

public record KafkaCommandDTO(String id, String username, String email, String password, String token, CommandType commandType) {
}
