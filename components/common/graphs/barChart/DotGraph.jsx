import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Changed to LineChart
import { COLORS, SIZES } from '../../../../constants/theme';

const DotGraph = ({ dataAssets }) => {
  const screenWidth = Dimensions.get('window').width;

  // Ensure dataAssets is valid and has the required structure
  const data = dataAssets && dataAssets.labels && dataAssets.datasets
    ? dataAssets
    : {
        labels: ['No Data'], // Fallback label
        datasets: [{ data: [0] }], // Fallback dataset
      };

  console.log("DotGraph data:", data); // Log the data for debugging

  const chartConfig = {
    backgroundColor: COLORS.lightWhite,
    backgroundGradientFrom: COLORS.DarkBlue,
    backgroundGradientTo: COLORS.secondary,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 50 },
    propsForDots: { r: '6', strokeWidth: '2', stroke: COLORS.primary }, // Adjusted for dot graph
  };

  // Create numeric labels for the chart (e.g., "1", "2", "3", ...)
  const numericLabels = data.labels.map((_, index) => `${index + 1}`);

  return (
    <ScrollView style={{ marginTop: SIZES.xLarge * 2 }}>
      <Text
        style={{
          fontSize: SIZES.medium,
          color: COLORS.DarkBlue,
          fontWeight: '600',
          marginBottom: SIZES.large * 2,
        }}
      >
        PROMEDIO DE DESEMPEÑO POR CICLO
      </Text>
      <View style={{ transform: [{ rotate: '0deg' }] }}>
        <LineChart
          style={{
            marginVertical: 8,
            borderRadius: 5,
            margin: 0,
          }}
          data={{ labels: numericLabels, datasets: data.datasets }}
          width={screenWidth - 30}
          height={screenWidth - 70}
          yAxisLabel="%"
          chartConfig={chartConfig}
          fromZero
          bezier // Makes the line smooth
          withDots // Ensures dots are displayed
        />
      </View>
      
    </ScrollView>
  );
};

export default DotGraph;
