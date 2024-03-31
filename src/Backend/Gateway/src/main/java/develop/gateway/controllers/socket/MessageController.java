package develop.gateway.controllers.socket;

import develop.gateway.dto.message.MessageWsRequestDTO;
import develop.gateway.service.DtoMapper;
import develop.gateway.service.BaseAction;
import develop.gateway.service.MessageProducer;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@MessageMapping(value = "/message")
public class MessageController {

    private final SimpMessagingTemplate template;
    private final MessageProducer messageProducer;
    private final DtoMapper dtoMapper;

    public MessageController(SimpMessagingTemplate _template,
                             MessageProducer _messageProducer,
                             DtoMapper _dtoMapper) {
        template = _template;
        messageProducer = _messageProducer;
        dtoMapper = _dtoMapper;
    }
    @MessageMapping(value = "/create")
    public void createMessage(@Payload MessageWsRequestDTO request) {
        System.out.println(request.text());
        messageProducer.sendMessage("test-process-message", dtoMapper.messageRequestToMessageInfo(request, BaseAction.create));

//        Thread.sleep(1000); // simulated delay
        template.convertAndSendToUser(
                request.tempId(),
                "/topic/message/" + request.userId(),
                new Greeting("Message sent from " + request.userId())
        );
    }

//    @Scheduled(fixedRate = 2000)
//    public void sendGreetings() {
//        template.convertAndSend("", new Greeting("Hello, world!"));
//    }

}