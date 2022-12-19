import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Heading, ItemInfo, ItemName } from "_styles/MuiStyledComponents";

export function Info() {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        width: "100%",
        py: 0
      }}
    >
      <Grid container spacing={0}>
        {/** -------- */}
        <Grid item xs={3}>
          <ItemName>ID</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>4504021</ItemInfo>
        </Grid>
        {/** -------- */}
        <Grid item xs={12}>
          <Heading>Общее</Heading>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Задача:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>Выкладка Сибирская Коллекция 3</ItemInfo>
        </Grid>
        {/** -------- */}
        <Grid item xs={12}>
          <Heading>Даты</Heading>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Дата начала:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>Dec. 8, 2022, 10:29 p.m.</ItemInfo>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Дата завершения:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>Dec. 8, 2022, 10:29 p.m.</ItemInfo>
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
            Поправил выкладку. Сделал кор блок. Пельмени сочные разморозились
            поэтому их убрали на списание ДМ Иван Андреевич (тел.89015275258)
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
              id="outlined-multiline-static"
              label="Ваш комментарий"
              multiline
              //rows={3}
              fullWidth
              maxRows={10}
              variant="outlined"
            />
          </ItemInfo>
        </Grid>
      </Grid>
    </Paper>
  );
}
