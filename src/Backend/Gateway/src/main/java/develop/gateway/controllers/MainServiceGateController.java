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
    @PostMapping
    @ResponseBody
    public ServiceDto.Request.Public serviceEndpoint(@RequestBody  ServiceDto.Request.Public request) {
        // check rights
        return new ServiceDto.Request.Public("Hello World");
    }
}
