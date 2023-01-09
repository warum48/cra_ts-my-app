import * as React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { panel_bg, StyledButton } from "_styles/MuiStyledComponents";
import { useTheme } from "@mui/material/styles";
import "_styles/mui.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Empty from "_components/Empty";
import { Assortment } from "_routes/reports/details/components/Assortment";
import { Steps } from "_routes/reports/details/components/Steps";
import { Info } from "_routes/reports/details/components/Info";
import { Geolocation } from "_routes/reports/details/components/Geolocation";
import Button from "@mui/material/Button";
import {
  gql,
  useQuery,
  useLazyQuery,
  useReactiveVar,
  useMutation,
} from "@apollo/client";
import { currentTEIDVar, inputInternalCommentVar, filtersVar } from "_apollo/state";
import {GET_TE_DETAILS} from "_apollo/queries";
import {SAVE_INPUT} from "_apollo/mutations";
import { DebugBox } from "_components/debug/DebugBox";


//------------------------------TAB PANEL---------------
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//----------------------end TAB PANEL-----------------------

export default function ReportDetails() {
  //----------mui------------------
  const theme = useTheme();
  //----------tabs-----------------
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const inputRef = React.useRef<any>(null);

  let { routerTEId } = useParams();
  //-----------apollo---------
  const currentTEIDVar_re = useReactiveVar(currentTEIDVar);
  const currentInput_re = useReactiveVar(inputInternalCommentVar);
  //const currentTEIDVar_re = useReactiveVar(routerTEId);

  
  /*const GET_TE_DETAILS = gql`
    query TeDetailsQuery($id: Int!) {
      getTeSteps(teId: $id) {
        teStepsList {
          dateEnd
          id
          dateStart
          isSkip
          name
          stepType
          taskId
        }
      }
      getTeAssortment(teId: $id) {
        teAssortmentList {
          avail
          constructorStepName
          goodId
          id
          taskId
          good {
            code
            description
            id
            name
          }
        }
      }
      getTasksExecutionsById(teId: $id) {
        comments
        commentsInternal
        commentsStatus
        dateEnd
        dateStart
        id
        distance
        latitude
        longitude
        money
        moneySource
        source
        status
        storeId
        taskId
        userId
        store {
          address
          id
          latitude
          longitude
        }
        user {
          name
          surname
        }
      }
    }
  `;
  */

  //----------mutations--------
  //("${inputRef.current.value}");
  /*const SAVE_INPUT = gql`
    mutation SaveInput($comment: String!, $id: Int!) {
      teInternalCommentUpdate(commentsInternal: $comment, teId: $id) {
        ... on MutationSuccess {
          __typename
          detail
        }
        ... on MutationError {
          __typename
          detail
          statusCode
        }
      }
    }
  `;
  */

  //const { loading, error, data } = useQuery(GET_TE_DETAILS,{
  const [getDetails, { loading, error, data }] = useLazyQuery(GET_TE_DETAILS, {
    //variables: {page: page, filters: filtersVar_re}
    variables: { id: currentTEIDVar_re },
  });

  const [
    mutateFunction,
    { data: data_si, loading: loading_si, error: error_si },
  ] = useMutation(SAVE_INPUT, {
    //variables: { comment: inputRef.current?.value, id: currentTEIDVar_re },
    variables: { comment: currentInput_re, id: currentTEIDVar_re },
    refetchQueries: [
      {
        query: GET_TE_DETAILS,
        variables: { id: currentTEIDVar_re },
      }, // DocumentNode object parsed with gql
      "TeDetailsQuery", // Query name
    ],
  });
  //currentInput_re

  //interface IParseInt:
  React.useEffect(() => {
    console.log("routerTEId", routerTEId);
    if (routerTEId) {
      currentTEIDVar(parseInt(routerTEId));
      getDetails();
    }
  }, [routerTEId]);

  

  function saveAndContinue() {}
  function saveAndGoBack() {
   // if (inputRef.current.value) {
    if( inputInternalCommentVar()) {
      mutateFunction();
    } else {
      console.log("nothing to save");
    }
  }

  /*const details = {
    geolocation: [
      [13.363, 103.859],
      [13.364047, 103.860313],
    ],
  };*/

  const reportDetailsTabs = {
    info: {
      name: "Информация",
      component: (
        <Info infoData={data?.getTasksExecutionsById} inputRef={inputRef} />
      ), //
    },
    steps: {
      name: "Шаги и задачи",
      component: <Steps stepsAr={data?.getTeSteps.teStepsList} />,
    },
    pictures: {
      name: "Изображения",
      component: <Empty />,
    },
    ankets: {
      name: "Анкеты",
      component: <Empty />,
    },
    assortment: {
      name: "Ассортимент магазина",
      component: <Assortment assAr={data?.getTeAssortment.teAssortmentList} />,
    },
    absence_reasons: {
      name: "Причины отсутствия товаров",
      component: <Empty />,
    },
    geolocation: {
      name: "Геолокация",
      component: <Geolocation 
      //points={details.geolocation} 
      />,
    },
  };

  function getColor(){
    return theme.palette.common.color ? theme.palette.common.color : theme.palette.primary.main
  }

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          //variant={smallScreen ? 'scrollable' : 'standard'}
          variant="scrollable"
        >
          {Object.entries(reportDetailsTabs).map(([key, item], index) => (
            <Tab
              key={"tab" + key}
              label={item.name}
              {...a11yProps(index)}
              sx={{ fontSize: "12px",
               //!!color: value === index ? getColor() + '!important' : '' 
               //!!also need to color underline
              }}
             
            />
          ))}
        </Tabs>
      </Box>

      {Object.entries(reportDetailsTabs).map(([key, item], index) => (
        <TabPanel value={value} index={index} key={"panel" + key}>
          <DebugBox>
          {JSON.stringify(data)}
          {JSON.stringify(error)}
          </DebugBox>
          {item.component}
        </TabPanel>
      ))}

      <Box sx={{ pt: 2 }}>
        <StyledButton
          type="submit"
          variant="contained"
          //sx={{
            //color: "#ffffff",
            //boxShadow: 0,
            //background: theme.palette.common.buttonGradient,
          //</Box></Box>}}
          onClick={() => saveAndGoBack()} //console.log(inputRef.current.value)}
        >
          Сохранить
        </StyledButton>
        <Button
          type="submit"
          variant="outlined"
          sx={{ mx: 2, ...panel_bg[theme.palette.mode] }}
        >
          Сохранить и продолжить редактирование
        </Button>
      </Box>
      {/*data && JSON.stringify(data)*/}
    </Box>
  );
}
