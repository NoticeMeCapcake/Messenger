import {RequestType} from "@/dto/RequestType";

interface IMessageRequest {
    id?: string | null;
    tempId?: string;
    userId?: string;
    chatId?: string;
    text?: string;
    action: RequestType;
}

export default IMessageRequest;