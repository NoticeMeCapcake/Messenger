package mess.messagecontrolservice.kafkaconfig;

import mess.messagecontrolservice.dto.KafkaChatDTO;
import mess.messagecontrolservice.dto.KafkaMessageDTO;
import mess.messagecontrolservice.service.types.KafkaInfoRequest;
import mess.messagecontrolservice.service.types.KafkaMessageInfoRequest;
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
    public ConsumerFactory<String, KafkaMessageInfoRequest> consumerMessageFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9093");
        configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "message-control-service");
        return new DefaultKafkaConsumerFactory<>(configProps, new StringDeserializer(), new JsonDeserializer<>(KafkaMessageInfoRequest.class));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, KafkaMessageInfoRequest> kafkaListenerContainerFactoryMessage() {
        ConcurrentKafkaListenerContainerFactory<String, KafkaMessageInfoRequest> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerMessageFactory());
        return factory;
    }

    @Bean
    public ConsumerFactory<String, KafkaInfoRequest<KafkaChatDTO>> consumerChatFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9093");
        configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "message-control-service");
//        configProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//        configProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
//        configProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest");
//        configProps.put(JsonDeserializer.TRUSTED_PACKAGES, "*");
//        configProps.put(JsonDeserializer.USE_TYPE_INFO_HEADERS, false);
//        configProps.put(JsonDeserializer.VALUE_DEFAULT_TYPE, KafkaMessageInfoRequest.class.getName());
        return new DefaultKafkaConsumerFactory<>(configProps, new StringDeserializer(), new JsonDeserializer<>(KafkaInfoRequest.class));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, KafkaInfoRequest<KafkaChatDTO>> kafkaListenerContainerFactoryChat() {
        ConcurrentKafkaListenerContainerFactory<String, KafkaInfoRequest<KafkaChatDTO>> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerChatFactory());
        return factory;
    }

}