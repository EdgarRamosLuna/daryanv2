import React from "react";
import { useContext } from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { MainContext } from "../context/MainContext";
import { useTranslation } from "react-i18next";

const Chart1 = ({ totalG, data }) => {
  //console.log((totalG));

  const valoresY = data.map((objeto) => objeto.y);
  const maximoY = Math.max(...valoresY);
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={20}
      domain={{ x: [0, 6], y: [0, maximoY === 0 ? 10 : maximoY] }}
    >
      <VictoryAxis tickFormat={["IN", "NG", "OK", "RW", "SC", "WH"]} />
      <VictoryAxis dependentAxis />
      <VictoryBar
        data={data}
        x="x"
        y="y"
        labelComponent={<VictoryTooltip />}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
          labels: {
            fill: ({ datum }) => datum.fillC,
          },
        }}
        labels={({ datum }) => datum.y}
        //labelComponent={<VictoryLabel dy={30} />}
      />
    </VictoryChart>
  );
};

export default Chart1;
