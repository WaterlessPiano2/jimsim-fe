import styles from "@/styles/Home.module.css";

interface Props {
  data: any;
}

const ExpansionData = ({ data }: Props) => {
  console.log(data);
  return (
    <div className={styles.expansionData}>
      <DataRow
        color="#1C76FD"
        toolTipLocation="100px"
        headingOne="TVL"
        headingTwo="AMOUNT T/A"
        headingThree="AMOUNT T/B"
        valueOne="$1.54B"
        valueTwo={`${data?.token_a_symbol || "$"} ${Math.round(
          data?.tokena_amount
        )} `}
        valueThree={`${data?.token_b_symbol || "$"} ${Math.round(
          data?.tokenb_amount
        )} `}
        tooltipOne="Total value locked (TVL) is the overall value of deposited crypto assets"
        tooltipTwo="Amount of token A"
        tooltipThree="Amount of token B"
        headingFour="STAKED TVL"
        valueFour="$420,69"
        tooltipFour="Staked total value locked"
      />
      <DataRow
        toolTipLocation="-10px"
        color="#E33283"
        headingOne="RETURNS"
        headingTwo="MARKET"
        headingThree="TOTAL FEES"
        valueOne="0.52%"
        valueTwo="2.52%"
        valueThree="$334.604"
        tooltipOne="A return is the change in price of an asset over time"
        tooltipTwo="Market"
        tooltipThree="Total Fees"
        headingFour="FEE APY"
        valueFour={data?.fee_apy_7day || "0"}
        tooltipFour="Fee APY"
      />
      <DataRow
        toolTipLocation="-10px"
        color="#E3A732"
        headingOne="VOLATILITIY"
        headingTwo="SHARPE RATIO"
        headingThree="SORTINO RATIO"
        valueOne="3.52%"
        valueTwo="8.52"
        valueThree="1.52"
        tooltipOne="Volatility is a measure of how much the price of an asset has moved up or down over time"
        tooltipTwo="The Sharpe ratio is a measure of risk-adjusted return"
        tooltipThree="The Sortino ratio measures the risk-adjusted return of an investment asset, portfolio, or strategy. It is a modification of the Sharpe ratio but penalizes only those returns falling below a user-specified target or required rate of return"
        headingFour="TREYNOR RATIO"
        valueFour="1.77"
        tooltipFour="Treynor ratio is a risk-adjusted measurement of return based on systematic risk"
      />
      <DataRow
        toolTipLocation="-10px"
        color="#E35C32"
        headingOne="AVG SLIPPAGE"
        headingTwo="RT TOTAL"
        headingThree="MAX DD"
        valueOne="1.52%"
        valueTwo="561,450"
        valueThree="41.52%"
        tooltipOne="Slippage refers to the difference between the expected price of a trade and the price at which the trade is executed"
        tooltipTwo="Reward token total"
        tooltipThree="A maximum drawdown is the maximum observed loss from a peak to a trough, before a new peak is attained"
        headingFour="RT APY"
        valueFour="3.57%"
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
      <div className={styles.expansionDataTooltip}>{tooltip}</div>
      <div className={styles.expansionDataCellTitle}>{heading}</div>
      <div className={styles.expansionDataCellValue} style={{ color: color }}>
        {value}
      </div>
    </div>
  </>
);

export default ExpansionData;
