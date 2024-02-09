"use client";
import Image from "next/image";
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DialogueArea from "@/components/dialogues/DialogueArea"; // Import bootstrap CSS

export default async function Home() {
  return (
    <main className="container-fluid bg-black">
      <div className="row">
        <div className="col-3 bg-dark" style={{height: "100vh"}}>
          <DialogueArea clickAction={(tag: string): void => console.log(tag)}></DialogueArea>
        </div>
        <div className="col-9 bg-primary">
          Item2
        </div>
      </div>
    </main>
  );
}