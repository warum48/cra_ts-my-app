import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { panel_bg, StyledButton } from "_styles/MuiStyledComponents";
import { useReactiveVar } from "@apollo/client";
import {
  searchInputVar,
  ascSortByVar,
  descSortByVar,
  descSortByInitValue,
  curSortFieldVar,
  curSortFieldInitValue,
} from "_apollo/state";
import { DebugBox } from "_components/debug/DebugBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link } from "@mui/material";

const Search = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  width: "100%",
  maxWidth: "500px",
  ...panel_bg[theme.palette.mode],
}));

type IHeaderSort = {
  field: string;
  headerName: string;
  sortFieldName?: string;
};

export function TabHeaderSorter({ field, headerName, sortFieldName }: IHeaderSort) {
  //const
  const theme = useTheme();
  const curSortFieldVar_re = useReactiveVar(curSortFieldVar);

  const ascSortBy_re = useReactiveVar(ascSortByVar);
  const descSortBy_re = useReactiveVar(descSortByVar);

  const field_apiname = (sortFieldName? sortFieldName : field);
  //const inputRef = React.useRef<any>(null);
  /* const setSort = function(){
    if(curSortFieldVar().field !== field){
     if(curSortFieldVar().sortType === "desc"){
      curSortFieldVar({field:field, sortType:"asc"})
     }else{
      curSortFieldVar({field:field, sortType:"desc"})
     }
    }else{
      curSortFieldVar({field:field, sortType:"desc"})
    }
  }*/
  React.useEffect(() => {}, [curSortFieldVar_re]);

  const setSort = function () {
    console.log("curSortFieldVar().field", curSortFieldVar().field);
    if (
      curSortFieldVar().field !== field_apiname ||
      curSortFieldVar().sortType === "asc"
    ) {
      curSortFieldVar({ field: field_apiname, sortType: "desc" });
      descSortByVar(field_apiname);
      ascSortByVar("");
      console.log("--field", field_apiname);
    } else {
      curSortFieldVar({ field: field_apiname, sortType: "asc" });
      ascSortByVar(field_apiname);
      descSortByVar("");
    }
  };

  const resetSort = function () {
    curSortFieldVar(curSortFieldInitValue);
  };

  return (
    <>
      <Box
        
        sx={{
          display: "flex",
          //justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box onClick={setSort} sx={{cursor:'pointer'}}><Link sx={{color:theme.palette.text.primary}}>{headerName}</Link></Box>

        {curSortFieldVar_re.field == field_apiname && (
          <>
            
              {curSortFieldVar().sortType === "desc" ? (
                <ArrowDropDownIcon onClick={setSort} sx={{cursor:'pointer'}}/>
              ) : (
                <ArrowDropUpIcon onClick={setSort} sx={{cursor:'pointer'}}/>
              )}
            

            {field_apiname != "id" && field_apiname != "teId" && (
              <HighlightOffIcon
                sx={{ mt: "2px", fontSize: "medium", cursor:'pointer' }}
                onClick={resetSort}
              />
            )}
          </>
        )}
      </Box>
      <DebugBox>
        {ascSortBy_re}/{descSortBy_re}
      </DebugBox>
    </>
  );
}
