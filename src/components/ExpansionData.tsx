import styles from "@/styles/Home.module.css";
import {
  formatter,
  displayData,
  hasData,
  isLessThanDisplayable,
} from "@/utils/utils";

interface Props {
  data: any;
  selectedOne: string;
  setSelectedOne: (value: string) => void;
  setSelectedTwo: (value: string) => void;
  selectedTwo: string;
  timeFrame: string;
}

const ExpansionData = ({
  data,
  setSelectedOne,
  selectedOne,
  timeFrame,
}: Props) => {
  const timeScale = timeFrame;
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
        valueFour={displayData(
          data?.tvl,
          `$${formatter.format(data?.[`staked_tvl_${timeScale}`])}`,
          "$",
          ""
        )}
        tooltipFour="Staked total value locked"
        keyOne="tvl"
        keyTwo="tokena_amount"
        keyThree="tokenb_amount"
        keyFour="staked_tvl"
        selectedOne={selectedOne}
        setSelectedOne={setSelectedOne}
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
          data?.market_7day,
          `${(parseFloat(data[`market_${timeScale}`]) || 0).toFixed(2)}%`,
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
        keyOne={`returns_${timeScale}`}
        keyTwo={`market_${timeScale}`}
        keyThree={`total_fee_${timeScale}`}
        keyFour={`fee_apy_${timeScale}`}
        selectedOne={selectedOne}
        setSelectedOne={setSelectedOne}
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
        keyOne="lp_volatility"
        keyTwo="sharpe_ratio"
        keyThree=""
        keyFour=""
        selectedOne={selectedOne}
        setSelectedOne={setSelectedOne}
      />
      <DataRow
        toolTipLocation="-10px"
        color="#E35C32"
        headingOne="AVG SLIPPAGE"
        headingTwo="RT TOTAL"
        headingThree="MAX DD"
        valueOne={
          hasData(data?.token_b_avg_slippage_pcnt) &&
          hasData(data?.token_b_avg_slippage_pcnt)
            ? isLessThanDisplayable(
                (parseFloat(data.token_a_avg_slippage_pcnt) +
                  parseFloat(data.token_b_avg_slippage_pcnt)) /
                  2
              )
              ? ">0.01%"
              : `${(
                  (parseFloat(data.token_a_avg_slippage_pcnt) +
                    parseFloat(data.token_b_avg_slippage_pcnt)) /
                  2
                ).toFixed(2)}%`
            : "No Data"
        }
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
        keyOne="average_slippage_pcnt"
        keyTwo=""
        keyThree="dd_pcnt"
        keyFour=""
        selectedOne={selectedOne}
        setSelectedOne={setSelectedOne}
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
  keyOne: string;
  keyTwo: string;
  keyThree: string;
  keyFour: string;
  selectedOne: string;
  setSelectedOne: (value: string) => void;
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
  keyOne,
  keyTwo,
  keyThree,
  keyFour,
  selectedOne,
  setSelectedOne,
}: rowProps) => (
  <div className={styles.expansionDataRow}>
    <Datacell
      toolTipLocation={toolTipLocation}
      heading={headingOne}
      value={valueOne}
      tooltip={tooltipOne}
      color={color}
      dataKey={keyOne}
      selectedOne={selectedOne}
      setSelectedOne={setSelectedOne}
    />
    <Datacell
      toolTipLocation={toolTipLocation}
      heading={headingTwo}
      value={valueTwo}
      tooltip={tooltipTwo}
      color={color}
      dataKey={keyTwo}
      selectedOne={selectedOne}
      setSelectedOne={setSelectedOne}
    />
    <Datacell
      toolTipLocation={toolTipLocation}
      heading={headingThree}
      value={valueThree}
      tooltip={tooltipThree}
      color={color}
      dataKey={keyThree}
      selectedOne={selectedOne}
      setSelectedOne={setSelectedOne}
    />
    <Datacell
      toolTipLocation={toolTipLocation}
      heading={headingFour}
      value={valueFour}
      tooltip={tooltipFour}
      color={color}
      dataKey={keyFour}
      selectedOne={selectedOne}
      setSelectedOne={setSelectedOne}
    />
  </div>
);

interface cellProps {
  color: string;
  heading: string;
  value: string;
  tooltip: string;
  toolTipLocation: string;
  dataKey: string;
  selectedOne: string;
  setSelectedOne: (value: string) => void;
}

const Datacell = ({
  color,
  heading,
  value,
  tooltip,
  toolTipLocation,
  dataKey,
  selectedOne,
  setSelectedOne,
}: cellProps) => {
  const clicked = () => {
    if (!isDisabled() && dataKey) {
     // console.log(dataKey);
      setSelectedOne(dataKey);
    }
  };

  const isDisabled = () => {
    if (!value || value === "No Data" || !dataKey) return true;
    return false;
  };

  const cellConditionalStyles = () => {
    let style: any = { opacity: 1 };
    if (selectedOne === "returns_7day") {
      //  console.log(selectedOne );
      // console.log(dataKey);
    }
    if (selectedOne === dataKey) {
      // console.log(dataKey);
      // console.log("circle me");
      style["borderWidth"] = "3px";
      style["borderColor"] = "green";
    }
    if (isDisabled()) {
      style["cursor"] = "not-allowed";
    } else {
      style["cursor"] = "pointer";
    }
    return style;
  };

  return (
    //pass selectedOne here and if it matches the key, make it selected
    <div
      style={cellConditionalStyles()}
      className={styles.expansionDataCellContainer}
      onClick={() => clicked()}
    >
      <div className={styles.expansionDataTooltip} style={{ marginTop: 70 }}>
        {tooltip}
      </div>
      <div className={styles.expansionDataCellTitle}>{heading}</div>
      <div className={styles.expansionDataCellValue} style={{ color: color }}>
        {value}
      </div>
    </div>
  );
};

export default ExpansionData;
