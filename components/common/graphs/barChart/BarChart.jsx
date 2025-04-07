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


  //var screenWidth = 50 * data.length

  
  
  
  const chartConfig = {
    backgroundColor: COLORS.lightWhite,
    backgroundGradientFrom: COLORS.secondary,
    backgroundGradientTo: COLORS.DarkBlue,
    decimalPlaces: 2,
    color: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,

    // propsForDots: {
    //   r: '6',
    //   strokeWidth: '2',
    //   stroke: '#ffa726',
    // },

    propsForHorizontalLabels: {
      // Apply a vertical offset (dy) to the last label
      dy: 4, // Adjust 20 as needed
      dx: 8
    },
  };

  const CustomLabel = ({ value, index, total }) => {
    const isLastLabel = index === total - 1;
    return (
      <View style={{ marginTop:200}}> {/* Add margin to the last label */}
        <Text>{value}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={{fontSize:SIZES.medium, color: COLORS.DarkBlue, fontWeight:700}}>Desempeño por desafio</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <BarChart
            style={{
              marginVertical: 8,
              borderRadius: 5,
              marginTop: 20, 
            }}
            data={data}
            width={1400}
            height={300}
            yAxisLabel="%"
            chartConfig={chartConfig}
            verticalLabelRotation={50}
            prop
            fromZero
            withCustomBarValue
            renderBarValue={({ value, index, total }) => (
              <CustomLabel value={value} index={index} total={total} />
            )}
            
        />
      </ScrollView>
    </View>
  );
};

export default BarChartExample;
