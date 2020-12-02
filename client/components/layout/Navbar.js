import ThemeToggle from "../common/ThemeToggle";
import style from "../../styles/layout.module.scss";
import Link from "next/link";
import { useContext } from "react";
import ThemeContext from "../../theme/Context";
import ActiveLink from "../common/ActiveLnk";

export default function Navbar() {
  const { themeClass } = useContext(ThemeContext);
  return (
    <div className={`${style.navbar}`}>
      <ul className={themeClass}>
        <li>
          <ActiveLink href="/">
            <div className={style.icon}>
              {/* <i className="fas fa-search-location"></i> */}
              <p>Search</p>
            </div>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/about">
            <div className={style.icon}>
              {/* <i className="far fa-question-circle"></i> */}
              <p>About</p>
            </div>
          </ActiveLink>
        </li>
      </ul>
    </div>
  );
}
