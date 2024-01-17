package develop.gateway.dto.service;

import develop.gateway.dto.BaseDto;
import jakarta.validation.constraints.NotBlank;

public enum ServiceDto {;
    private interface Message { @NotBlank String message();}

    public enum Request {;
        public record Public(String message) implements Message {
        }
        public record Private(String message) implements Message {
        }
    }
    public enum Response {;
        public record Public(String message) implements Message {
        }
        public record Private(String message) implements Message {
        }
    }
}
