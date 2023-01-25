import React, { useState } from "react";
import useUser from "@/hooks/useUser";
import { Message } from "@/components/ChatMessage";
import { useQuery } from "@tanstack/react-query";

export const WS_URL = "ws://localhost:1101";
export const REST_URL = "http://localhost:8081";

type SocketContextType = {
  socket: WebSocket | null;
  messages: Message[];
};

export const SocketContext = React.createContext<SocketContextType>({
  socket: null,
  messages: [],
});

function SocketProvider({ children }: React.PropsWithChildren) {
  const { user, loading, error } = useUser();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  React.useEffect(() => {
    if (loading || error || !user) {
      return;
    }
    if (!user && socket) {
      return () => {
        socket.close();
      };
    }

    const ws = new WebSocket(WS_URL);

    ws.onopen = function () {
      // ws.send(
      //   JSON.stringify({
      //     type: "new_connection",
      //     userId: user.uid,
      //     username: user.email,
      //   })
      // );
    };

    ws.onmessage = function (evt) {
      const msg = JSON.parse(evt.data);

      console.log(msg);
    };

    ws.onclose = function () {};

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [user, loading, error]);

  return (
    <SocketContext.Provider value={{ socket, messages: [] }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
