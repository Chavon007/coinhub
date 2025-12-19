"use client";
import { useEffect, useState } from "react";
import { useWallet } from "@/context/walletContext";
import { ethers } from "ethers";
import * as bip39 from "bip39";
import * as bip32 from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as ecc from "tiny-secp256k1";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";

// Init bitcoin ecc + bip32
bitcoin.initEccLib(ecc);
const bip32Factory = bip32.BIP32Factory(ecc);

function WalletCreation() {
  const { newCreateWallet, getWallet } = useWallet();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWallet = async () => {
    setLoading(true);
    try {
      const data = await getWallet();
      setWallet(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const createWallet = async () => {
    try {
      setLoading(true);
      setError("");

      // Generate mnemonic (12 words)
      const mnemonic = bip39.generateMnemonic();
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const seedHex = seed.toString("hex");

      // 1. Ethereum (BIP44: m/44'/60'/0'/0/0)
      const ethWallet = ethers.Wallet.fromPhrase(mnemonic);

      // 2. Bitcoin (BIP44: m/44'/0'/0'/0/0) - Native SegWit (Bech32)
      const btcNode = bip32Factory.fromSeed(seed);
      const btcChild = btcNode.derivePath("m/44'/0'/0'/0/0");
      const { address: btcAddress } = bitcoin.payments.p2wpkh({
        pubkey: btcChild.publicKey,
        network: bitcoin.networks.bitcoin,
      });

      // 3. Solana (BIP44: m/44'/501'/0'/0') - ed25519
      const solPath = "m/44'/501'/0'/0'";
      const solDerived = derivePath(solPath, seedHex);
      const solKeypair = Keypair.fromSeed(solDerived.key);
      const solAddress = solKeypair.publicKey.toBase58();

      // 4. Ripple (XRP) - Using secp256k1 like Bitcoin
      const xrpNode = bip32Factory.fromSeed(seed);
      const xrpChild = xrpNode.derivePath("m/44'/144'/0'/0/0");
      const xrpPubKey = xrpChild.publicKey.toString("hex");
      const xrpAddress = `r${xrpPubKey.slice(0, 33)}`;

      const walletData = {
        ethereum: ethWallet.address,
        bitcoin: btcAddress || "Error generating BTC address",
        solana: solAddress,
        ripple: xrpAddress,
        mnemonic,
      };

      await newCreateWallet(walletData);
    } catch (err) {
      console.error("Wallet creation error:", err);
      setError(err.message || "Failed to create wallet");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  if (loading && !wallet)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="h-auto">
      <div className="flex flex-col  mt-[50px] h-auto w-[98%] lg:w-[80%] mx-auto">
        <h2 className="text-center font-orbitron text-text-secondary text-2xl font-bold">
          Create Multi-Chain Wallet
        </h2>
        <p className="text-center text-text-primary text-xs md:text-sm italic font-semibold">
          Generate addresses for Ethereum, Bitcoin, Solana & Ripple
        </p>

        {error && (
          <div>
            <p className="text-error text-xs font-outfit">Error: {error}</p>
          </div>
        )}

        {!wallet && (
          <div className=" w-[20%]  p-[8px] mt-[20px]">
            <button
              className="bg-accent-blue flex items-center cursor-pointer hover:bg-blue-600 hover:scale-[1.05] transition text-base font-roboto p-[10px] w-[180px] justify-between rounded rounded-2xl text-text-primary font-semibold"
              onClick={createWallet}
              disabled={loading}
            >
              <span>{loading ? "Generating..." : "Create Wallet"}</span>{" "}
              <span>
                <FaPlus />
              </span>
            </button>
          </div>
        )}

        {wallet && (
          <div className="mt-[10px] flex flex-col w-[90%] mx-auto">
            {/* Warning */}
            <div className=" p-[10px]">
              <p className="text-text-secondary text-xs font-bold font-nunito-sans text-center">
                ⚠️ CRITICAL: Write down your recovery phrase and store it
                safely. Never share it with anyone!
              </p>
            </div>

            {/* Recovery Phrase */}
            <div className="h-auto">
              <h3 className="text-text-secondary font-bold text-2xl font-roboto">
                Recovery Phrase
              </h3>
              <button
                className="w-[150px] rounded rounded-1xl mb-[5px] hover:bg-green-700 hover:scale-[1.05] transition cursor-pointer bg-accent-green text-center p-[10px] text-xs text-text-primary font-bold"
                onClick={() => copyToClipboard(wallet.mnemonic)}
              >
                Copy to clipboard
              </button>

              <div className=" w-[90%] lg:w-[60%] mx-auto grid grid-cols-4 bg-surface p-[8px] text-center border border-border border-2 mt-[10px]">
                {wallet.mnemonic.split(" ").map((word, idx) => (
                  <div key={idx}>
                    <span className="text-text-primary italic font-outfit italic text-xs">
                      {word}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Addresses */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ethereum */}
              <div className="bg-[#121826] border border-[#1F2937] rounded-xl p-5 space-y-3">
                <h4 className=" flex items-center gap-1 text-base font-semibold text-text-secondary font-orbitron">
                  <span> Ethereum (ETH)</span>{" "}
                  <span>
                    <Image
                      src="/eth.png"
                      alt="ethereum"
                      width={40}
                      height={30}
                      className="rounded rounded-3xl p-[10px]"
                    />
                  </span>
                </h4>
                <p className="text-sm text-text-primary font-outfit italic">
                  Also works for Polygon, BSC, Arbitrum
                </p>

                <div className="bg-[#0B0F1A] p-3 rounded text-xs text-gray-300 break-all">
                  {wallet.ethereum}
                </div>

                <button
                  onClick={() => copyToClipboard(wallet.ethereum)}
                  className="w-full mt-2 bg-accent-green hover:bg-green-700 text-xs text-text-primary font-bold py-2 rounded-lg transition"
                >
                  Copy Address
                </button>
              </div>

              {/* Bitcoin */}
              <div className="bg-[#121826] border border-[#1F2937] rounded-xl p-5 space-y-3">
                <h4 className=" flex gap-1 items-center text-base font-semibold text-text-secondary font-orbitron">
                  <span> Bitcoin (BTC)</span>

                  <span>
                    <Image
                      src="/btc.png"
                      alt="bitcoin"
                      width={40}
                      height={40}
                      className="rounded rounded-3xl p-[10px]"
                    />
                  </span>
                </h4>
                <p className="text-sm text-text-primary font-outfit italic">
                  Native SegWit (Bech32)
                </p>

                <div className="bg-[#0B0F1A] p-3 rounded text-xs text-gray-300 break-all">
                  {wallet.bitcoin}
                </div>

                <button
                  onClick={() => copyToClipboard(wallet.bitcoin)}
                  className="w-full mt-2 bg-accent-green hover:bg-green-700 text-xs text-text-primary font-bold py-2 rounded-lg transition"
                >
                  Copy Address
                </button>
              </div>

              {/* Solana */}
              <div className="bg-[#121826] border border-[#1F2937] rounded-xl p-5 space-y-3">
                <h4 className="flex items-center gap-1 text-base font-semibold text-text-secondary font-orbitron">
                  <span>Solana (SOL)</span>
                  <span>
                    <Image
                      src="/sol.jpeg"
                      alt="solana"
                      width={40}
                      height={30}
                      className="rounded rounded-3xl p-[10px]"
                    />
                  </span>
                </h4>
                <p className="text-sm text-text-primary font-outfit italic">
                  Base58 encoded
                </p>

                <div className="bg-[#0B0F1A] p-3 rounded text-xs text-gray-300 break-all">
                  {wallet.solana}
                </div>

                <button
                  onClick={() => copyToClipboard(wallet.solana)}
                  className="w-full mt-2 bg-accent-green hover:bg-green-700 text-xs text-text-primary font-bold py-2 rounded-lg transition"
                >
                  Copy Address
                </button>
              </div>

              {/* Ripple */}
              <div className="bg-[#121826] border border-[#1F2937] rounded-xl p-5 space-y-3">
                <h4 className="flex gap-1 items-center text-base font-semibold text-text-secondary font-orbitron  ">
                  <span>Ripple (XRP)</span>

                  <span>
                    <Image
                      src="/xrp.png"
                      alt="ripple xrp"
                      width={40}
                      height={30}
                      className="rounded rounded-3xl p-[10px]"
                    />
                  </span>
                </h4>
                <p className="text-sm text-text-primary font-outfit italic">
                  Simplified format (for demo)
                </p>

                <div className="bg-[#0B0F1A] p-3 rounded text-xs text-gray-300 break-all">
                  {wallet.ripple}
                </div>

                <button
                  onClick={() => copyToClipboard(wallet.ripple)}
                  className="w-full mt-2 bg-accent-green hover:bg-green-700 text-xs text-text-primary font-bold py-2 rounded-lg transition"
                >
                  Copy Address
                </button>
              </div>
            </div>

            {/* Create Another Button */}
            <button
              className="bg-accent-blue cursor-pointer hover:bg-blue-600 hover:scale-[1.05] transition text-sm font-roboto p-[8px] w-[200px] mx-auto rounded rounded-2xl text-text-primary font-semibold text-center mt-[30px]"
              onClick={() => {
                setWallet(null);
                setError("");
              }}
            >
              Create Another Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletCreation;
