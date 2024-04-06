package mess.messagecontrolservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessageProducer {

    private final KafkaTemplate<String, KafkaMessageInfoResponse> kafkaTemplate;

    public void sendMessage(String topic, KafkaMessageInfoResponse messageInfo) {
        kafkaTemplate.send(topic, messageInfo);
    }

}