
import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { COLORS, SIZES } from '../../../../constants/theme';

const VerticalBarChart = ({dataAssets}) => {
  const screenWidth = Dimensions.get('window').width;

  let data = dataAssets? dataAssets : {
    labels: ['0'],
    datasets: [
      {
        data: [ 0],
      },
    ],
  }

  const chartConfig = {
    backgroundColor: COLORS.lightWhite,
    backgroundGradientFrom: COLORS.DarkBlue,
    backgroundGradientTo: COLORS.secondary,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '0',
      stroke: '#c6bdb0',
    },
  };

  return (
    <ScrollView style={{marginTop:SIZES.xLarge*2}}>
      <Text style={{ fontSize: SIZES.medium,color:COLORS.DarkBlue, fontWeight:600, marginBottom:SIZES.large*2 }}>
      PROMEDIO DE DESEMPEÑO POR COMPORTAMIENTO
      </Text>
      <View style={{ transform: [{ rotate: '90deg' }] }}>
        <BarChart
          style={{
            borderRadius: 16,
            marginBottom: -18
          }}
          data={data}
          width={screenWidth -40}
          height={screenWidth - 40}
          yAxisLabel="%"
          chartConfig={chartConfig}
          verticalLabelRotation={-90}
          horizontalLabelRotation={-90}
          showValuesOnTopOfBars={true}
        />
      </View>
      <View style={{height:100}}>

      </View>
    </ScrollView>
  );
};

export default VerticalBarChart;
