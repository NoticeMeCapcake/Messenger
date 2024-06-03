package com.messenger.notificationmanager.controllers.kafka;

import com.messenger.notificationmanager.dto.KafkaCommandDTO;
import com.messenger.notificationmanager.dto.RestCommandRequestDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@AllArgsConstructor
@Slf4j
public class KafkaListener {
    private final MessageProducer producer;
    private final RestTemplate restTemplate;

    @KafkaListener(topics = "command-notification-topic", groupId = "usermanager-service", containerFactory = "kafkaListenerContainerFactoryCommand")
    public void listenMessage(KafkaCommandDTO commandDTO) {
        log.info("Received message: {}", commandDTO);

        var result = restTemplate.getForObject("localhost:8083/api/user-manager/status", new RestCommandRequestDTO(commandDTO.ids())), RestCommandRequestDTO.class;

        producer.sendMessage("result-notification-topic", new KafkaCommandDTO(Arrays.stream(commandDTO.ids()).filter(x -> !result.ids().contains(x)),
                commandDTO.content()));
    }
}
