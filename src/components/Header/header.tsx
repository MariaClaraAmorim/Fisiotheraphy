import Image from "next/image";
import css from "./styles.module.css";
import logoFisioterapia from "src/assets/images/logofisioterapia.svg";
import Link from "next/link";

export function Header() {
  return (
    <>
      <header>
        <div className={css.navWrapper}>
          <div className={css.logoContainer}>
            <Image width={70} height={70} src={logoFisioterapia} alt="" />
          </div>
          <nav>
            <input className={css.hidden} type="checkbox" id="menuToggle" />
            <label className={css.menuBtn}>
              <div className={css.menu}></div>
              <div className={css.menu}></div>
              <div className={css.menu}></div>
            </label>
            <div className={css.navContainer}>
              <ul className={css.navTabs}>
                <li className={css.navTab}>
                  <Link href={""}>Inicio</Link>
                </li>
                {/* <li className={css.navTab}>
                  <Link href={"/quem-somos"}>Quem somos</Link>
                </li>

                <li className={css.navTab}>
                  <Link href={"/contato"}>Contato</Link>
                </li> */}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
