"use client";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

function Mainhome() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="container mx-auto bg-background w-full h-[100vh] p-[10px]">
      <div className=" w-[95%] mx-auto h-auto mt-[10px]">
        {/* header section */}
        <div className="flex justify-between items-center">
          {/* logo */}
          <div className="w-[20%] p-[10px]">
            <h1 className="font-orbitron text-4xl bold text-text-secondary">
              CoinHub
            </h1>
          </div>

          <div className="hidden lg:block w-[20%] flex justify-between">
            <Link href="/signup">SignUp</Link>
            <Link href="/login">Login</Link>
          </div>

          <div className="lg:hidden" onClick={() => setMenu(!menu)}>
            {menu ? <IoCloseOutline /> : <CiMenuBurger />}
          </div>

          {menu && (
            <div className="hidden lg:block">
              <Link onClick={() => setMenu(false)} href="/signup">
                SignUp
              </Link>
              <Link onClick={() => setMenu(false)} href="/login">
                Login
              </Link>
            </div>
          )}
        </div>

        {/* body section */}
      </div>
    </div>
  );
}
export default Mainhome;
