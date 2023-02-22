import styles from "@/styles/Home.module.css";
import ExpansionData from "./ExpansionData";
import ExpansionGraph from "./ExpansionGraph";

const RowExpansion = () => {
  return (
    <td className={styles.rowExpansion} colSpan={9}>
      <ExpansionData />
      <ExpansionGraph data="uv" />
    </td>
  );
};

export default RowExpansion;
