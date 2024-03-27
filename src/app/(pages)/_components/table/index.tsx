export type Column<T> = {
  key: keyof T & string;
  title: string | JSX.Element;
};

type Props<T> = {
  columns: Array<Column<T>>;
  data: Array<T>;
  renderCell: (row: T, key: keyof T) => string | JSX.Element;
};

const Table = <T extends Record<string, any>>({ columns, data, renderCell }: Props<T>) => {
  return (
    <table className="max-w-full w-fit border-spacing-0 border-collapse">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)} className="py-4 px-5 w-auto font-semibold border-none align-baseline">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((column) => (
              <td key={String(column.key)} className="p-2 w-auto max-w-52 font-normal break-words text-center border-gray-300 border-x border-y">
                {renderCell(row, column.key)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
