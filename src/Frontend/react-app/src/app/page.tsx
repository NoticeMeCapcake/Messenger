"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css"

import AppLayout from "@/components/AppLayout";


let id = 1;
let message = "template";
let senderName = "templateName"

// const messages: ChatMessage[] = [{id: id, senderId: senderName, text: message}]

export default async function Home() {
    return <main style={{width: "100vw", height: "100vh"}}>
        <AppLayout/>
    </main>
  // return (
  //   <main className="container-fluid bg-black">
  //     <div className="row">
  //       <div className="col-3 bg-dark" style={{height: "100vh"}}>
  //         <DialogueArea clickAction={(tag: string): void => {
  //             console.log(tag);
  //             messages.push({id: id, senderId: senderName, text: tag});
  //             setMessages(messages)
  //             console.log(messages)
  //         }}></DialogueArea>
  //       </div>
  //       <div className="col-9 bg-light">
  //         <MessageList messages={messages}/>
  //       </div>
  //     </div>
  //   </main>
  // );
}