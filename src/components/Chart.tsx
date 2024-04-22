import React from "react";
import { Text, View } from "react-native";
import { CartesianChart, Line } from "victory-native";

const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  }));

const Chart = () => {
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <View style={{ height: 300 }}>
      <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]} >
      {({ points }) => (
        <Line points={points.highTmp} color="red" strokeWidth={3} />
      )}
      </CartesianChart>
    </View>
  );
};
 
export default Chart;