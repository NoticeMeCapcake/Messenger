package develop.gateway.dto.message;

import jakarta.validation.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

public enum MessageDto {;
    protected interface Message { @NotBlank String message();}

    public enum Request {;
        public record Public(MultipartFile message){}
    }

}
