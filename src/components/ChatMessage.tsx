import React from "react";

export type ChatMessageProps = {
  sender: number;
  receiver: number;
  text: string;
  date: string;
};

function ChatMessage({ date, receiver, sender, text }: ChatMessageProps) {
  const currentUser = 1;
  const isSent = sender === currentUser;
  const align = !isSent ? "bg-slate-600" : "bg-gray-500 self-end";

  return (
    <div className={`my-2 w-fit max-w-sm rounded-lg p-2 ${align}`}>{text}</div>
  );
}

export default ChatMessage;
