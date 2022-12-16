export enum RoutesTypes { 
  Home = "/",
  Reports = "/reports",
  Execution = "/execution",
  Pictures = "/pictures",
  //---debug---
  Debug_GQL = "/debug_gql",
  Debug_LazyGQL = "/debug_lazygql",
  Debug_LazySelect = "/debug_lazyselect",
  Debug_LeafletPure = "/debug_leafletpure",
  //Help = "/help",
  //Edit = "/edit",
}

/*export enum TableModeTypes {
  Edit = "edit",
  Read = "read"
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
*/
