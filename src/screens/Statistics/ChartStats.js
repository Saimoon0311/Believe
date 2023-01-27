import React from 'react';
import {View, Text, StyleSheet, processColor} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import {Colors, FontFamily} from '@/theme/Variables';
import moment from 'moment';

const WHITE = processColor(Colors.blurWhite);
const GREEN = processColor(Colors.graphBlue);
const DARKGREEN = processColor(Colors.darkGreen);
let format1 = n => `${(n / 60) ^ 0}Hr ${n % 60}Min`;
const ChartStats = ({total_minutes, stats}) => {
  const values =
    stats == undefined
      ? []
      : stats?.map(obj => ({y: Math.floor(obj.duration / 60)}));
  const data = {
    dataSets: [
      {
        values,
        label: 'Zero line dataset',
        config: {
          colors: [GREEN],
          drawValues: false,
        },
      },
    ],
    config: {
      barWidth: 0.25,
    },
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Total Time</Text>
        <Text style={styles.title}>{format1(total_minutes)}</Text>
      </View>
      <BarChart
        data={data}
        style={styles.chart}
        drawValueAboveBar={true}
        chartDescription={{text: ''}}
        xAxis={{
          enabled: false,
          drawLabels: false,
        }}
        // xAxis={{
        //   enabled: true,
        //   drawLabels: true,
        //   axisLineWidth: 2,
        //   drawAxisLines: true,
        //   axisLineColor: DARKGREEN,
        //   centerAxisLabels: true,
        //   enabled: false,
        // }}
        yAxis={{
          left: {
            drawLabels: true,
            drawAxisLine: true,
            drawGridLines: false,
            axisMaximum: 85,
            axisMinimum: 15,
            axisLineWidth: 2,
            labelCountForce: true,
            axisLineColor: DARKGREEN,
            fontFamily: FontFamily.medium,
            position: 'OUTSIDE_CHART',
            textSize: 10,
            textColor: WHITE,
            zeroLine: {
              enabled: true,
              lineWidth: 1.5,
              lineColor: DARKGREEN,
            },
          },
          right: {
            enabled: false,
          },
        }}
        pinchZoom={false}
        scaleYEnabled={false}
        doubleTapToZoomEnabled={false}
        animation={{
          durationX: 1000,
          durationY: 1000,
          easingX: 'EaseOutBounce',
          easingY: 'EaseOutBounce',
        }}
        highlightPerTapEnabled={false}
        highlightFullBarEnabled={false}
        highlightPerDragEnabled={false}
        legend={{enabled: false}}
      />
      <View style={styles.line} />
      <View style={styles.xAxisLabel}>
        {stats?.map((obj, ind) => (
          <Text key={ind} style={styles.day}>
            {moment(obj?.date).format('dddd').substring(0, 3)}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default React.memo(ChartStats);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    paddingBottom: 90,
  },
  chart: {
    height: 200,
    // height: '35%',
    width: '95%',
  },
  button: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.fadedGray,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.black,
  },
  row: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  title: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  line: {
    borderTopWidth: 2,
    borderTopColor: Colors.darkGreen,
    width: '80%',
    marginTop: -8,
  },
  xAxisLabel: {
    width: '78%',
    paddingTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.blurWhite,
    textTransform: 'uppercase',
    fontFamily: FontFamily.medium,
  },
});
