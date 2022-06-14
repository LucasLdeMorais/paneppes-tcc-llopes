import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/pieChart/GraficoTorta";
import { Container, Grid, Paper, Typography } from "@mui/material";
import GraficoTorta from './../../components/pieChart/GraficoTorta';

export default function Home() {
  return (
    <Container>
      <Grid>
        <Paper>
          <GraficoTorta />
        </Paper>
        <Paper>
          <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
        </Paper>
      </Grid>
    </Container>
  );
}
