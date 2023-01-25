import React, { useRef } from "react";
import useChaters from "@/hooks/useChaters";
import { useRouter } from "next/router";
import Link from "next/link";
import ChatMessage from "../../../components/ChatMessage";
import useSocket from "@/hooks/useSocket";
import { protectedRedirect } from "@/helpers/protectedRedirect";
import { NextPageContext } from "next";
import { GetServerSidePropsContext } from "next";
import useUser from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import useMessages from "@/hooks/useMessages";

function DmChat() {
  const { query } = useRouter();
  const { data: users, isLoading: loadingUsers } = useChaters();
  const { socket } = useSocket();
  const { user } = useUser();
  const { userId: recieverId } = query;
  const { data: messages, isLoading: loadingMessages } = useMessages(
    String(recieverId)
  );

  const text = useRef<HTMLInputElement>(null);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !socket || !text.current?.value) {
      return;
    }
    const message = {
      sender: user.uid,
      receiver: recieverId,
      text: text.current.value,
      data: new Date().toISOString(),
    };

    socket.send(JSON.stringify({ operation: "/message", value: message }));
    text.current.value = "";
  };

  return (
    <div className=" h-full max-h-screen w-screen items-center bg-slate-800 px-4 text-white">
      <div className="relative mx-auto flex h-screen max-w-2xl flex-col">
        <header className="  absolute top-0 left-0 flex w-full items-center justify-between bg-gradient-to-b from-slate-800 via-slate-800/80 py-4">
          <Link href={"/"}>&#8592; back</Link>
          <h1>
            {users?.filter((user) => user.uid === recieverId)[0]?.email ?? ""}
          </h1>
        </header>
        <div className="flex h-full max-h-screen w-full flex-col-reverse overflow-y-scroll pt-16 pb-4">
          {/* chat messages */}
          {messages?.map((message) => (
            <ChatMessage {...message} key={message.date + message.text} />
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex w-full  pb-6">
          <input type="text" className="input flex-grow" ref={text} />
          <button type="submit" className="button ml-4">
            send
          </button>
        </form>
      </div>
    </div>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const temp = protectedRedirect(context);

  return temp;
}

export default DmChat;
