import { LineChart, Line } from "recharts";

interface props {
  data: any;
}
const GraphCell = ({ data }: props) => {
  // console.log(data);
  if (data === "No Data") {
    return <div>No Data</div>;
  }

  const graphColor = () => {
    if (parseFloat(data?.at(0).tvl) > parseFloat(data?.at(-1).tvl)) {
      return "#FF0000";
    } else return "#4CBB17";
  };
  
  return (
    <LineChart
      width={90}
      height={60}
      margin={{
        top: 5,
        right: 1,
        left: 1,
      }}
      data={data}
    >
      <Line type="monotone" dataKey={"tvl"} stroke={graphColor()} dot={<></>} />
    </LineChart>
  );
};

export default GraphCell;
