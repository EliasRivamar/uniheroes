"use server";

import { auth } from "@/auth";
import Image from 'next/image';
import { fetchUser } from "@/app/lib/data";
import EditProfile from "./EditProfile"

export default async function Pro() {
  const session = await auth();
  if (!session?.user) return <p>No estás loggeado</p>;
  const id = session?.user.id;
  const user = await fetchUser(id);
  return (
    <main className="w-full">
      <div className="flex justify-end">
        <EditProfile user={user}/>
      </div>
      <div className="flex justify-end">
        <h1 className="text-sm lg:text-xl text-white">Pin Favorite Character</h1>
      </div>
    </main>
  );
}
