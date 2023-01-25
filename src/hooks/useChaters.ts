import { ChatersContext } from "@/context/ChatersContext";
import { useContext } from "react";

function useChaters() {
  return useContext(ChatersContext);
}

export default useChaters;
