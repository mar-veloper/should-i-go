import ThemeToggle from "../common/ThemeToggle";
import style from "../../styles/layout.module.scss";
import { Link } from "next/link";

export default function Header() {
  return (
    <div className={style.header}>
      <a href="/" className={style.logo}>
        SHOULD I GO
      </a>
      <ThemeToggle />
    </div>
  );
}
