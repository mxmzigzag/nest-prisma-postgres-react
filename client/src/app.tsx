import React from "react";
import { useFetch } from "./hooks/useFetch";

type User = {
  name: string;
  surname: string;
  userName: string;
  email: string;
};

export default function App() {
  const { request } = useFetch();

  const handleGetAllUsers = async () => {
    const data = await request("users");
    console.log("data:", data);
  };

  const handleAddDummyUser = async () => {
    const body: User = {
      name: "user 1",
      surname: "suer",
      userName: "userino",
      email: "user@gm.com",
    };
    const data = await request("user", "POST", body);
    console.log("data:", data);
  };

  return (
    <div>
      <h1>App {new Date().toLocaleDateString()}</h1>
      <button onClick={handleGetAllUsers}>Get</button>
      <button onClick={handleAddDummyUser}>Add dummy user</button>
    </div>
  );
}
