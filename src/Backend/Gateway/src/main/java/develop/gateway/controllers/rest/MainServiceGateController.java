package develop.gateway.controllers.rest;


import develop.gateway.dto.service.ServiceDto;
import develop.gateway.service.MessageInfo;
import develop.gateway.service.MessageProducer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "api/gateway/service")
public class MainServiceGateController {
    // пререквизиты: у пользователя должен быть идетификатор сессии (будет отдельный сервис, который проверяет его)

    @PostMapping
    @ResponseBody
    public ServiceDto.Request.Public serviceEndpoint(@RequestBody MessageInfo messageInfo) {
        System.out.println(messageInfo.messageDTO().text());
//        messageProducer.sendMessage("test-process-message", messageInfo);
        // отправить в прокси, который разберётся, в какой сервис отдать
        // сервисы будут раскидывать сообщения в определённые топики кафки
        return new ServiceDto.Request.Public("Hello World");
    }
}
