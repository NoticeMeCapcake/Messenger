package develop.gateway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class MessageProducer {

    private final KafkaTemplate<String, MessageInfoRequest> kafkaTemplate;

    public MessageProducer(@Autowired KafkaTemplate<String, MessageInfoRequest> _kafkaTemplate) {
        kafkaTemplate = _kafkaTemplate;
    }
    public void sendMessage(String topic, MessageInfoRequest messageInfo) {
        kafkaTemplate.send(topic, messageInfo);
    }

}