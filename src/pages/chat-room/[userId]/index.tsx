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

function DmChat() {
  const { query } = useRouter();
  const { users } = useChaters();
  const socket = useSocket();
  const { user } = useUser();

  const text = useRef<HTMLInputElement>(null);

  const { userId: recieverId } = query;

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

    socket.send(JSON.stringify({ type: "message", value: message }));
    text.current.value = "";
  };

  //TODO: remove mock data and get messages from get messages endpoint
  const jsx = [...Array(40)].map((item, idx) => (
    <ChatMessage
      receiver={idx % 2}
      date={""}
      key={idx}
      sender={idx % 2}
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas alias odit quisquam, illum sapiente optio voluptatum quam beatae quibusdam quasi. "
    />
  ));

  return (
    <div className=" h-full max-h-screen w-screen items-center bg-slate-800 px-4 text-white">
      <div className="relative mx-auto flex h-screen max-w-2xl flex-col">
        <header className="  absolute top-0 left-0 flex w-full items-center justify-between bg-gradient-to-b from-slate-800 via-slate-800/80 py-4">
          <Link href={"/"}>&#8592; back</Link>
          <h1>
            {users.filter((user) => user.id === recieverId)[0]?.email ?? ""}
          </h1>
        </header>
        <div className="flex h-full max-h-screen w-full flex-col-reverse overflow-y-scroll pt-16 pb-4">
          {/* chat messages */}
          {jsx}
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
