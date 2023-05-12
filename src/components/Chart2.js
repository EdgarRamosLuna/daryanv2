import React from "react";
import { Point, VictoryChart, VictoryScatter, VictoryTheme } from "victory";

const Chart2 = ({ totalG }) => {
  //console.log((totalG));
  const keys = Object.keys(totalG);
  const data = [
    { x: "IN", y: totalG["total_inspected"], fill: "yellow" },
    { x: "NG", y: totalG["total_ng_pieces"], fill: "red" },
    { x: "OK", y: totalG["total_ok_pieces"], fill: "green" },
    { x: "RW", y: totalG["total_re_work_parts"], fill: "orange" },
    { x: "SC", y: totalG["total_scrap"], fill: "gray" },
    { x: "WH", y: totalG["worked_h"], fill: "yellowgreen" },
  ];
  const worked_h = Number(totalG["worked_h"]);
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{ x: [0, 6], y: [0, worked_h] }}
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
