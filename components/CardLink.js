import Link from "next/link";

export default function CardLink() {
  return (
    <ul className="categories products">
      <li className="my-4 text-capitalize">
        <Link href="/sales">
          <a className="w-100 h-100">on sale!</a>
        </Link>
      </li>
      <li className="my-4 text-capitalize">
        <Link href="/categories">
          <a className="w-100 h-100">categories</a>
        </Link>
      </li>
      <li className="my-4 text-capitalize">
        <Link href="/contact">
          <a className="w-100 h-100">contact</a>
        </Link>
      </li>
    </ul>
  );
}
