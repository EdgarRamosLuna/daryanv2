import React from "react";
import { useContext } from "react";
import { Point, VictoryAxis, VictoryChart, VictoryScatter, VictoryTheme, VictoryTooltip } from "victory";
import { MainContext } from "../context/MainContext";

const Chart2 = ({ totalG, data }) => {
  //console.log((totalG));
  const keys = Object.keys(totalG);
  const { tableFilters } = useContext(MainContext);

  const valoresY = data.map((objeto) => objeto.y);
  const maximoY = Math.max(...valoresY);
  //const worked_h = Number(totalG["worked_h"]);
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{ y: [0, maximoY === 0 ? 10 : maximoY ] }}
      domainPadding={{ x: [20, 20] }}
    >
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        //tickValues={[1, 2, 3, 4, 5, 6]}
        tickFormat={[
          "IN",
          "NG",
          "OK",
          "RW",
          "SC",
          "WH",
        ]}
        //dependentAxis
        />
      <VictoryAxis
        dependentAxis
        
      />
      <VictoryScatter
        size={7}
        data={data}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
        }}
        labelComponent={<VictoryTooltip />}
        //labels={({ datum }) => datum.label +" "+datum.y}
      />
    </VictoryChart>
  );
};

export default Chart2;
