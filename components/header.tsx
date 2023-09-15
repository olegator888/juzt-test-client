import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const { userId } = useAuth();

  const [authInited, setAuthInited] = useState(false);

  if (authInited) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="h-[50px] border-b flex justify-between items-center px-6 relative">
      <Link
        href="https://hh.ru/resume/e41df9d4ff0b50a5850039ed1f5a6d67586b37"
        target="_blank"
        className="flex gap-2 items-center"
      >
        <span>Шевченко Олег</span> <div className="animate-bounce">👋</div>{" "}
      </Link>
      <div className="absolute left-[45%] flex items-center gap-4">
        <Link className="font-semibold" href="/">
          Cars App
        </Link>
        {userId && (
          <Link
            className=" text-white bg-green-600 py-1 px-3 rounded-sm hover:opacity-80 transition-opacity"
            href="/create-car"
          >
            Create Car
          </Link>
        )}
      </div>
      {userId ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <Button onClick={() => setAuthInited(true)}>Авторизоваться</Button>
      )}
    </div>
  );
};

export default Header;
