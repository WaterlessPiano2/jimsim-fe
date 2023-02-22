import styles from "@/styles/Home.module.css";

const ExpansionData = () => {
  return (
    <div className={styles.expansionData}>
      <DataRow
        headingOne="TVL"
        headingTwo="TVL TOKEN A"
        headingThree="TVL TOKEN B"
        valueOne="$1.54B"
        valueTwo="USDC 0.77B"
        valueThree="USDT 0.77B"
      />{" "}
      <DataRow
        headingTwo="RETURNS"
        valueOne="0.52%"
        valueTwo="2.52%"
        valueThree="4.52%"
        subTextOne="7D"
        subTextTwo="30D"
        subTextThree="90D"
      />{" "}
      <DataRow
        headingTwo="VOLATILITY"
        valueOne="3.52%"
        valueTwo="8.52%"
        valueThree="1.52%"
        subTextOne="7D"
        subTextTwo="30D"
        subTextThree="90D"
      />{" "}
      <DataRow
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
    <Datacell heading={headingOne} value={valueOne} subText={subTextOne} />
    <Datacell heading={headingTwo} value={valueTwo} subText={subTextTwo} />
    <Datacell
      heading={headingThree}
      value={valueThree}
      subText={subTextThree}
    />
  </div>
);

interface cellProps {
  heading?: string;
  value: string;
  subText?: string;
}

const Datacell = ({ heading, value, subText }: cellProps) => (
  <div className={styles.expansionDataCell}>
    <div>{heading}</div>
    <div>{value}</div>
    <div>{subText}</div>
  </div>
);

export default ExpansionData;
