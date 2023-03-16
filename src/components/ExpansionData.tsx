import styles from "@/styles/Home.module.css";
import { formatter, displayData } from "@/utils/utils";

interface Props {
  data: any;
}

const ExpansionData = ({ data }: Props) => {
  const timeScale = "7day";
  console.log(data);

  return (
    <div className={styles.expansionData}>
      <DataRow
        color="#1C76FD"
        toolTipLocation="100px"
        headingOne="TVL"
        headingTwo="AMOUNT T/A"
        headingThree="AMOUNT T/B"
        valueOne={displayData(
          data?.tvl,
          `$${formatter.format(data?.tvl)}`,
          "$",
          ""
        )}
        valueTwo={displayData(
          data?.tokena_amount,
          `${data?.token_a_symbol || "$"} ${formatter.format(
            data?.tokena_amount
          )}`,
          data?.token_a_symbol || "$",
          ""
        )}
        valueThree={displayData(
          data?.tokenb_amount,
          `${data?.token_b_symbol || "$"} ${formatter.format(
            data?.tokenb_amount
          )}`,
          data?.token_b_symbol || "$",
          ""
        )}
        tooltipOne="Total value locked (TVL) is the overall value of deposited crypto assets"
        tooltipTwo="Amount of token A"
        tooltipThree="Amount of token B"
        headingFour="STAKED TVL"
        valueFour="No Data"
        tooltipFour="Staked total value locked"
      />
      <DataRow
        toolTipLocation="-10px"
        color="#E33283"
        headingOne="RETURNS"
        headingTwo="MARKET"
        headingThree="TOTAL FEES"
        valueOne={displayData(
          data[`returns_${timeScale}`],
          `${parseFloat(data[`returns_${timeScale}`] || 0).toFixed(2)}%`,
          "",
          "%"
        )}
        valueTwo={displayData(
          data?.market_7d,
          `${(parseFloat(data?.market_7d) || 0).toFixed(2)}%`,
          "",
          "%"
        )} // asked for an update on 7d - 7 day
        valueThree={displayData(
          data[`total_fee_${timeScale}`],
          `$${formatter.format(data[`total_fee_${timeScale}`])}`,
          "$",
          ""
        )}
        tooltipOne="A return is the change in price of an asset over time"
        tooltipTwo="Market"
        tooltipThree="Total Fees"
        headingFour="FEE APY"
        valueFour={displayData(
          data?.[`fee_apy_${timeScale}`],
          (parseFloat(data?.[`fee_apy_${timeScale}`]) || 0).toFixed(2),
          "",
          "%"
        )}
        tooltipFour="Fee APY"
      />
      <DataRow
        toolTipLocation="-10px"
        color="#E3A732"
        headingOne="VOLATILITIY"
        headingTwo="SHARPE RATIO"
        headingThree="SORTINO RATIO"
        valueOne={displayData(
          data?.lp_volatility,
          `${(parseFloat(data?.lp_volatility) || 0).toFixed(2)}`,
          "",
          ""
        )}
        valueTwo={displayData(
          data?.sharpe_ratio,
          `${(parseFloat(data?.sharpe_ratio) || 0).toFixed(2)}`,
          "",
          ""
        )}
        valueThree="No Data"
        tooltipOne="Volatility is a measure of how much the price of an asset has moved up or down over time"
        tooltipTwo="The Sharpe ratio is a measure of risk-adjusted return"
        tooltipThree="The Sortino ratio measures the risk-adjusted return of an investment asset, portfolio, or strategy. It is a modification of the Sharpe ratio but penalizes only those returns falling below a user-specified target or required rate of return"
        headingFour="TREYNOR RATIO"
        valueFour="No Data"
        tooltipFour="Treynor ratio is a risk-adjusted measurement of return based on systematic risk"
      />
      <DataRow
        toolTipLocation="-10px"
        color="#E35C32"
        headingOne="AVG SLIPPAGE"
        headingTwo="RT TOTAL"
        headingThree="MAX DD"
        valueOne="No Data"
        valueTwo="No Data"
        valueThree={displayData(
          data?.dd_pcnt,
          `${(parseFloat(data?.dd_pcnt) || 0).toFixed(2)}%`,
          "",
          "%"
        )}
        tooltipOne="Slippage refers to the difference between the expected price of a trade and the price at which the trade is executed"
        tooltipTwo="Reward token total"
        tooltipThree="A maximum drawdown is the maximum observed loss from a peak to a trough, before a new peak is attained"
        headingFour="RT APY"
        valueFour="No Data"
        tooltipFour="Reward token APY"
      />
    </div>
  );
};

interface rowProps {
  toolTipLocation: string;
  color: string;
  headingOne: string;
  headingTwo: string;
  headingThree: string;
  valueOne: string;
  valueTwo: string;
  valueThree: string;
  tooltipOne: string;
  tooltipTwo: string;
  tooltipThree: string;
  headingFour: string;
  valueFour: string;
  tooltipFour: string;
}

const DataRow = ({
  toolTipLocation,
  color,
  headingOne,
  headingTwo,
  headingThree,
  valueOne,
  valueTwo,
  valueThree,
  tooltipOne,
  tooltipTwo,
  tooltipThree,
  headingFour,
  valueFour,
  tooltipFour,
}: rowProps) => (
  <div className={styles.expansionDataRow}>
    <Datacell
      toolTipLocation={toolTipLocation}
      heading={headingOne}
      value={valueOne}
      tooltip={tooltipOne}
      color={color}
    />
    <Datacell
      toolTipLocation={toolTipLocation}
      heading={headingTwo}
      value={valueTwo}
      tooltip={tooltipTwo}
      color={color}
    />
    <Datacell
      toolTipLocation={toolTipLocation}
      heading={headingThree}
      value={valueThree}
      tooltip={tooltipThree}
      color={color}
    />
    <Datacell
      toolTipLocation={toolTipLocation}
      heading={headingFour}
      value={valueFour}
      tooltip={tooltipFour}
      color={color}
    />
  </div>
);

interface cellProps {
  color: string;
  heading: string;
  value: string;
  tooltip: string;
  toolTipLocation: string;
}

const Datacell = ({
  color,
  heading,
  value,
  tooltip,
  toolTipLocation,
}: cellProps) => (
  <>
    <div className={styles.expansionDataCellContainer}>
      <div className={styles.expansionDataTooltip} style={{ marginTop: 70 }}>
        {tooltip}
      </div>
      <div className={styles.expansionDataCellTitle}>{heading}</div>
      <div className={styles.expansionDataCellValue} style={{ color: color }}>
        {value}
      </div>
    </div>
  </>
);

export default ExpansionData;
