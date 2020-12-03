import style from "../../styles/layout.module.scss";
import { useContext } from "react";
import ThemeContext from "../../theme/Context";
import ActiveLink from "../common/ActiveLnk";
import lscache from "lscache";
import { useRouter } from "next/router";

export default function Navbar() {
  const { themeClass } = useContext(ThemeContext);
  const lastSearched = lscache.get("lastSearched");
  const router = useRouter();

  return (
    <div className={`${style.navbar}`}>
      {router.pathname !== "/place/[placeId]" && lastSearched && (
        <div className={`${style.lastSearch} ${themeClass}`}>
          <ActiveLink href={lastSearched.url}>
            <div className={style.icon}>
              <p>{lastSearched.placeName}</p>
            </div>
          </ActiveLink>
        </div>
      )}

      <ul className={themeClass}>
        <li>
          <ActiveLink href="/">
            <div className={style.icon}>
              <p>Search</p>
            </div>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/about">
            <div className={style.icon}>
              <p>About</p>
            </div>
          </ActiveLink>
        </li>
      </ul>
    </div>
  );
}
