import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";



const Chart1 = ({totalG}) => {
    //console.log((totalG));
    const keys = Object.keys(totalG);
    const data = [
        { quarter: 1, earnings: totalG['total_inspected'] },
        { quarter: 2, earnings: totalG['total_ng_pieces'] },
        { quarter: 3, earnings: totalG['total_ok_pieces'] },
        { quarter: 4, earnings: totalG['total_re_work_parts'] },
        { quarter: 5, earnings: totalG['total_scrap'] },
        { quarter: 6, earnings: totalG['worked_h'] },
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
          tickFormat={['IN', 'NG', 'OK', 'RW', 'SC', 'WH']}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
      //    tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
  );
};

export default Chart1;
