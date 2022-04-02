import Link from "next/link";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

export default function Socials() {
  return (
    <div>
      <Link href="http://www.instagram.com">
        <a target="_blank" rel="noopener noreferrer">
          <FaInstagramSquare className="_social-icon " />
        </a>
      </Link>
      <Link href="http://www.Facebook.com">
        <a target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare className="_social-icon " />
        </a>
      </Link>
    </div>
  );
}
