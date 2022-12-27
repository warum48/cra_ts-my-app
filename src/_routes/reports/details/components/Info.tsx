import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Heading, ItemInfo, ItemName } from "_styles/MuiStyledComponents";
import { formatDate } from "_components/UTILS";
import {inputInternalCommentVar} from "_apollo/state"

interface IInfoProps {
  infoData: {
  comments: string;
    commentsInternal: string;
    commentsStatus: string;
    dateEnd: string;
    dateStart: string;
    id: string;
    distance: string;
    latitude: string;
    longitude: string;
    money: string;
    moneySource: string;
    source: string;
    status: string;
    storeId: string;
    taskId: string;
    userId: string;
    store: {
      address: string;
      id: number;
      latitude: string;
      longitude: string;
    }
    user: {
      name: string;
      surname: string;
    }
  },
  inputRef:any
}

export function Info( {infoData, inputRef}:IInfoProps) {
  //id, taskId, store, user, dateEnd, dateStart, comments, commentsInternal, commentsStatus
  const theme = useTheme();
  return (
    <Paper
      sx={{
        width: "100%",
        py: 0
      }}
    >
      <>
      {infoData &&
      <Grid container spacing={0}>
        {/** -------- */}
        <Grid item xs={3}>
          <ItemName>ID</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>{infoData.id}</ItemInfo>
        </Grid>
        {/** -------- */}
        <Grid item xs={12}>
          <Heading>Общее</Heading>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Задача:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>{infoData.taskId}</ItemInfo>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Магазин:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>{infoData.store.address}</ItemInfo>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Сотрудник:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>{infoData.user.name + " " + infoData.user.surname}</ItemInfo>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Источник:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>{infoData.source}</ItemInfo>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Статус:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>{infoData.status}</ItemInfo>
        </Grid>
        {/** -------- */}
        <Grid item xs={12}>
          <Heading>Даты</Heading>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Дата начала:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>{formatDate(infoData.dateStart)}</ItemInfo>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Дата завершения:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>{formatDate(infoData.dateEnd)}</ItemInfo>
        </Grid>
        {/*-------- */}
        <Grid item xs={12}>
          <Heading>Комментарии</Heading>
        </Grid>
        {/*-------- */}
        <Grid item xs={3}>
          <ItemName>Комментарий оператора:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>
            {infoData.comments}
          </ItemInfo>
        </Grid>
        {/*-------- */}
        <Grid item xs={3}>
          <ItemName>Комментарий:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>-</ItemInfo>
        </Grid>
        {/*-------- */}
        <Grid item xs={3}>
          <ItemName>Внутренний комментарий:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>
            <TextField
            ref={inputRef}
              id="outlined-multiline-static"
              label="Ваш комментарий"
              multiline
              //rows={3}
              fullWidth
              maxRows={10}
              variant="outlined"
              defaultValue={infoData.commentsInternal}
              onChange={e => inputInternalCommentVar(e.target.value)}
              //onChange={e => {inputRef.current.value = e.target.value;}}
              //inputRef={e => inputRef = e}
            />
          </ItemInfo>
        </Grid>
      </Grid>
      }
      </>
    </Paper>
  );
}
