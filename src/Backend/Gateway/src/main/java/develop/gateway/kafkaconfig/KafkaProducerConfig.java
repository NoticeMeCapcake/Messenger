package develop.gateway.kafkaconfig;

import develop.gateway.service.MessageInfo;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;
@Configuration
public class KafkaProducerConfig {
    @Bean
    public ProducerFactory<String, MessageInfo> producerFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9093");
//        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
//        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
//        configProps.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);
        var serializer = new JsonSerializer<MessageInfo>();
        serializer.setAddTypeInfo(false);
//        serializer.
//        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, serializer.getClass());
//        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class
        return new DefaultKafkaProducerFactory<>(configProps, new StringSerializer(), serializer);
    }
    @Bean
    public KafkaTemplate<String, MessageInfo> kafkaTemplateMessage() {
        return new KafkaTemplate<>(producerFactory());
    }
}
