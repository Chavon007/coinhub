"use client";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import Image from "next/image";

function Mainhome() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="container mx-auto bg-background w-full h-auto p-[10px] pb-[30px]">
      <div className=" w-[95%] mx-auto h-auto mt-[10px]">
        {/* header section */}
        <div className="flex justify-between items-center">
          {/* logo */}
          <div className="w-[20%] p-[10px]">
            <h1 className="font-orbitron text-3xl bold text-text-secondary">
              CoinHub
            </h1>
          </div>

          <div className="hidden lg:block w-[15%]  p-[5px] lg:flex lg:justify-between lg:gap-2 lg:items-center">
            <Link
              className="max-w-[300px] text-text-secondary text-xs font-nunito-sans border-3 font-bold hover:scale-[1.05] border border-[var(--color-border)] py-[5px] transition px-[20px]"
              href="/signup"
            >
              Signup
            </Link>
            <Link
              className="max-w-[300px] text-text-secondary text-xs font-nunito-sans border-3 font-bold hover:scale-[1.05] border border-[var(--color-border)] py-[5px] px-[20px] transition"
              href="/login"
            >
              Login
            </Link>
          </div>

          <div
            className=" font-orbitron text-3xl bold text-text-secondary lg:hidden z-60"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <IoCloseOutline /> : <CiMenuBurger />}
          </div>

          {menu && (
            <div className="lg:hidden bg-background fixed inset-0 flex flex-col justify-center items-center gap-3 z-50">
              <Link
                className="font-outfit text-1xl bold text-text-secondary"
                onClick={() => setMenu(false)}
                href="/signup"
              >
                Signup
              </Link>
              <Link
                className="font-outfit text-1xl bold text-text-secondary"
                onClick={() => setMenu(false)}
                href="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* body section */}

        <div className=" mt-[20px] lg:mt-[40px] lg:flex justify-between items-center">
          {/* body text */}
          <div className="w-[100%] lg:w-[70%] flex flex-col">
            <h2 className="w-[100%] text-center lg:max-w-[500px] lg:text-left font-outfit text-text-secondary text-2xl lg:text-5xl font-bold">
              Trade Smarter. Faster. With AI-Driven Precision.
            </h2>
            <p className="mt-[15px] font-nunito-sans text-text-primary text-base max-w-[450px] font-semibold">
              Unlock the future of crypto trading with intelligent insights,
              automated strategies, and seamless wallet connectivity.
            </p>
            <p className="mt-[15px] font-nunito-sans text-text-primary text-base max-w-[450px] font-semibold">
              Connect your existing wallet or create a new one, and trade with
              confidence powered by advanced AI-powered tools.
            </p>

            <h5 className=" mt-[10px] font-roboto text-text-secondary text-2xl font-bold">
              Features
            </h5>
            <ul className="mt-[5px] flex flex-col gap-3">
              <li className="flex gap-2 items-center">
                <span className="text-accent-blue font-bold">
                  <IoMdCheckmark />
                </span>
                <span className="text-accent-green font-outfit italic text-sm">
                  Connect your existing wallet instantly
                </span>
              </li>
              <li className="flex gap-2 items-center">
                {" "}
                <span className="text-accent-blue font-bold">
                  <IoMdCheckmark />
                </span>
                <span className="text-accent-green font-outfit italic text-sm">
                  AI-powered insights into real-time market trends
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-accent-blue font-bold">
                  <IoMdCheckmark />
                </span>
                <span className="text-accent-green font-outfit text-sm italic">
                  Create a secure new wallet in seconds
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-accent-blue font-bold">
                  <IoMdCheckmark />
                </span>
                <span className="text-accent-green font-outfit text-sm italic">
                  Live market charts and analytics
                </span>{" "}
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-accent-blue font-bold">
                  <IoMdCheckmark />
                </span>{" "}
                <span className="text-accent-green font-outfit italic text-sm">
                  Instant buy/sell execution with low latency
                </span>
              </li>
            </ul>

            <Link
              className="max-w-[150px] flex justify-center mt-[20px] font-bold text-text-secondary text-base font-nunito-sans border-3 font-bold hover:scale-[1.05] border border-[var(--color-border)] py-[5px] transition px-[20px]"
              href="/signup"
            >
              Get Started
            </Link>
          </div>
          {/* image */}
          <div className="lg:w-[60%]">
            <Image
              src="/crpto.png"
              alt=""
              width={1000}
              height={1000}
              style={{ width: "500px", height: "350px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mainhome;
