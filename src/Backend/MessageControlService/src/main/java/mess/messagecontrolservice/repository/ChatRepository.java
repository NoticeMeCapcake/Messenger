package mess.messagecontrolservice.repository;

import mess.messagecontrolservice.entity.Chat;
import mess.messagecontrolservice.entity.MessageEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatRepository extends MongoRepository<Chat, String> {
    List<Chat> getAllByUserIdsContains(String userId);
}
