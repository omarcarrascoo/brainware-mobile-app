import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { COLORS, SIZES } from '../../../../constants/theme';

const BarChartExample = ( {dataAssets}) => {
  

  // const data = {
  //   labels: ['a lo mucho cuatro', 'February', 'March', 'April', 'May', 'June', 'july'],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43, 0],
  //     },
  //   ],
  // };
  let data = dataAssets? dataAssets : {
      labels: ['0'],
      datasets: [
        {
          data: [ 0],
        },
      ],
    }


    var screenWidth = 20 * data.length
  const chartConfig = {
    backgroundColor: COLORS.lightWhite,
    backgroundGradientFrom: COLORS.secondary,
    backgroundGradientTo: COLORS.DarkBlue,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,


    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <View>
      <Text style={{fontSize:SIZES.medium, color: COLORS.DarkBlue, fontWeight:700}}>Desempeño por desafio</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <BarChart
            style={{
            marginVertical: 8,
            borderRadius: 10,
            }}
            data={data}
            width={3000}
            height={300}
            yAxisLabel="%"
            chartConfig={chartConfig}
            verticalLabelRotation={50}
        />
      </ScrollView>
    </View>
  );
};

export default BarChartExample;
