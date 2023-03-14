import React from "react";
import { useTable, useExpanded } from "react-table";
import styles from "@/styles/Home.module.css";
import PlatformCell from "./PlatformCell";
import GraphCell from "./GraphCell";
import RowExpansion from "./RowExpansion";
import Image from "next/image";

interface Props {
  defiPoolMetrics: any;
}

function Table({ defiPoolMetrics }: Props) {
  const timeScale = "7day";

  console.log(defiPoolMetrics);
  const mainTableData = React.useMemo(
    () =>
      [...defiPoolMetrics]?.map((row) => {
        return {
          platform: {
            name: row?.pool_name,
            subName: row?.project_name,
            logoOne: `/${row?.token_a_symbol}.png`,
            logoTwo: `/${row?.token_b_symbol}.png`,
          },
          type: row?.product_type.replace(/([A-Z])/g, " $1").trim(),
          returns: `${Number.parseFloat(
            row[`returns_${timeScale}`] || 0
          ).toFixed(2)}%`,
          ReturnsHistory: "uv",
          TVL: Math.round(row?.tvl),
          TVLHistory: "pv",
          risk: null,
          volume: null,
          History: "amt",
          volTVL: null,
          rewardToken: `R`,
          RTAPY: null,
          expansionData: {
            fee_apy_7day: row?.fee_apy_7day,
            returns_7day: row?.returns_7day,
            token_a_symbol: row?.token_a_symbol,
            token_b_symbol: row?.token_b_symbol,
            total_fee_7day: row?.total_fee_7day,
            tokena_amount: row?.tokena_amount,
            tokenb_amount: row?.tokenb_amount,
          },
        };
      }),
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
        Header: "Returns History",
        accessor: "ReturnsHistory" as const,
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
      {
        Header: "expansionData",
        accessor: "expansionData" as const,
      },
    ],
    []
  );
  const initialState = {
    hiddenColumns: ["expansionData"],
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable(
    { initialState, columns, data: mainTableData },
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
                          )}{" "}
                          {cell.column.id === "rewardToken" && (
                            <Image
                              className={styles.rewardLogo}
                              alt="RAY"
                              src="/RAY.png"
                              height={40}
                              width={40}
                            ></Image>
                          )}
                          {cell.column.id !== "platform" &&
                            !cell.column.id.includes("History") &&
                            cell.column.id !== "rewardToken" &&
                            cell.render("Cell")}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded && (
                  <RowExpansion data={row.original.expansionData} />
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
