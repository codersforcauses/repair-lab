import { Inter } from "next/font/google";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import { toast } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function ToastTest() {
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success!");
    }, 5000);
  });
  return (
    <main className={`mt-96 flex flex-row ${inter.className}`}>
      {/* <h1>Hello!</h1> */}
      <Button
        style={{ margin: "1rem", backgroundColor: "#61d345" }}
        onClick={() => {
          toast.success("Success");
        }}
      >
        Success
      </Button>

      <Button
        style={{ margin: "1rem", backgroundColor: "#ff4b4b" }}
        onClick={() => {
          toast.error("Error");
        }}
      >
        Error
      </Button>

      <Button
        style={{ margin: "1rem", backgroundColor: "#007acc" }}
        onClick={() => {
          toast("Info", { icon: "\u2139\ufe0f" });
        }}
      >
        Info
      </Button>

      <Button
        style={{ margin: "1rem" }}
        onClick={() => {
          toast.loading("Loading");
        }}
      >
        Loading
      </Button>

      <Button
        style={{ margin: "1rem", backgroundColor: "#ffcd29" }}
        onClick={() => {
          toast.promise(myPromise, {
            loading: "Saving...",
            success: <b>Settings saved!</b>,
            error: <b>Could not save.</b>
          });
        }}
      >
        Promise
      </Button>
      <Toast position="bottom-center" />
    </main>
  );
}
