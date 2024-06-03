package com.messanger.usermanager.controllers.kafka;

import com.messanger.usermanager.dto.KafkaCommandDTO;
import com.messanger.usermanager.helper.CommandResolver;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@Slf4j
public class KafkaListener {
    private final MessageProducer producer;
    private final CommandResolver commandResolver;

    @KafkaListener(topics = "command-usermanager-topic", groupId = "usermanager-service", containerFactory = "kafkaListenerContainerFactoryCommand")
    public void listenMessage(KafkaCommandDTO commandDTO) {
        log.info("Received message: {}", commandDTO);
        var result = commandResolver.resolveCommand(commandDTO);

        producer.sendMessage("result-usermanager-topic", result);
    }
}
