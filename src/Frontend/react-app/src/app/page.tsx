import Image from "next/image";
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS

export default function Home() {
  return (
    <main className="container-fluid bg-black">
      <div className="row">
        <div className="col-3 bg-dark">
          Item1
        </div>
        <div className="col-9 bg-primary">
          Item2
        </div>
      </div>
    </main>
  );
}
