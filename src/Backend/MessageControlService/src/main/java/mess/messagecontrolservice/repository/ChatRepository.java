package mess.messagecontrolservice.repository;

import mess.messagecontrolservice.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRepository extends MongoRepository<Chat, String> {
}
