import "./sidebar.css";
import {
  PermIdentity,
  AttachMoney,
  AccountBalance,
  Report
} from "@material-ui/icons";

import AnalyticsIcon from '@mui/icons-material/Analytics';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Painéis</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem">
              <AnalyticsIcon fontSize="medium" className="sidebarIcon" />
              Principal
            </li>
            </Link>
            <Link to="/Universidades" className="link">
            <li className="sidebarListItem active">
              <AccountBalance className="sidebarIcon" />
              Universidades
            </li>
            </Link>
            <Link to="/" className="link">
            <li className="sidebarListItem">
              <PersonIcon className="sidebarIcon" />
              Parlamentares
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Para saber mais</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <CurrencyExchangeIcon className="sidebarIcon" />
                Emendas Parlamentares
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Financiamento do Ensino Superior
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <InfoIcon className="sidebarIcon" />
                Acesso à Informação
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Sobre o Painel</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <CodeIcon className="sidebarIcon" />
                Código-fonte
              </li>
            </Link>
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <Report className="sidebarIcon" />
                Informações Adicionais
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
