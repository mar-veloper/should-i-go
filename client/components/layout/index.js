import Header from "./Header";
import style from "../../styles/layout.module.scss";
import Navbar from "./Navbar";
import Main from "./Main";

export default function Layout({ children }) {
  return (
    <div className={style.container}>
      <Header />
      <Main>{children}</Main>
      <Navbar />
    </div>
  );
}
