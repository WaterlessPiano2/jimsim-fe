import Image from "next/image";
import styles from "@/styles/Home.module.css";

interface props {
  name: string;
  subName: string;
  logoOne: string;
  logoTwo?: string;
}

const PlatformCell = ({ name, subName, logoOne, logoTwo }: props) => {
  return (
    <span className={styles.platformCell}>
      <div className={styles.platformLogoParent}>
        <Image
          className={styles.platformLogoOne}
          alt={logoOne}
          src={logoOne}
          height={30}
          width={30}
        ></Image>{" "}
        {logoTwo && (
          <Image
            className={styles.platformLogoTwo}
            alt={logoTwo}
            src={logoTwo}
            height={30}
            width={30}
          ></Image>
        )}
      </div>
      <div>
        <p className={styles.platformName}>{name}</p>
        <p className={styles.platformSubName}>{subName}</p>
      </div>
    </span>
  );
};

export default PlatformCell;
