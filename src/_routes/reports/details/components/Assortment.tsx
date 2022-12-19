import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { TableTemplate } from "_components/TableTemplate";

type IHeader = {
  field: string;
  headerName: string;
};
type Item = {
  product: string;
  availability: string;
  amount: string | number;
  faces: string | number;
};

const columns: IHeader[] = [
  { field: "product", headerName: "Товар" },
  {
    field: "availability",
    headerName: "Наличие",
  },
  {
    field: "amount",
    headerName: "Количество",
  },
  {
    field: "faces",
    headerName: "Фейсы",
  },
];

export const rows: Item[] = [
  {
    product: "Москов.лакомка во взбит.шокол/глазури 80гр*30",
    availability: "Есть в отчете",
    amount: 17,
    faces: 0.67,
  },
  {
    product:
      "Эскимо Веселый Кактус пломбир МАЛИНОВЫЙ с наполнителем в глазури с кусоч.малины 80гр",
    availability: "Есть в отчете",
    amount: "-",
    faces: 0.67,
  },
  {
    product: "Москов.лакомка во взбит.шокол/глазури 80гр*30",
    availability: "Есть в отчете",
    amount: 17,
    faces: 0.67,
  },
  {
    product: "Москов.лакомка во взбит.шокол/глазури 80гр*30",
    availability: "Есть в отчете",
    amount: "-",
    faces: 0.67,
  },
];

export function Assortment() {
  const theme = useTheme();
  function getStyleFor(row: Item, colfield: string) {
    if (colfield == "availability") {
      if (row[colfield as keyof Item] == "Есть в отчете") {
        return {
          color: theme.palette.success.main, //"green",
        };
      }
    }
  }

  return (
      <TableTemplate<Item>
        rows={rows}
        columns={columns}
        getStyle={getStyleFor}
      />
  );
}


