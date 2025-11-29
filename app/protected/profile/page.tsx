import Pro from "@/app/ui/profile/profile";
import NavProfile from "@/app/ui/profile/nav-profile";

export default async function ProfilePage() {
  return (
    <main className="flex flex-col p-2 lg:p-8">
    <div className="flex items-center bg-[#292828] rounded-[22px] w-full lg:h-[20%] p-6 lg:p-8">
        <Pro></Pro>
    </div>
    <div className="flex">
      <NavProfile></NavProfile>
    </div>
    </main>
  );
}
