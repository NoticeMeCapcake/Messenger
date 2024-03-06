package develop.gateway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class MessageProducer {

    private final KafkaTemplate<String, MessageInfo> kafkaTemplate;

    public MessageProducer(@Autowired KafkaTemplate<String, MessageInfo> _kafkaTemplate) {
        kafkaTemplate = _kafkaTemplate;
    }
    public void sendMessage(String topic, MessageInfo messageInfo) {
        kafkaTemplate.send(topic, messageInfo);
    }

}