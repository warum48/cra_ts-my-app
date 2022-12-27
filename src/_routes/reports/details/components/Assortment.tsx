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

type IAssortItem = {
  __typename:string;
  avail:number;
  constructorStepName:string;
  goodId:number;
  id:number;
  taskId:number;
  good:{__typename:string;
    code:string;
    description:string;
    id:number;
    name:string}
}
type IAssortProps = {
  assAr: IAssortItem[]
}
//{"__typename":"TeAssortment","avail":1.75,"constructorStepName":"Фото ДО начала работы","goodId":220,"id":33413539,"taskId":4285374,"good":{"__typename":"Good","code":"4630012981606","description":"","id":220,"name":"Рожок пломбир ваниль ФЛОУПАК 110гр"}},

/*const columns: IHeader[] = [
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
];*/

const columns: IHeader[] = [
  { field: "good.name", headerName: "Товар" },
   
  {
    field: "avail",
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

export function Assortment({assAr}:IAssortProps) {
  const theme = useTheme();
  function getStyleFor(row: IAssortItem, colfield: string) {
    if (colfield == "availability") {
      if (row[colfield as keyof IAssortItem] == "Есть в отчете") {
        return {
          color: theme.palette.success.main, //"green",
        };
      }
    }
  }

  return (
      <TableTemplate<IAssortItem>
        rows={assAr}
        columns={columns}
        getStyle={getStyleFor}
      />
  );
}


