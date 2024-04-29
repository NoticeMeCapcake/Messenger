package develop.gateway.service;

import develop.gateway.service.types.MessageInfoRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class MessageProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendMessage(String topic, Object kafkaObjectInfo) {
        kafkaTemplate.send(topic, kafkaObjectInfo);
    }
//    public void sendChat(String topic, MessageInfoRequest messageInfo) {
//        kafkaTemplate.send(topic, messageInfo);
//    }

}