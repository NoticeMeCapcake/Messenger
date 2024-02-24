"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css"

import AppLayout from "@/components/AppLayout";
import { Provider } from 'react-redux';
import { store } from '@/services/store/store';


export default async function App() {
    return (
      <Provider store={store}>
            <AppLayout/>
      </Provider>
    )
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