import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styles from "@/styles/Home.module.css";
import { formatter } from "@/utils/utils";

interface props {
  data: any;
  plot1: string;
  plot2: string;
}
const ExpansionGraph = ({ data, plot1, plot2 }: props) => {
  console.log("plot1: ", plot1);
  console.log(data.filteredGraphData);

  const formattedValues = [...data?.filteredGraphData].map((d: any) => {
    d["formattedDate"] =
      data.timeframe === "7day"
        ? new Date(d.txn_time).getDate()
        : new Date(d.txn_time).getUTCHours();

    return d;
  });

  return (
    <div className={styles.expansionGraph}>
      <LineChart
        width={600}
        height={470}
        margin={{
          top: 70,
          bottom: 10,
          right: 10,
        }}
        data={formattedValues}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="formattedDate"
          label={{
            value: `${data.timeframe === "7day" ? "days" : "hours"}`,
            position: "top",
          }}
          angle={45}
        />
        <YAxis dx={20} yAxisId={plot1} />
        {/* <YAxis
          yAxisId={plot2}
          orientation="right"
          dataKey={`formatted-${plot2}`}          />
*/}
        <Tooltip />
        <Legend />
        <Line
          yAxisId={plot1}
          type="monotone"
          dataKey={plot1}
          stroke={"#4CBB17"}
          strokeWidth={3}
          dot={<></>}
        />{" "}
        {/* <Line
          yAxisId={plot2}
          type="monotone"
          dataKey={plot2}
          stroke={"#FF0000"}
          strokeWidth={3}
          dot={<></>}
        /> */}
      </LineChart>
    </div>
  );
};

export default ExpansionGraph;
