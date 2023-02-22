import styles from "@/styles/Home.module.css";

const ExpansionData = () => {
  return (
    <div className={styles.expansionData}>
      <DataRow
        color="blue"
        headingOne="TVL"
        headingTwo="TVL TOKEN A"
        headingThree="TVL TOKEN B"
        valueOne="$1.54B"
        valueTwo="USDC 0.77B"
        valueThree="USDT 0.77B"
      />{" "}
      <DataRow
        color="red"
        headingTwo="RETURNS"
        valueOne="0.52%"
        valueTwo="2.52%"
        valueThree="4.52%"
        subTextOne="7D"
        subTextTwo="30D"
        subTextThree="90D"
      />{" "}
      <DataRow
        color="gold"
        headingTwo="VOLATILITY"
        valueOne="3.52%"
        valueTwo="8.52%"
        valueThree="1.52%"
        subTextOne="7D"
        subTextTwo="30D"
        subTextThree="90D"
      />{" "}
      <DataRow
        color="orange"
        headingTwo="LOSES"
        valueOne="3.52%"
        valueTwo="3.4"
        valueThree="4.52%"
        subTextOne="7D"
        subTextTwo="30D"
        subTextThree="90D"
      />
    </div>
  );
};

interface rowProps {
  color: string;
  headingOne?: string;
  headingTwo: string;
  headingThree?: string;
  valueOne: string;
  valueTwo: string;
  valueThree: string;
  subTextOne?: string;
  subTextTwo?: string;
  subTextThree?: string;
}

const DataRow = ({
  color,
  headingOne,
  headingTwo,
  headingThree,
  valueOne,
  valueTwo,
  valueThree,
  subTextOne,
  subTextTwo,
  subTextThree,
}: rowProps) => (
  <div className={styles.expansionDataRow}>
    <Datacell
      heading={headingOne}
      value={valueOne}
      subText={subTextOne}
      color={color}
    />
    <Datacell
      heading={headingTwo}
      value={valueTwo}
      subText={subTextTwo}
      color={color}
    />
    <Datacell
      heading={headingThree}
      value={valueThree}
      subText={subTextThree}
      color={color}
    />
  </div>
);

interface cellProps {
  color: string;
  heading?: string;
  value: string;
  subText?: string;
}

const Datacell = ({ color, heading, value, subText }: cellProps) => (
  <div className={styles.expansionDataCell}>
    <div className={styles.expansionDataCelTitle}>{heading}</div>
    <div className={styles.expansionDataCellValue} style={{ color: color }}>
      {value}
    </div>
    <div className={styles.expansionDataCellDuration}>{subText}</div>
  </div>
);

export default ExpansionData;
