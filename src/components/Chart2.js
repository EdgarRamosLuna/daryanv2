import React from "react";
import { Point, VictoryChart, VictoryScatter, VictoryTheme } from "victory";

const data = [
  {
    x: 1,
    y: 10,
  },
  {
    x: 2,
    y: 20,
  },
  {
    x: 3,
    y: 30,
  },
  {
    x: 4,
    y: 40,
  },
  {
    x: 5,
    y: 50,
  },
];

const Chart2 = () => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{ x: [0, 5], y: [0, 7] }}
    >
      <VictoryScatter
        style={{ data: { fill: "#c43a31" } }}
        size={7}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
        ]}
      />
    </VictoryChart>
  );
};

export default Chart2;
