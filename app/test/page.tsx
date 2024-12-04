"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useSockets from "@/hooks/use-sockets";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState("");
  const [messages, setMessages] = useState([]);

  const { socket } = useSockets();

  useEffect(() => {
    if (!socket) return;

    // socket.on("connect", () => {
    //   console.log("connected to websocket server");
    // });

    socket.on("get_msgs", (msgs) => {
      setMessages(msgs);
      setData("");
    });

    return () => {
      socket.disconnect();
      socket.off("get_msgs");
    };
  }, [socket]);

  const sendMessage = () => {
    socket?.emit("send_msg", data);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <pre>{JSON.stringify(messages, null, 2)}</pre>
        </CardContent>

        <CardFooter className="gap-3">
          <Input value={data} onChange={(e) => setData(e.target.value)} />
          <Button onClick={sendMessage}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
