package mess.messagecontrolservice.service;

import mess.messagecontrolservice.dto.KafkaMessageDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.function.Consumer;

public abstract class ActionResolver {
    protected MongoRepository<Object, String> repository;
    public void resolveAction(BaseAction action) {
        Consumer<KafkaMessageDTO> consumer;
        switch (action) {
            case create:
                consumer = this::doCreate;
                break;
            case get:
                break;
            case update:
                break;
            case delete:
                break;
        }
    }
    public void doAction(Consumer<KafkaMessageDTO> action, KafkaMessageDTO messageDTO) {
        action.accept(messageDTO);
    }

    protected void doCreate();
    protected void doUpdate();
    protected void doDelete();
    protected void doGet();
}
