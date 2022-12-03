/*export interface IDict {
  id: string;
  name: string;
  from: string;
  from_name: string;
  to: string;
  to_name: string;
  words: object[];
}*/

export enum TableModeTypes {
  Edit = "edit",
  Read = "read"
}

export enum RoutesTypes {
  Edit = "/edit",
  Play = "/play",
  Dictonaries = "/dictonaries",
  TestTone = "/testtone",
  Home = "/",
  Help = "/help"
}

export interface IDefaultDict {
  id: string;
  name: string;
  date_created: string;
  date_modified: string;
  from_lang: string;
  from_name: string;
  to_lang: string;
  to_name: string;
  //words: { id: number; from: string; to: string }[];
  words: { id: string; from: string; to: string }[];
}

export interface IAddDictProps {
  selectionModel: object[];
  direction: boolean;
}

export interface IDictExtended extends IDefaultDict {
  //TODO check if is it possible to get rid of duplication IAddDictProps
  selectionModel?: object[];
  direction?: boolean; //true - direct, false - inverted
}
