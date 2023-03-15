import { LineChart, Line, XAxis, YAxis } from "recharts";
import styles from "@/styles/Home.module.css";

const displayData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 240,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 211,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 200,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 210,
  },
];

interface props {
  data: string;
}

const ExpansionGraph = ({ data }: props) => {
  return (
    <div className={styles.expansionGraph}>
      <LineChart
        width={600}
        height={470}
        margin={{
          top: 50,
          bottom: 50,
          right: 50,
        }}
        data={displayData}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Line
          type="monotone"
          dataKey={data}
          stroke={data === "uv" ? "	#4CBB17" : "#FF0000"}
          strokeWidth={3}
          dot={<></>}
        />{" "}
        <Line
          type="monotone"
          dataKey="amt"
          stroke={"#FF0000"}
          strokeWidth={3}
          dot={<></>}
        />
      </LineChart>
    </div>
  );
};

export default ExpansionGraph;
