package develop.gateway.controllers;


import develop.gateway.dto.service.ServiceDto;
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
    public ServiceDto.Request.Public serviceEndpoint(@RequestBody ServiceDto.Request.Public request) {
        // отправить в прокси, который разберётся, в какой сервис отдать
        // сервисы будут раскидывать сообщения в определённые топики кафки
        return new ServiceDto.Request.Public("Hello World");
    }
}
