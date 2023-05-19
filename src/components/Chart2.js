import React from "react";
import { useContext } from "react";
import { Point, VictoryChart, VictoryScatter, VictoryTheme } from "victory";
import { MainContext } from "../context/MainContext";

const Chart2 = ({ totalG }) => {
  //console.log((totalG));
  const keys = Object.keys(totalG);
  const { tableFilters } = useContext(MainContext);
  const data = [
    {
      x: 1,
      y: tableFilters[0].total_in !== false ? totalG["total_inspected"] : "",
      fill: tableFilters[0].total_in !== false ? "yellow": "transparent",
    },
    {
      x: 2,
      y: tableFilters[0].total_ng !== false ? totalG["total_ng_pieces"] : "",
      fill: tableFilters[0].total_ng !== false ? "red": "transparent",
    },
    {
      x: 3,
      y: tableFilters[0].total_ok !== false ? totalG["total_ok_pieces"] : "",
      fill: tableFilters[0].total_ok !== false ? "green": "transparent",
    },
    {
      x: 4,
      y: tableFilters[0].total_rw !== false ? totalG["total_re_work_parts"] : "",
      fill: tableFilters[0].total_rw !== false ? "orange": "transparent",
    },
    {
      x: 5,
      y: tableFilters[0].total_sc !== false ? totalG["total_scrap"] : "",
      fill: tableFilters[0].total_sc !== false ? "gray": "transparent",
    },
    {
      x: 6,
      y: tableFilters[0].total_wh !== false ? totalG["worked_h"] : "",
      fill: tableFilters[0].total_wh !== false ? "yellowgreen": "transparent",
    },
  ];
  const valoresY = data.map((objeto) => objeto.y);
  const maximoY = Math.max(...valoresY);
  //const worked_h = Number(totalG["worked_h"]);
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{ x: [0, 6], y: [0, maximoY === 0 ? 10 : maximoY ] }}
    >
      <VictoryScatter
        size={7}
        data={data}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
        }}
      />
    </VictoryChart>
  );
};

export default Chart2;
