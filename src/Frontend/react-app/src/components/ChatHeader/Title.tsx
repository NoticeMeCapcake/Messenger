import {PersonIcon} from "@radix-ui/react-icons";
import "./style.css"
import { selectSelectedChat } from '@/services/store/slices/selectedChatSlice';
import { useAppSelector } from '@/services/store/types/hooks';

const Title = () => {
    const selectedChat = useAppSelector(selectSelectedChat);
    return <div className="row justify-content-start chat-title dark-bg py-2 align-content-center">
            <div className="col-auto align-content-center">
                <PersonIcon className="" style={{width: 70, height: 70, borderRadius: "50%"}}/>
            </div>
            <div className="col-8">
                {selectedChat?.chatName}<br/>
                <small style={{color: "#b8b8b8"}}>
                    {"last seen 10 min ago"}
                </small>/
                <small style={{color: "#673db2"}}>
                    {"online"}
                </small>
            </div>
        </div>;
}

export default Title;