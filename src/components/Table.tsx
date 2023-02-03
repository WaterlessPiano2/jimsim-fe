import React from 'react'
import { useTable } from 'react-table'
import styles from '@/styles/Home.module.css'

 function Table() {
   const data = React.useMemo(
     () => [
       {
         col1: 'Hello',
         col2: 'World',
       },
       {
         col1: 'react-table',
         col2: 'rocks',
       },
       {
         col1: 'whatever',
         col2: 'you want',
       },
     ],
     []
   )
   
   const columns = React.useMemo(
     () => [
       {
         Header: 'Column 1',
         accessor: 'col1' as const, // accessor is the "key" in the data
        },
       {
         Header: 'Column 2',
         accessor: 'col2' as const,
       },
     ],
     []
   )
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data })
 
  
   return (
     <table {...getTableProps()} className={styles.table}>
      <thead className={styles.header}>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <tr  className={styles.headerRow} key={key} {...restHeaderGroupProps}>
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
      <tbody  className={styles.body} {...getTableBodyProps}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <tr className={styles.card}
            key={key} {...restRowProps}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <td key={key} {...restCellProps}>
                  <p>
                      {cell.render("Cell")}
                    </p>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
     </table>
   )
 }

 export default Table;