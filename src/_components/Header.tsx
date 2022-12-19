import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { LightMode } from "_components/LightMode";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;

  return (
    <React.Fragment>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs />

          <Grid item>
            <IconButton color="inherit" sx={{ p: 0.5 }}>
              <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
            </IconButton>
          </Grid>
          <Grid item>
            <LightMode />
          </Grid>
        </Grid>
      </Toolbar>
    </React.Fragment>
  );
}
