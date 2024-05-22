package develop.gateway.config.kafkaconfig;

import com.fasterxml.jackson.core.type.TypeReference;
import develop.gateway.dto.KafkaChatDTO;
import develop.gateway.dto.KafkaMessageDTO;
import develop.gateway.service.types.KafkaInfoResponse;
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
    public ConsumerFactory<String, KafkaInfoResponse<KafkaMessageDTO>> consumerMessageFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9093");
        configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "gateway-service");

        var type = new TypeReference<KafkaInfoResponse<KafkaMessageDTO>>() {};
        JsonDeserializer<KafkaInfoResponse<KafkaMessageDTO>> deserializer = new JsonDeserializer<>(type);

        return new DefaultKafkaConsumerFactory<>(configProps, new StringDeserializer(), deserializer);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, KafkaInfoResponse<KafkaMessageDTO>> kafkaListenerContainerFactoryMessage() {
        ConcurrentKafkaListenerContainerFactory<String, KafkaInfoResponse<KafkaMessageDTO>> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerMessageFactory());
        return factory;
    }

    @Bean
    public ConsumerFactory<String, KafkaInfoResponse<KafkaChatDTO>> consumerChatFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9093");
        configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "gateway-service");

        var type = new TypeReference<KafkaInfoResponse<KafkaChatDTO>>() {};
        return new DefaultKafkaConsumerFactory<>(configProps, new StringDeserializer(), new JsonDeserializer<>(type));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, KafkaInfoResponse<KafkaChatDTO>> kafkaListenerContainerFactoryChat() {
        ConcurrentKafkaListenerContainerFactory<String, KafkaInfoResponse<KafkaChatDTO>> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerChatFactory());
        return factory;
    }

}