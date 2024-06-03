package com.messanger.usermanager.controllers.rest;


import com.messanger.usermanager.dto.RestCommandRequestDTO;
import com.messanger.usermanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping(value = "api/user-manager/status")
public class UserStatusController {
    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<String> getOnlineUsers(@RequestBody RestCommandRequestDTO request) {
        var result = new LinkedList<String>();
        for (var id : request.ids()) {
            var user = userRepository.get(id);
            if (user.getStatus()) {
                result.add(user.getId());
            }
        }

        return result;
    }
}
