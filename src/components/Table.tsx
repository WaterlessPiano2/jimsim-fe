import React from "react";
import { useTable, useExpanded } from "react-table";
import styles from "@/styles/Home.module.css";
import PlatformCell from "./PlatformCell";
import GraphCell from "./GraphCell";
import RowExpansion from "./RowExpansion";

interface Props {
  defiPoolMetrics: any;
}

function Table({ defiPoolMetrics }: Props) {
  console.log(defiPoolMetrics);
  const data = React.useMemo(
    () => [
      {
        platform: {
          name: "SOL",
          subName: "Staking",
          logoOne: "solana.svg",
        },
        type: "AMM",
        returns: "%3.19",
        APYHistory: "uv",
        TVL: "$0.38B",
        TVLHistory: "pv",
        risk: 100,
        volume: "$1.5B",
        History: "amt",
        volTVL: "1.5",
        rewardToken: "R",
        RTAPY: "3.14%",
      },
      {
        platform: {
          name: "SOL",
          subName: "Orca",
          logoOne: "solana.svg",
          logoTwo: "orca.svg",
        },
        type: "AMM",
        returns: "%3.19",
        APYHistory: "uv",
        TVL: "$0.38B",
        TVLHistory: "pv",
        risk: 100,
        volume: "$1.5B",
        History: "amt",
        volTVL: "1.5",
        rewardToken: "R",
        RTAPY: "3.14%",
      },
      {
        platform: {
          name: "USDC/USDT",
          subName: "Raydium",
          logoOne: "usdc.svg",
          logoTwo: "usdt.svg",
        },
        type: "AMM",
        returns: "%3.19",
        APYHistory: "uv",
        TVL: "$0.38B",
        TVLHistory: "pv",
        risk: 100,
        volume: "$1.5B",
        History: "amt",
        volTVL: "1.5",
        rewardToken: "R",
        RTAPY: "3.14%",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Market/Platform",
        accessor: "platform" as const, // accessor is the "key" in the data
      },
      {
        Header: "Type",
        accessor: "type" as const,
      },
      {
        Header: "Returns",
        accessor: "returns" as const,
      },
      {
        Header: "APY History",
        accessor: "APYHistory" as const,
      },
      {
        Header: "TVL",
        accessor: "TVL" as const,
      },
      {
        Header: "TVL History",
        accessor: "TVLHistory" as const,
      },
      {
        Header: "Risk",
        accessor: "risk" as const,
      },
      {
        Header: "Volume",
        accessor: "volume" as const,
      },
      {
        Header: "History",
        accessor: "History" as const,
      },
      {
        Header: "Vol/TVL",
        accessor: "volTVL" as const,
      },
      {
        Header: "Reward Token",
        accessor: "rewardToken" as const,
      },
      {
        Header: "RT APY",
        accessor: "RTAPY" as const,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable(
    { columns, data },
    useExpanded // Use the useExpanded plugin hook
  );

  return (
    <div className={styles.main}>
      <table {...getTableProps()} className={styles.table}>
        <thead className={styles.header}>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr
                className={styles.headerRow}
                key={key}
                {...restHeaderGroupProps}
              >
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps();
                  return (
                    <th key={key} {...restColumn} className={styles[key]}>
                      <p>{column.render("Header")}</p>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody className={styles.body} {...getTableBodyProps}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <>
                <tr
                  onClick={() => row.toggleRowExpanded()}
                  className={styles.bodyRow}
                  key={key}
                  {...restRowProps}
                >
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td key={key} className={styles.cell} {...restCellProps}>
                        <div>
                          {cell.column.id === "platform" && (
                            <PlatformCell
                              name={cell.value.name}
                              subName={cell.value.subName}
                              logoOne={cell.value.logoOne}
                              logoTwo={cell.value.logoTwo}
                            />
                          )}
                          {cell.column.id.includes("History") && (
                            <GraphCell data={cell.value} />
                          )}
                          {cell.column.id !== "platform" &&
                            !cell.column.id.includes("History") &&
                            cell.render("Cell")}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded && <RowExpansion />}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
