import ThemeToggle from "../common/ThemeToggle";
import style from "../../styles/layout.module.scss";

export default function Main({ children }) {
  return <div className={style.main}>{children}</div>;
}
