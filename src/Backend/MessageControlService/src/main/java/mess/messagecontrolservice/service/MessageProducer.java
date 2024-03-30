package mess.messagecontrolservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class MessageProducer {

    private final KafkaTemplate<String, KafkaMessageInfo> kafkaTemplate;

    public MessageProducer(@Autowired KafkaTemplate<String, KafkaMessageInfo> _kafkaTemplate) {
        kafkaTemplate = _kafkaTemplate;
    }
    public void sendMessage(String topic, KafkaMessageInfo messageInfo) {
        kafkaTemplate.send(topic, messageInfo);
    }

}