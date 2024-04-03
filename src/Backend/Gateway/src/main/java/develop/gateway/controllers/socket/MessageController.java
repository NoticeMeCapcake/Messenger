package develop.gateway.controllers.socket;

import develop.gateway.dto.message.MessageWsRequestDTO;
import develop.gateway.service.DtoMapper;
import develop.gateway.service.BaseAction;
import develop.gateway.service.MessageProducer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
//@MessageMapping(value = "/message")
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
    @MessageMapping("/message/create")
    public void createMessage(@Payload MessageWsRequestDTO request, @Header("simpSessionId") String sessionId) {
        log.info(request.text());
        log.info("session id " + sessionId);
//        System.out.println(request.text());
        messageProducer.sendMessage("test-process-message", dtoMapper.messageRequestToMessageInfo(sessionId, request, BaseAction.create));

//        Thread.sleep(1000); // simulated delay
        template.convertAndSendToUser(
                request.userId(),
                "/queue/message/" + request.tempId(),
                new Greeting("Message sent from " + request.userId())
        );
    }

//    @Scheduled(fixedRate = 2000)
//    public void sendGreetings() {
//        template.convertAndSend("", new Greeting("Hello, world!"));
//    }

}