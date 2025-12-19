"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useWallet } from "@/context/walletContext";
import WalletProvider from "@/context/walletContext";
function Connectwallet() {
  const { createWallet } = useWallet();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const data = await createWallet;
      setWallet(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <WalletProvider>
      <div className="container mx-auto bg-background w-[100%] h-[100vh] p-[10px]">
        <div className="w-[100%] lg:w-[50%] mx-auto flex flex-col justify-center h-[80vh] md:h-[60vh] lg:h-[80vh]">
          <div className="flex mt-[20px] lg:mt-[50px] w-[100%] md:w-[80%] mx-auto">
            <Link
              href="/choosewallet"
              className="flex items-center p-[5px] gap-2 "
            >
              <span className="text-text-primary font-bold hover:text-text-secondary">
                <FaArrowLeft />
              </span>
              <span className="text-sm text-text-primary fontroboto text-base italic hover:text-text-secondary">
                Back
              </span>
            </Link>
          </div>

          <div className="flex flex-col justify-center w-[98%] md:w-[80%] mt-[30px] lg:mt-2 mx-auto h-[80vh] p-[20px] bg-surface rounded rounded-2xl border border-1 border-[#1F2937]">
            <div className="text-center">
              <h3 className="text-2xl font-orbitron font-bold  text-text-secondary">
                Connect Wallet
              </h3>
              <p className="text-text-primary italic text-sm font-outfit">
                Choose your preferred wallet provider
              </p>
            </div>

            <div className="w-[98%] mt-[20px] mx-auto flex flex-col">
              <Link
                className="flex gap-4 cursor-pointer hover:scale-[1.05] hover:border-[#1E90FF] hover:border-1 transition mb-[20px] border border-[#1F2937] border-2 w-[100%] lg:max-w-[500px] p-[25px] bg-background"
                href=""
              >
                <div>
                  <Image
                    src="/metamask.png"
                    alt="metamask"
                    width={50}
                    height={50}
                    className=" rounded-3xl p-[10px]"
                  />
                </div>

                <div className="">
                  <h6 className="text-text-secondary font-semibold font-roboto text-3xl">
                    MetaMask
                  </h6>
                  <p className="text-accent-green text-xs italic font-outfit">
                    Connect to MetaMask wallet
                  </p>
                </div>
              </Link>
              <Link
                className="flex items-center gap-4 cursor-pointer hover:scale-[1.05] hover:border-[#1E90FF] hover:border-1 transition mb-[20px] border border-[#1F2937] border-2 w-[100%] lg:max-w-[500px] p-[25px] bg-background"
                href=""
              >
                <div>
                  <Image
                    src="/walletconnect.png"
                    alt="walletconnect"
                    width={50}
                    height={50}
                    className=" rounded-4xl lg:rounded-3xl  lg:p-[10px]"
                  />
                </div>

                <div>
                  <h6 className="text-text-secondary font-semibold font-roboto text-3xl">
                    WalletConnect
                  </h6>
                  <p className="text-accent-green text-xs italic font-outfit">
                    Scan QR to connect Your wallet
                  </p>
                </div>
              </Link>
            </div>

            <div className=" flex justify-center items-center gap-1">
              <p className="text-text-primary text-sm font-nunito-sans italic">
                Don't have a wallet?
              </p>
              <Link
                className="text-xs font-nunito-sans text-accent-blue hover:underline hover:text-blue-300"
                href=""
              >
                Create one now
              </Link>
            </div>
          </div>

          <div className=" text-center mt-[10px]">
            <p className="text-gray-300 text-sans italic text-xs">
              🔒We will never store your private keys or recovery phrase
            </p>
          </div>
        </div>
      </div>
    </WalletProvider>
  );
}

export default Connectwallet;
