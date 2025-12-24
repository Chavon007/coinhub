"use client";
import { CiMenuBurger, CiSettings } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";

function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <header className="bg-background w-full">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-text-secondary">
            CoinHub
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-6 items-center">
          <Link className="text-text-secondary font-roboto font-bold hover:text-text-primary" href="">
            Home
          </Link>
          <Link className="text-text-secondary font-roboto font-bold hover:text-text-primary" href="">
            About
          </Link>
          <Link className="text-text-secondary font-roboto font-bold hover:text-text-primary" href="">
            News
          </Link>
          <Link className="text-text-secondary font-roboto font-bold hover:text-text-primary" href="/login">
            AI Insight
          </Link>
          <Link className="text-text-secondary font-roboto font-bold hover:text-text-primary" href="/login">
            Contact
          </Link>
          <Link className="text-text-secondary font-roboto font-bold hover:text-text-primary" href="/login">
            Wallet Hub
          </Link>
          <button className="flex items-center gap-1">
            <CiSettings className="text-text-primary text-2xl" />
            <span className="text-text-secondary font-roboto font-bold hover:text-text-primary">
              Settings
            </span>
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden text-3xl text-text-secondary" onClick={() => setMenu(!menu)}>
          {menu ? <IoCloseOutline /> : <CiMenuBurger />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <nav className="lg:hidden bg-background w-full fixed top-[64px] left-0 flex flex-col gap-4 p-4 max-w-[400px]">
          {["Home", "About", "News", "AI Insight", "Contact", "Wallet Hub"].map((item, i) => (
            <Link
              key={i}
              href={item === "AI Insight" || item === "Contact" || item === "Wallet Hub" ? "/login" : ""}
              className="text-text-secondary font-roboto font-bold hover:text-text-primary"
              onClick={() => setMenu(false)}
            >
              {item}
            </Link>
          ))}
          <button className="flex items-center gap-1" onClick={() => setMenu(false)}>
            <CiSettings className="text-text-primary text-2xl" />
            <span className="text-text-secondary font-roboto font-bold hover:text-text-primary">
              Settings
            </span>
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
