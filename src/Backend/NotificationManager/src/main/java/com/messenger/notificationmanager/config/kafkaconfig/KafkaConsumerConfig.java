package com.messenger.notificationmanager.config.kafkaconfig;

import com.fasterxml.jackson.core.type.TypeReference;
import com.messenger.notificationmanager.dto.KafkaCommandDTO;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaConsumerConfig {

    @Bean
    public ConsumerFactory<String, KafkaCommandDTO> consumerMessageFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9093");
        configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "notification-service");

        var type = new TypeReference<KafkaCommandDTO>() {};
        JsonDeserializer<KafkaCommandDTO> deserializer = new JsonDeserializer<>(type);

        return new DefaultKafkaConsumerFactory<>(configProps, new StringDeserializer(), deserializer);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, KafkaCommandDTO> kafkaListenerContainerFactoryMessage() {
        ConcurrentKafkaListenerContainerFactory<String, KafkaCommandDTO> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerMessageFactory());
        return factory;
    }
}