import Link from "next/link";
import { FaWallet } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

function Choose() {
  return (
    <div className="container mx-auto bg-background w-[100%] h-[100vh] p-[10px]">
      <div className="w-[100%] lg:w-[70%] mx-auto flex flex-col justify-center items-center h-[70vh] md:h-[60vh] lg:h-[80vh]">
        <div className=" p-[20px]">
          <h6 className="flex justify-center text-text-secondary text-4xl font-bold p-[10px]">
            <FaWallet />
          </h6>
          <h3 className="font-roboto text-center text-text-secondary text-1xl lg:text-3xl font-bold">
            Welcome to Wallet Hub
          </h3>
          <p className="text-center text-text-primary font-outfit italic text-sm">
            Connect or create your crypto wallet
          </p>
        </div>
        <div className=" w-[95%] flex flex-col justify-center items-center p-[5px] mx-auto">
          <div className="cursor-pointer hover:scale-[1.05] hover:border-[#1E90FF] hover:border-1 transition mb-[20px] border border-[#1F2937] border-2 w-[100%] md:max-w-[500px] p-[25px] bg-surface">
            <Link href="" className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-roboto font-semibold text-text-secondary text-2xl">
                  Connect Existing Wallet
                </span>
                <span className="font-sans text-text-primary p-[5px] italic text-xs">
                  MetaMask, WalletConnect & more
                </span>
              </div>
              <div className="text-accent-green font-bold text-2xl">
                <FaPlus />
              </div>
            </Link>
          </div>
          <div className=" cursor-pointer hover:scale-[1.05] hover:border-[#1E90FF] hover:border-1 transition border border-[#1F2937] border-2 w-[100%] max-w-[500px] p-[25px] bg-surface">
            <Link href="" className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-roboto font-semibold text-text-secondary text-2xl">
                  Create New Wallet
                </span>

                <span className="font-sans text-text-primary p-[5px] italic text-xs">
                  Generate a new wallet with recovery phrase
                </span>
              </div>
              <div className="text-accent-green font-bold text-2xl">
                <FaPlus />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Choose;
