package mess.messagecontrolservice.repository;

import mess.messagecontrolservice.entity.MessageEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<MessageEntity, String> {
    List<MessageEntity> getAllByChatId(String chatId);
}
