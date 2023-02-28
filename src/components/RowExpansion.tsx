import styles from "@/styles/Home.module.css";
import ExpansionData from "./ExpansionData";
import ExpansionGraph from "./ExpansionGraph";

const RowExpansion = () => {
  return (
    <>
      <td colSpan={9}>
        <div className={styles.rowExpansionParagraphGroup}>
          <ExpansionData />
          <ExpansionGraph data="uv" />
        </div>
        <div className={styles.rowExpansionParagraphGroup}>
          <div className={styles.rowExpansionParagraph}>
            <h1>Vault Strategy / Pool Description</h1>
            <p>
              Generates yield by running an automT-USDC-P-ETH earns yield on its
              USDC deposits by running a weekly automated ETH put-selling
              strategy, where the put options are collateralized by USDC. The
              vault reinvests the yield it earns back into the strategy,
              effectively compounding the yields for depositors over time.ated
              USDC put selling strategy.{" "}
            </p>
          </div>
          <div className={styles.rowExpansionParagraph}>
            <h1>Risk</h1>
            <p>
              The primary risk for running this put selling strategy is that the
              vault may incur a weekly loss in the case where the put options
              sold by the vault expire in-the-money (meaning the price of ETH is
              below the strike price of the put options minted by the vault).
              Such a situation is expected to happen less than 5% of the
              time.The Theta Vault smart contracts have been audited by
              OpenZeppelin and ChainSafe. Despite that, users are advised to
              exercise caution and only risk funds they can afford to lose.
            </p>
          </div>
        </div>
      </td>
    </>
  );
};

export default RowExpansion;
