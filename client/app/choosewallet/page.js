import Link from "next/link";
import { FaWallet } from "react-icons/fa";

function Choose() {
  return (
    <div className="">
      <div>
        <div>
          <h6>
            <FaWallet />
          </h6>
          <h3>Welcome to Wallet Hub</h3>
          <p>Connect or create your crypto wallet</p>
        </div>
        <div>
          <Link href="">Connect Existing Walle</Link>
        </div>
        <div>
          <Link href="">Create New Wallet</Link>
        </div>
      </div>
    </div>
  );
}
export default Choose;
