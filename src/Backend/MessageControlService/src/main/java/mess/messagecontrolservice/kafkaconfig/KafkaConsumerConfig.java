package mess.messagecontrolservice.kafkaconfig;

import com.fasterxml.jackson.core.type.TypeReference;
import mess.messagecontrolservice.dto.KafkaChatDTO;
import mess.messagecontrolservice.dto.KafkaMessageDTO;
import mess.messagecontrolservice.service.types.KafkaInfoRequest;
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
    public ConsumerFactory<String, KafkaInfoRequest<KafkaMessageDTO>> consumerMessageFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9093");
        configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "message-control-service");
        var type = new TypeReference<KafkaInfoRequest<KafkaMessageDTO>>() {};
        return new DefaultKafkaConsumerFactory<>(configProps, new StringDeserializer(), new JsonDeserializer<>(type));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, KafkaInfoRequest<KafkaMessageDTO>> kafkaListenerContainerFactoryMessage() {
        ConcurrentKafkaListenerContainerFactory<String, KafkaInfoRequest<KafkaMessageDTO>> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerMessageFactory());
        return factory;
    }

    @Bean
    public ConsumerFactory<String, KafkaInfoRequest<KafkaChatDTO>> consumerChatFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9093");
        configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "message-control-service");

        var type = new TypeReference<KafkaInfoRequest<KafkaChatDTO>>() {};
        return new DefaultKafkaConsumerFactory<>(configProps, new StringDeserializer(), new JsonDeserializer<>(type));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, KafkaInfoRequest<KafkaChatDTO>> kafkaListenerContainerFactoryChat() {
        ConcurrentKafkaListenerContainerFactory<String, KafkaInfoRequest<KafkaChatDTO>> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerChatFactory());
        return factory;
    }

}