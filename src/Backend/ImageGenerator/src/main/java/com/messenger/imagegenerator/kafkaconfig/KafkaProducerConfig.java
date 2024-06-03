package com.messenger.imagegenerator.kafkaconfig;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;
@Configuration
public class KafkaProducerConfig {
    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9093");
        var serializer = new JsonSerializer<>();
        serializer.setAddTypeInfo(false);
        return new DefaultKafkaProducerFactory<>(configProps, new StringSerializer(), serializer);
    }
    @Bean
    public KafkaTemplate<String, Object> kafkaTemplateMessage() {
        return new KafkaTemplate<>(producerFactory());
    }
}
