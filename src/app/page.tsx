"use client";
import { useState } from "react";

import { authClient } from "@/lib/auth-client"; //import the auth client

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSumbit = () => {
    authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
      },
      {
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          window.alert("Success");
        },
        onError: () => {
          // display the error message
          window.alert("Something went wrong");
        },
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
      },
      {
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          window.alert("Success");
        },
        onError: () => {
          // display the error message
          window.alert("Something went wrong");
        },
      }
    );
  };
  const { data: session } = authClient.useSession();

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-8">
        <h1>Signed in as {session.user.name}</h1>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 flex flex-col gap-y-8">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSumbit}>Create User</Button>
      </div>
      <div className="p-4 flex flex-col gap-y-8">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>Log in</Button>
      </div>
    </>
  );
}
