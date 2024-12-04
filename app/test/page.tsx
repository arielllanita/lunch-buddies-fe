"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { toast } from "sonner";

export default function Page() {
  const [data, setData] = useState("");
  const [messages, setMessages] = useState("");

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io();
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // socket.on("connect", () => {
    //   console.log("connected to websocket server");
    // });

    socket.on("store_chat", (chat) => {
      console.log("store_chat", chat);

      setMessages(chat);
      setData("");
    });

    return () => {
      socket.disconnect();
      socket.off("store_chat");
    };
  }, [socket]);

  const sendMessage = () => {
    socket?.emit("send_chat", data);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Send message</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {/* {messages.map((v, i) => (
              <li key={i}>{v}</li>
            ))} */}
            {messages}
          </ul>
        </CardContent>

        <CardFooter className="gap-3">
          <Input value={data} onChange={(e) => setData(e.target.value)} />
          <Button onClick={sendMessage}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
