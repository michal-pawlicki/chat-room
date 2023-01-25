import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../lib/firebase";
import { FirebaseError } from "firebase/app";

function useRegister() {
  const login = async ({
    email,
    password,
    confirm,
  }: {
    email?: string;
    password?: string;
    confirm?: string;
  }) => {
    if (!email || email.trim() === "") {
      throw new FirebaseError("auth/invalid-email", "Email must not be empty");
    }
    if (!password || password?.trim() === "") {
      throw new FirebaseError(
        "auth/invalid-password",
        "Password must not be empty"
      );
    }

    if (password !== confirm) {
      throw new FirebaseError(
        "auth/invalid-password",
        "Password must not be empty"
      );
    }
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return useMutation({ mutationFn: login });
}

export default useRegister;
