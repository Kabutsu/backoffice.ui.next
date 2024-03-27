import { Sample } from '../page';

export default function RenderCell(row: Sample, key: keyof Sample) {
  let value: string | number;

  switch (true) {
    case row[key] instanceof Date:
      value = row[key].toLocaleString();
      break;
    default:
      value = row[key] as string | number;
  }

  return (
    <span>
      {value}
    </span>
  );
};