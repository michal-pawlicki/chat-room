import React, { useEffect, useState } from "react";

export const ChatersContext = React.createContext<{
  users: { email: string; id: string }[];
  loading: boolean;
}>({ users: [], loading: false });

function ChatersProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <ChatersContext.Provider
      value={{
        users: [
          { email: "kacper.hemperek@email.com", id: "1" },
          { email: "michał.pawlicki@email.com", id: "2" },
        ],
        loading,
      }}
    >
      {children}
    </ChatersContext.Provider>
  );
}

export default ChatersProvider;
