import React from "react";
import { useTable } from "react-table";
import styles from "@/styles/Home.module.css";
import PlatformCell from "./PlatformCell";

function Table() {
  const data = React.useMemo(
    () => [
      {
        col1: {
          name: "SOL",
          subName: "Staking",
          logoOne: "solana.svg",
        },
        col2: "World",
      },
      {
        col1: {
          name: "SOL",
          subName: "Orca",
          logoOne: "solana.svg",
          logoTwo: "orca.svg",
        },
        col2: "rocks",
      },
      {
        col1: {
          name: "USDC/USDT",
          subName: "Raydium",
          logoOne: "usdc.svg",
          logoTwo: "usdt.svg",
        },
        col2: "you want",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Market/Platform",
        accessor: "col1" as const, // accessor is the "key" in the data
      },
      // {
      //   Header: "Column 2",
      //   accessor: "col2" as const,
      // },
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
                  <th key={key} {...restColumn}>
                    <p className={styles.headerCell}>
                      {column.render("Header")}
                    </p>
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
            <tr className={styles.card} key={key} {...restRowProps}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <td key={key} {...restCellProps}>
                    <div>
                      {cell.column.id === "col1" && (
                        <PlatformCell
                          name={cell.value.name}
                          subName={cell.value.subName}
                          logoOne={cell.value.logoOne}
                          logoTwo={cell.value.logoTwo}
                        />
                      )}
                      {/* {cell.column.id !== "col1" && cell.render("Cell")} */}
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
