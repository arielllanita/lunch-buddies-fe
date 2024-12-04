import { useEffect, useState } from "react";
import { type Socket, io } from "socket.io-client";

export default function useSockets() {
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize socket instance
  useEffect(() => {
    const socket = io();
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket };
}
