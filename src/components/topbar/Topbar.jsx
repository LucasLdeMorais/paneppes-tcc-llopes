import React from "react";
import "./topbar.css";
import { Settings } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';

export default function Topbar(abreGaveta) {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topMiddle">
          <span className="logo">Painel FESEP</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <IconButton onClick={abreGaveta}>
              <MenuIcon />
            </IconButton>
          </div>
          <div className="topbarIconContainer">
            <Settings />
            {/* <span className="topIconBadge">2</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
