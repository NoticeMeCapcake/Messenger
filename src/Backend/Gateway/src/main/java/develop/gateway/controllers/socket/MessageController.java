package develop.gateway.controllers.socket;

import develop.gateway.dto.ChatWsRequestDTO;
import develop.gateway.dto.MessageWsRequestDTO;
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

//    TODO: refactor to split into type
//    @MessageMapping("/message/create")
//    public void createMessage(@Payload MessageWsRequestDTO request, @Header("simpSessionId") String sessionId) {
//        log.info(request.text());
//        log.info("session id " + sessionId);
////        System.out.println(request.text());
//        messageProducer.sendMessage("test-process-message", dtoMapper.messageRequestToMessageInfo(sessionId, request, BaseAction.create));
//    }
//    @MessageMapping("/message/get-all")
//    public void getAllMessages(@Payload MessageWsRequestDTO request, @Header("simpSessionId") String sessionId) {
//        log.info(request.text());
//        log.info("session id " + sessionId);
//
//        messageProducer.sendMessage("test-process-message", dtoMapper.messageRequestToMessageInfo(sessionId, request, BaseAction.getAll));
//    }
//    @MessageMapping("/message/delete")
//    public void deleteMessage(@Payload MessageWsRequestDTO request, @Header("simpSessionId") String sessionId) {
//        log.info(request.text());
//        log.info("session id " + sessionId);
////        System.out.println(request.text());
//        messageProducer.sendMessage("test-process-message", dtoMapper.messageRequestToMessageInfo(sessionId, request, BaseAction.delete));
//    }

    @MessageMapping("/message")
    public void processMessage(@Payload MessageWsRequestDTO request, @Header("simpSessionId") String sessionId) {
        log.info(request.text());
        log.info("session id " + sessionId);

        messageProducer.sendMessage(
                "test-process-message",
                dtoMapper.messageRequestToMessageInfo(sessionId, request)
        );
    }

    @MessageMapping("/chat")
    public void processChat(@Payload ChatWsRequestDTO request, @Header("simpSessionId") String sessionId) {
        log.info(request.chatName());
        log.info("session id " + sessionId);

        messageProducer.sendMessage("test-process-chat", dtoMapper.ChatRequestToChatInfo(sessionId, request));
    }
}