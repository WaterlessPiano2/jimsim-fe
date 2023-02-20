import React from "react";
import { useTable } from "react-table";
import styles from "@/styles/Home.module.css";
import PlatformCell from "./PlatformCell";
import GraphCell from "./GraphCell";

function Table() {
  const data = React.useMemo(
    () => [
      {
        platform: {
          name: "SOL",
          subName: "Staking",
          logoOne: "solana.svg",
        },
        APY: "%3.19",
        APYHistory: "uv",
        TVL: "$0.38b",
        TVLHistory: "pv",
        risk: 100,
        age: "30 days",
        TR: "SOL",
        type: "Strategy Vaults",
      },
      {
        platform: {
          name: "SOL",
          subName: "Orca",
          logoOne: "solana.svg",
          logoTwo: "orca.svg",
        },
        APY: "%3.19",
        APYHistory: "pv",
        TVL: "$0.38b",
        TVLHistory: "uv",
        risk: 100,
        age: "30 days",
        TR: "SOL",
        type: "Strategy Vaults",
      },
      {
        platform: {
          name: "USDC/USDT",
          subName: "Raydium",
          logoOne: "usdc.svg",
          logoTwo: "usdt.svg",
        },
        APY: "%3.19",
        APYHistory: "amt",
        TVL: "$0.38b",
        TVLHistory: "amt",
        risk: 100,
        age: "30 days",
        TR: "SOL",
        type: "Strategy Vaults",
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
        Header: "APY",
        accessor: "APY" as const,
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
        Header: "Age",
        accessor: "age" as const,
      },
      {
        Header: "TR",
        accessor: "TR" as const,
      },
      {
        Header: "Type",
        accessor: "type" as const,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
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
            <tr className={styles.bodyRow} key={key} {...restRowProps}>
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
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
