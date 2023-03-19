import React, { useState } from "react";
import { useTable, useExpanded } from "react-table";
import styles from "@/styles/Home.module.css";
import PlatformCell from "./PlatformCell";
import GraphCell from "./GraphCell";
import RowExpansion from "./RowExpansion";
import Image from "next/image";
import { displayData, formatter } from "@/utils/utils";

interface Props {
  defiPoolMetrics: any;
  weekGraphData: any;
  dayGraphData: any;
  timeframe: string;
}

function Table({
  defiPoolMetrics,
  weekGraphData,
  dayGraphData,
  timeframe,
}: Props) {
  const mainTableData = React.useMemo(
    () =>
      [...defiPoolMetrics]?.map((row) => {
        let filteredGraphData;

        if (timeframe === "7day") {
          filteredGraphData = weekGraphData?.filter(
            (t: any) => t?.pool_account === row?.pool_account
          );
        } else {
          filteredGraphData = dayGraphData?.filter(
            (t: any) => t?.pool_account === row?.pool_account
          );
        }

        row["filteredGraphData"] = filteredGraphData;
        row["timeframe"] = timeframe;

        return {
          platform: {
            name: row?.pool_name,
            subName: row?.project_name,
            logoOne: `/${row?.token_a_symbol}.png`,
            logoTwo: `/${row?.token_b_symbol}.png`,
          },
          type: "AMM", //row?.product_type.replace(/([A-Z])/g, " $1").trim(),
          returns: displayData(
            row[`returns_${timeframe}`],
            `${parseFloat(row[`returns_${timeframe}`] || 0).toFixed(2)}%`,
            "",
            "%"
          ),
          ReturnsHistory: "No Data",
          TVL: displayData(row.tvl, `$${formatter.format(row?.tvl)}`, "$", ""),
          TVLHistory: filteredGraphData,
          risk: displayData(
            row?.sharpe_ratio,
            `${(parseFloat(row?.sharpe_ratio) || 0).toFixed(2)}`,
            "",
            ""
          ),
          volume: "No Data",
          History: "No Data",
          volTVL: "No Data",
          rewardToken: `R`,
          RTAPY: "No Data",
          expansionData: row,
        };
      }),
    [timeframe]
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
        Header: "History",
        accessor: "ReturnsHistory" as const,
      },
      {
        Header: "TVL",
        accessor: "TVL" as const,
      },
      {
        Header: "History",
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
        Header: "VOL/TVL",
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
    { initialState, columns, data: mainTableData, autoResetExpanded: false },
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
                          {cell.column.id === "rewardToken" && (
                            <div className={styles.rewardLogo}>
                              <div
                                className={styles.expansionDataTooltip}
                                style={{ marginTop: -40, marginLeft: -20 }}
                              >
                                Raydiyum
                              </div>
                              <Image
                                alt="RAY"
                                src="/RAY.png"
                                height={40}
                                width={40}
                              ></Image>{" "}
                            </div>
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
                  <RowExpansion
                    data={row.original.expansionData}
                    timeFrame={timeframe}
                  />
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
