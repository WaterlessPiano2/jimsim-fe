import styles from "@/styles/Home.module.css";
import Image from "next/image";

// Warning: This component has to be used as a dynamic component with SSR disabled, so that the window object is defined
const Header = () => {
  const lightOrDarkLogo = () => {
    if (
      typeof window !== "undefined" &&
      window?.matchMedia("(prefers-color-scheme: dark)")?.matches
    ) {
      return "/JimSimWhite.png";
    } else {
      return "/JimSimBlack.png";
    }
  };

  return (
    <span className={styles.pageHeader}>
      <div className={styles.pageHeaderLogo}>
        <Image
          className={styles.platformLogoOne}
          alt={"JimSimlogo"}
          src={lightOrDarkLogo()}
          height={105}
          width={262}
        ></Image>
      </div>
      {/* 
      TODO: Uncomment ato show dark mode toggle
      <div className={styles.pageHeaderDarkModeToggle}>dark mode togggle</div> */}
    </span>
  );
};

export default Header;
