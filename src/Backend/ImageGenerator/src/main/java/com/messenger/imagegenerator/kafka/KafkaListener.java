package com.messenger.imagegenerator.kafka;

import com.messenger.imagegenerator.dto.KafkaImagesGenDTO;
import com.messenger.imagegenerator.dto.KafkaImagesResultDTO;
import com.messenger.imagegenerator.service.Generator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Slf4j
@AllArgsConstructor
public class KafkaListener {

    private final MessageProducer messageProducer;

    private final Generator generator;

    @KafkaListener(topics = "command-imagegenerator-topic", groupId = "imagegenerator-service", containerFactory = "kafkaListenerContainerFactoryMessage")
    public void listenMessage(KafkaImagesGenDTO imagesGenDTO) {

        var images = generator.getImages(imagesGenDTO.count());

        messageProducer.sendMessage("result-iamagegenerator-topic", KafkaImagesResultDTO(imagesGenDTO.count(),
                imagesGenDTO.token(),
                iamges));
    }
}
