import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { TableTemplate } from "_components/TableTemplate";
import { formatDate } from "_components/UTILS";


type IHeader = {
  field: string;
  headerName: string;
  func?: ({}:any | string ) => string; //TODO: move to sep file
};
type Item = {
  date_beginning: string;
  date_end: string;
  step_name: string;
  step_type: string;
  step_skipped: string | boolean;
};
type IStep = {
  __typename: string;
  dateEnd: string;
  id: number;
  dateStart: string;
  isSkip: boolean;
  name: string;
  stepType: string;
  stepTypeDescription: string;
  taskId: number;
};
type IStepsProps = {
  stepsAr: IStep[];
};

const columns: IHeader[] = [
  { field: "dateEnd", headerName: "Время начала", func: st => formatDate(st) },
  {
    field: "dateStart",
    headerName: "Дата окончания",
    func: st => formatDate(st)
  },
  {
    field: "name",
    headerName: "Название шага",
  },
  {
    field: "stepTypeDescription",
    headerName: "Тип шага",
  },
  {
    field: "isSkip",
    headerName: "Шаг пропущен",
    func: st => st === true? 'Да' : '-'
  },
];


export function Steps({ stepsAr }: IStepsProps) {
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
    <>
      <TableTemplate<IStep>
        rows={stepsAr}
        columns={columns}
        //getStyle={getStyleFor}
      />
    </>
  );
}

