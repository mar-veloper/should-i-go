import ThemeToggle from "../common/ThemeToggle";
import Link from "next/link";
import style from "../../styles/layout.module.scss";

export default function Header() {
  return (
    <div className={style.header}>
      <Link href="/">
        <span className={style.logo}>SHOULD I GO</span>
      </Link>
      <ThemeToggle />
    </div>
  );
}
