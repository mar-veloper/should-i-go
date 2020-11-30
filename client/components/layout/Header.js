import ThemeToggle from "../common/ThemeToggle";
import style from "../../styles/layout.module.scss";

export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.logo}>SHOULD I GO</div>
      <ThemeToggle />
    </div>
  );
}
