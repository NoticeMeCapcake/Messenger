package mess.messagecontrolservice.repository;

import mess.messagecontrolservice.entity.MessageEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<MessageEntity, String> {

}
