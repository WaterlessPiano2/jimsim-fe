import styles from "@/styles/Home.module.css";
import { useState } from "react";
import ExpansionData from "./ExpansionData";
import ExpansionGraph from "./ExpansionGraph";

interface Props {
  data: any;
  timeFrame: string;
}

const RowExpansion = ({ data, timeFrame }: Props) => {
  const [plot1, setPlot1] = useState("tokena_amount");
  const [plot2, setPlot2] = useState("tokenb_amount");

  return (
    <>
      <td colSpan={12}>
        <div className={styles.rowExpansionParagraphGroup}>
          <ExpansionData
            data={data}
            selectedOne={plot1}
            selectedTwo={plot2}
            setSelectedOne={(n) => setPlot1(n)}
            setSelectedTwo={() => setPlot2}
            timeFrame={timeFrame}
          />
          <ExpansionGraph data={data} plot1={plot1} plot2={plot2} />
        </div>
        <div className={styles.rowExpansionParagraphGroup}>
          <div className={styles.rowExpansionParagraph}>
            <h1>Description</h1>
            <p>
              An AMM offers a single price for the exchange of two digital
              assets instead of a full order book on centralized exchanges. The
              prices that are offered are popular and readjusted by the protocol
              depending on the amount of capital on each side of a liquidity
              pool. The AMM doesn’t have capital itself and instead gathers
              funds from third-party participants through liquidity pools.
              Participants are incentivized to deploy capital to the AMMs
              liquidity pool, because the protocol shares a certain amount of
              the trading fees with its liquidity providers.
            </p>
          </div>
          <div className={styles.rowExpansionParagraph}>
            <h1>Risk</h1>
            <p>
              The risk for liquidity providers, providing liquidity to AMMs is
              called Impermanent Loss. It refers to a situation in which the
              profit you gain from staking a token in a liquidity pool is less
              than what you would have earned by just holding the asset. It
              happens when a token’s price changes in the market, which causes
              your deposited assets in the liquidity pool to become worth less
              than their present value in the market. The bigger the price
              change, the more your assets are exposed to impermanent loss.
              Impermanent loss is similar to inventory risk with institutional
              market makers.
            </p>
          </div>
        </div>
      </td>
    </>
  );
};

export default RowExpansion;
