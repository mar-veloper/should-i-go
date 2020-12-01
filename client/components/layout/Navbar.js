import ThemeToggle from "../common/ThemeToggle";
import style from "../../styles/layout.module.scss";
import Link from "next/link";
import { useContext } from "react";
import ThemeContext from "../../theme/Context";

export default function Navbar() {
  const { themeClass } = useContext(ThemeContext);
  return (
    <div className={`${style.navbar} ${themeClass}`}>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}
