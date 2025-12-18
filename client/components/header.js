"use client";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";

function Header() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="container mx-auto bg-background w-full h-auto p-[10px]">
      <div className="w-[95%] mx-auto flex justify-between items-center">
        {/* logo */}
        <div className="w-[20%] p-[10px]">
          <h1 className="font-orbitron text-3xl bold text-text-secondary">
            CoinHub
          </h1>
        </div>

        <div className="hidden lg:block w-[50%] lg:flex justify-between">
          <Link
            className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
            href=""
          >
            Home
          </Link>
          <Link
            className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
            href=""
          >
            About
          </Link>

          <Link
            className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
            href=""
          >
            News
          </Link>

          <Link
            className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
            href="/login"
          >
            AI insight
          </Link>
          <Link
            className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
            href="/login"
          >
            Contact
          </Link>
          <Link
            className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
            href="/login"
          >
            Wallet Hub
          </Link>
          <button className="flex items-center gap-1">
            <span className="text-text-primary text-2xl">
              <CiSettings />
            </span>
            <span className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary">
              Settings
            </span>
          </button>
        </div>

        <div
          className=" font-orbitron text-3xl bold text-text-secondary lg:hidden z-60"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <IoCloseOutline /> : <CiMenuBurger />}
        </div>

        {menu && (
          <div className="lg:hidden bg-background fixed inset-0 flex flex-col gap-7 mt-[50px] pt-[40px] pl-[20px]">
            <Link
              className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
              href=""
              onClick={() => setMenu(false)}
            >
              Home
            </Link>
            <Link
              className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
              href=""
              onClick={() => setMenu(false)}
            >
              About
            </Link>

            <Link
              className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
              href=""
              onClick={() => setMenu(false)}
            >
              News
            </Link>

            <Link
              className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
              href="/login"
              onClick={() => setMenu(false)}
            >
              AI insight
            </Link>
            <Link
              className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
              href="/login"
              onClick={() => setMenu(false)}
            >
              Contact
            </Link>
            <Link
              className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
              href="/login"
              onClick={() => setMenu(false)}
            >
              Wallet Hub
            </Link>
            <button className="flex items-center gap-1">
              <span className="text-text-primary text-2xl">
                <CiSettings />
              </span>
              <span
                onClick={() => setMenu(false)}
                className="text-text-secondary text-roboto font-bold text-1xl hover:text-text-primary"
              >
                Settings
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Header;
