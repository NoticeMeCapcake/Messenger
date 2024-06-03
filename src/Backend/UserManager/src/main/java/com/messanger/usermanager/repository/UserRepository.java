package com.messanger.usermanager.repository;

import com.messanger.usermanager.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
