import ChatType from "@/dto/ChatType";
import {RequestType} from "@/dto/RequestType";

interface IChatRequest {
    id: string; // 0 if unset
    tempId: string;
    chatName: string;
    userIds: string[];
    userId: string;
    type: ChatType;
    action: RequestType;
}

export default IChatRequest;