"use client";

import { useState } from "react";
import { ethers } from "ethers";
import * as bip39 from "bip39";
import * as bip32 from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as ecc from "tiny-secp256k1";

// Init bitcoin ecc + bip32
bitcoin.initEccLib(ecc);
const bip32Factory = bip32.BIP32Factory(ecc);

function Newwallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      // Save wallet data
      setWallet({
        mnemonic,
        ethereum: ethWallet.address,
        bitcoin: btcAddress || "Error generating BTC address",
        solana: solAddress,
        ripple: xrpAddress,
      });

      setLoading(false);
    } catch (err) {
      console.error("Wallet creation error:", err);
      setError(err.message || "Failed to create wallet");
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div>
      <div>
        <h2>Create Multi-Chain Wallet</h2>
        <p>Generate addresses for Ethereum, Bitcoin, Solana & Ripple</p>

        {error && (
          <div>
            <p>Error: {error}</p>
          </div>
        )}

        {!wallet && (
          <div>
            <button onClick={createWallet} disabled={loading}>
              {loading ? "Generating..." : "Create Wallet"}
            </button>
          </div>
        )}

        {wallet && (
          <div>
            {/* Warning */}
            <div>
              <p>
                ⚠️ CRITICAL: Write down your recovery phrase and store it
                safely. Never share it with anyone!
              </p>
            </div>

            {/* Recovery Phrase */}
            <div>
              <h3>Recovery Phrase</h3>
              <button onClick={() => copyToClipboard(wallet.mnemonic)}>
                Copy
              </button>

              <div>
                {wallet.mnemonic.split(" ").map((word, idx) => (
                  <div key={idx}>
                    <span>
                      {idx + 1}. {word}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Addresses */}
            <div>
              {/* Ethereum */}
              <div>
                <h4>Ethereum (ETH)</h4>
                <p>Also works for Polygon, BSC, Arbitrum</p>
                <button onClick={() => copyToClipboard(wallet.ethereum)}>
                  Copy
                </button>
                <p>{wallet.ethereum}</p>
              </div>

              {/* Bitcoin */}
              <div>
                <h4>Bitcoin (BTC)</h4>
                <p>Native SegWit (Bech32)</p>
                <button onClick={() => copyToClipboard(wallet.bitcoin)}>
                  Copy
                </button>
                <p>{wallet.bitcoin}</p>
              </div>

              {/* Solana */}
              <div>
                <h4>Solana (SOL)</h4>
                <p>Base58 encoded</p>
                <button onClick={() => copyToClipboard(wallet.solana)}>
                  Copy
                </button>
                <p>{wallet.solana}</p>
              </div>

              {/* Ripple */}
              <div>
                <h4>Ripple (XRP)</h4>
                <p>Simplified format (for demo)</p>
                <button onClick={() => copyToClipboard(wallet.ripple)}>
                  Copy
                </button>
                <p>{wallet.ripple}</p>
              </div>
            </div>

            {/* Create Another Button */}
            <button
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

export default Newwallet;
