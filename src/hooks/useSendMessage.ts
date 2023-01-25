import React from "react";
import { useMutation } from "@tanstack/react-query";
import { User as FirebaseUser } from "firebase/auth";
import useUser from "@/hooks/useUser";
import useSocket from "@/hooks/useSocket";

const sendMessage = ({
  user,
  socket,
  recieverId,
  text,
}: {
  user: FirebaseUser | null;
  socket: WebSocket | null;
  recieverId?: string;
  text?: string;
}) => {
  if (!user || !socket || !text) {
    return;
  }
  const message = {
    sender: user.uid,
    receiver: recieverId,
    text: text,
    data: new Date().toISOString(),
  };

  socket.send(JSON.stringify({ operation: "/message", value: message }));
};

function useSendMessage() {
  const { user } = useUser();
  const { socket } = useSocket();

  return useMutation({
    mutationFn: async (text?: string, recieverId?: string) => {
      sendMessage({ text, user, recieverId, socket });
    },
    onMutate: () => {},
    onError: () => {},
  });
}

export default useSendMessage;
