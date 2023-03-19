import styles from "@/styles/Home.module.css";

interface Props {
  isRight?: boolean;
  onClick: () => void;
}

const Toggle = ({ isRight, onClick }: Props) => {
  return (
    <div className={styles.toggle} onClick={() => onClick()}>
      Timeframe{" "}
      <div
        className={isRight ? styles.selected_toggle : ""}
        style={{ paddingLeft: "20px" }}
      >
        24H
      </div>
      / <div className={!isRight ? styles.selected_toggle : ""}>7D</div>
    </div>
  );
};

export default Toggle;
