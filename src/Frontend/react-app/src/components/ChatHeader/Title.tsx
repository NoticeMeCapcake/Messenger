import {PersonIcon} from "@radix-ui/react-icons";
import "./style.css"

interface Props {
    chatName: string
}

export function Title(props: Props) {
    return (
        <div className="row justify-content-start chat-title">
            <div className="col-1">
                <PersonIcon style={{width: 40, height: 40}}/>
            </div>
            <div className="col-8">
                {props.chatName}
            </div>
        </div>
    );
}