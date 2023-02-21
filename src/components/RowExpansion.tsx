import styles from "@/styles/Home.module.css";
import ExpansionGraph from "./ExpansionGraph";

const RowExpansion = () => {
  return (
    <div className={styles.rowExpansion}>
      <ExpansionGraph data="uv" />
    </div>
  );
};

export default RowExpansion;
