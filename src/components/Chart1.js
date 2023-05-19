import React from "react";
import { useContext } from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";
import { MainContext } from "../context/MainContext";

const Chart1 = ({ totalG }) => {
  //console.log((totalG));
  const keys = Object.keys(totalG);
  const { tableFilters } = useContext(MainContext);
  const data = [
    { x: 1, y: tableFilters[0].total_in !== false ? totalG["total_inspected"] : 0, fill: "yellow" },
    { x: 2, y: tableFilters[0].total_ng !== false ? totalG["total_ng_pieces"] : 0, fill: "red" },
    { x: 3, y: tableFilters[0].total_ok !== false ? totalG["total_ok_pieces"] : 0, fill: "green" },
    { x: 4, y: tableFilters[0].total_rw !== false ? totalG["total_re_work_parts"] : 0, fill: "orange" },
    { x: 5, y: tableFilters[0].total_sc !== false ? totalG["total_scrap"] : 0, fill: "gray" },
    { x: 6, y: tableFilters[0].total_wh !== false ? totalG["worked_h"] : 0, fill: "yellowgreen" },
  ];
  const valoresY = data.map((objeto) => objeto.y);
  const maximoY = Math.max(...valoresY);
  return (
    <VictoryChart
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      theme={VictoryTheme.material}
      domainPadding={20}
      domain={{ x: [0, 6], y: [0, maximoY === 0 ? 10 : maximoY ] }}
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
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        //    tickFormat={(x) => (`$${x / 1000}k`)}
      />
      <VictoryBar
        data={data}
        x="x"
        y="y"
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
        }}
      />
    </VictoryChart>
  );
};

export default Chart1;
