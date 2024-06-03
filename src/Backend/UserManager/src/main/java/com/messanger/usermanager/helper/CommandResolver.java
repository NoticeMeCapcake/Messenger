package com.messanger.usermanager.helper;

import com.messanger.usermanager.dto.KafkaCommandDTO;
import com.messanger.usermanager.entity.User;
import com.messanger.usermanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommandResolver {
    @Autowired
    UserRepository userRepository;
    public Object resolveCommand(KafkaCommandDTO commandDTO) {
        return switch (commandDTO.commandType()) {
            case auth -> userRepository.get(commandDTO.id());
            case online -> userRepository.update(User.builder().id(commandDTO.id()).status(true).build());
            case register -> userRepository.update(User.builder()
                    .email(commandDTO.email)
                    .password(commandDTO.password())
                    .username(commandDTO.username())
                    .status(true).build());
        };
    }
}
