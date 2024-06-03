package com.messenger.imagegenerator.kafka;

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
}