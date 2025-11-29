"use client"
import { useState, useRef } from "react"
import { UserField } from "@/app/lib/definitions";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { updateUser} from "@/app/lib/actions";
import { supabase } from "@/app/lib/supabase";


export default function EditProfile({ user }: { user: UserField[] }) {
  const user1 = user[0];
  const [editing, setEditing] = useState(false)
  const [username, setUsername] = useState(user1.username)
  const [profilePic, setProfilePic] = useState(user1.user_image_url)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    if (editing && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  const fileName = `${user1.user_id}-${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from("Avatars")
    .upload(fileName, file, { cacheControl: "3600", upsert: true })

  if (error) {
    console.error("Error subiendo archivo:", error.message)
    return
  }

  const { data } = supabase.storage
    .from("Avatars")
    .getPublicUrl(fileName)

  if (!data?.publicUrl) {
    console.error("No se pudo obtener la URL pública")
    return
  }

  // Preview y listo para guardar
  setProfilePic(data.publicUrl)
}



  const handleSave = async () => {
    await updateUser({
      id: user1.user_id,
      username,
      user_image_url: profilePic,
    })
    setEditing(false)
  }

  return (
    <main className="w-full">
      {/* Botón de edición */}
      <div className="flex justify-end">
        <button
          className="text-white hover:text-gray-400"
          onClick={() => setEditing(!editing)}
        >
          <Pencil size={24} />
        </button>
      </div>

      {/* Foto + Username */}
      <div className="flex flex-row items-center gap-10 font-ne">
        <div onClick={handleImageClick} className="cursor-pointer">
          <div
            onClick={handleImageClick}
            className={`cursor-pointer relative 
              w-[120px] h-[120px] lg:w-[180px] lg:h-[180px]`}
          >
            <Image
              alt="User profile"
              src={profilePic}
              fill
              priority
              className="object-cover bg-white rounded-full"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {editing ? (
          <input
            className=" w-full text-3xl lg:text-5xl font-bold text-white bg-transparent border-b border-gray-500 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : (
          <h2 className="text-3xl lg:text-5xl font-bold text-white">{username}</h2>
        )}
      </div>

      {/* Guardar cambios */}
      {editing && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
          >
            Guardar cambios
          </button>
        </div>
      )}
    </main>
  )
}
