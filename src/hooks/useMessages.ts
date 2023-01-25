import React from "react";
import { useQuery } from "@tanstack/react-query";
import { REST_URL } from "@/context/SocketContext";
import useUser from "@/hooks/useUser";
import { Message } from "@/components/ChatMessage";

const fetchMessages = async (recieverId?: string, userId?: string) => {
  console.log(recieverId);
  if (!userId || !recieverId) {
    return [];
  }

  try {
    const res = await fetch(REST_URL + "/messages", {
      headers: {
        "Content-type": "application/json",
      },
      method: "GET",
    });
    const data: Message[] = await res.json();

    const result = data
      .filter(
        (message) =>
          (message.receiver === recieverId && message.sender === userId) ||
          (message.receiver === userId && message.sender === recieverId)
      )
      .sort((msgA, msgB) => {
        const [dateA, dateB] = [
          new Date(msgA.date).getTime(),
          new Date(msgB.date).getTime(),
        ];
        return dateB - dateA;
      });

    return result;
  } catch (err) {}
};

function useMessages(recieverId?: string) {
  const { user } = useUser();

  return useQuery({
    queryFn: async () => await fetchMessages(recieverId, user?.uid),
    queryKey: ["messages", recieverId, user?.uid],
  });
}

export default useMessages;
