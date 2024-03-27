import { Supplier } from '../page';

export default function RenderCell(row: Supplier, key: keyof Supplier) {
  return (
    <span>
      {row[key]}
    </span>
  );
};
