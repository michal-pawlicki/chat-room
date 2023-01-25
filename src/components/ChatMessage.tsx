import React from "react";
import useUser from "@/hooks/useUser";

export type Message = {
  sender: string;
  receiver: string;
  text: string;
  date: string;
};

function ChatMessage({ date, receiver, sender, text }: Message) {
  const { user } = useUser();

  const align =
    user?.uid === receiver ? "bg-slate-600" : "bg-gray-500 self-end";

  return (
    <div className={`my-2 w-fit max-w-sm rounded-lg p-2 ${align}`}>{text}</div>
  );
}

export default ChatMessage;
