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
    <div className="container mx-auto bg-background w-full h-[100vh] p-[10px]">
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

        <div className="mx-auto flex justify-between items-center h-[80vh]">
          {/* body text */}
          <div>
            <h2>Trade Smarter. Faster. With AI-Driven Precision.</h2>
            <p>
              Unlock the future of crypto trading with intelligent insights,
              automated strategies, and seamless wallet connectivity.
            </p>
            <p>
              Connect your existing wallet or create a new one, and trade with
              confidence powered by advanced AI-powered tools.
            </p>

            <h5>Features</h5>
            <ul>
              <li>
                <span>
                  <IoMdCheckmark />
                </span>
                <span>Connect your existing wallet instantly</span>
              </li>
              <li>
                {" "}
                <span>
                  <IoMdCheckmark />
                </span>
                <span>AI-powered insights into real-time market trends</span>
              </li>
              <li>
                <span>
                  <IoMdCheckmark />
                </span>
                <span>Create a secure new wallet in seconds</span>
              </li>
              <li>
                <span>
                  <IoMdCheckmark />
                </span>
                <span>Live market charts and analytics</span>{" "}
              </li>
              <li>
                <span>
                  <IoMdCheckmark />
                </span>{" "}
                <span>Instant buy/sell execution with low latency</span>
              </li>
            </ul>

            <Link href="/signup">Get Started</Link>
          </div>
          {/* image */}
          <div>
            <Image src="/crpto3.avif" alt="" width={100} height={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mainhome;
