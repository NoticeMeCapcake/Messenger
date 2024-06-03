package com.messenger.imagegenerator.dto;

import java.awt.image.BufferedImage;

public record KafkaImagesResultDTO(
        int token,
        String token,
        BufferedImage[] imgs;
        ) {

}
