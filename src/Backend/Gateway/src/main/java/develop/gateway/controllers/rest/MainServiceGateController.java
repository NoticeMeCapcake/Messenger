package develop.gateway.controllers.rest;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "api/gateway/service")
public class MainServiceGateController {
    // пререквизиты: у пользователя должен быть идетификатор сессии (будет отдельный сервис, который проверяет его)

}
