import React, { useState } from "react";
import useUser from "@/hooks/useUser";
export const WS_URL = "ws://localhost:8080";

export const SocketContext = React.createContext<WebSocket | null>(null);

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
      console.log("connected");
      ws.send(JSON.stringify({ type: "new_connection", user: user.uid }));
    };

    ws.onmessage = function (evt) {
      const msg = JSON.parse(evt.data);

      console.log(msg);
    };

    ws.onclose = function () {
      console.log("disconnected");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [user, loading, error]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default SocketProvider;
