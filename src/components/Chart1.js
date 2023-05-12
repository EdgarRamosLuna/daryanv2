import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";

const Chart1 = ({ totalG }) => {
  //console.log((totalG));
  const keys = Object.keys(totalG);
  const data = [
    { x: 1, y: totalG["total_inspected"], fill: "yellow" },
    { x: 2, y: totalG["total_ng_pieces"], fill: "red" },
    { x: 3, y: totalG["total_ok_pieces"], fill: "green" },
    { x: 4, y: totalG["total_re_work_parts"], fill: "orange" },
    { x: 5, y: totalG["total_scrap"], fill: "gray" },
    { x: 6, y: totalG["worked_h"], fill: "yellowgreen" },
  ];
  return (
    <VictoryChart
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      theme={VictoryTheme.material}
      domainPadding={20}
    >
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        //tickValues={[1, 2, 3, 4, 5, 6]}
        tickFormat={["IN", "NG", "OK", "RW", "SC", "WH"]}
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
