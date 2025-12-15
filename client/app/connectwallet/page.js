import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
function Connectwallet() {
  return (
    <div>
      <div>
        <div>
          <Link href="/choosewallet">
            <span>
              <FaArrowLeft />
            </span>
            <span>Back</span>
          </Link>
        </div>
        <div>
          <div>
            <h3>Connect Wallet</h3>
            <p>Choose your preferred wallet provider</p>
          </div>

          <div>
            <Link href="">
              <div>
                <Image
                  src="/metamask.png"
                  alt="metamask"
                  width={100}
                  height={100}
                />
              </div>

              <div>
                <h6>MetaMask</h6>
                <p>Connect to MetaMask wallet</p>
              </div>
            </Link>
            <Link href="">
              <div>
                <Image
                  src="/walletconnect.png"
                  alt="walletconnect"
                  width={100}
                  height={100}
                />
              </div>

              <div>
                <h6>WalletConnect</h6>
                <p>Scan QR to connect Your wallet</p>
              </div>
            </Link>
          </div>

          <div>
            <p>Don't have a wallet?</p>
            <Link href="">Create one now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connectwallet;
