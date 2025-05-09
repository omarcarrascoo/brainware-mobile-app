import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { COLORS, SIZES } from '../../../../constants/theme';

const VerticalBarChart = ({ dataAssets }) => {
  const screenWidth = Dimensions.get('window').width;

  // Default data if none is provided
  const data = dataAssets || {
    labels: ['Ejemplo 1', 'Etiqueta Larga Ejemplo', 'Ejemplo 3'],
    datasets: [{ data: [20, 45, 28] }],
  };

  const chartConfig = {
    backgroundColor: COLORS.lightWhite,
    backgroundGradientFrom: COLORS.DarkBlue,
    backgroundGradientTo: COLORS.secondary,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 50 },
    propsForDots: { r: '6', strokeWidth: '0', stroke: '#c6bdb0' },
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
        PROMEDIO DE DESEMPEÑO POR COMPORTAMIENTO
      </Text>
      <View style={{ transform: [{ rotate: '0deg' }] }}>
        <BarChart
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
          // verticalLabelRotation={0}
          // horizontalLabelRotation={-90}
          showValuesOnTopOfBars
        />
      </View>
      
      {/* Index of questions */}
      <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
      <Text style={{fontWeight: 500, marginBottom: 10}} >Indice del circulo virtuoso:</Text>
        {data.labels.map((label, index) => (
          <Text key={index} style={{ color: COLORS.DarkBlue, fontSize: 14, marginVertical: 5 }}>
            {`${index + 1}. ${label}`}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default VerticalBarChart;
