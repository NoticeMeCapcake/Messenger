package mess.messagecontrolservice.service.actionresolvers;

import lombok.RequiredArgsConstructor;
import mess.messagecontrolservice.dto.KafkaChatDTO;
import mess.messagecontrolservice.entity.Chat;
import mess.messagecontrolservice.entity.MessageEntity;
import mess.messagecontrolservice.repository.ChatRepository;
import mess.messagecontrolservice.service.types.KafkaInfoRequest;
import org.springframework.stereotype.Component;

import java.time.ZoneOffset;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class ChatActionResolver {
    private final ChatRepository repository;

    public Object resolveAction(KafkaInfoRequest<KafkaChatDTO> messageInfo) {
        Function<KafkaChatDTO, Object> action = switch (messageInfo.action()) {
            case create -> this::doCreate;
            case get -> this::doGet;
            case getAll -> this::doGetAll;
            case update -> this::doUpdate;
            case delete -> this::doDelete;
        };
        return doAction(action, messageInfo.messageDTO());
    }

    public Object doAction(Function<KafkaChatDTO, Object> action, KafkaChatDTO messageDTO) {
        return action.apply(messageDTO);
    }

    private Object doCreate(KafkaChatDTO messageDTO) { // todo: check for exceptions
        var insertingObject = Chat.builder()
                .name(messageDTO.chatName())
                .type(messageDTO.type())
                .userIds(messageDTO.userIds())
                .users(null)
                .build();
        repository.insert(insertingObject);

        return new KafkaChatDTO[]{new KafkaChatDTO(insertingObject.getId(),
                messageDTO.tempId(),
                messageDTO.chatName(),
                messageDTO.userIds(),
                messageDTO.userId(),
                messageDTO.type())};
    }

    private Object doUpdate(KafkaChatDTO messageDTO) {
        var entity = repository.findById(messageDTO.id()).orElseThrow();
        entity.setName(messageDTO.chatName());
        entity.setUserIds(messageDTO.userIds());
        repository.save(entity);
        return new KafkaChatDTO[]{new KafkaChatDTO(entity.getId(),
                messageDTO.tempId(),
                messageDTO.chatName(),
                messageDTO.userIds(),
                messageDTO.userId(),
                messageDTO.type())};
    }

    private Object doDelete(KafkaChatDTO messageDTO) {
        repository.deleteById(messageDTO.id());
        return new KafkaChatDTO[]{messageDTO};
    }

    private Object doGet(KafkaChatDTO messageDTO) {
        var entity = repository.findById(messageDTO.id()).orElseThrow();
        return new KafkaChatDTO[]{new KafkaChatDTO(entity.getId(),
                null,
                messageDTO.chatName(),
                messageDTO.userIds(),
                messageDTO.userId(),
                messageDTO.type())};
    }
    private Object doGetAll(KafkaChatDTO messageDTO) {
        var entities = repository.getAllByUserIdsContains(messageDTO.userId());
        return entities.stream().map(
                        entity -> new KafkaChatDTO(entity.getId(),
                                null,
                                entity.getName(),
                                entity.getUserIds(),
                                messageDTO.userId(),
                                entity.getType()))
                .toList()
                .toArray(new KafkaChatDTO[0]);
    }
}
