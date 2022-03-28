/* eslint-disable operator-assignment */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import React, { useRef, useEffect, useState } from 'react';
import type { ChartData } from 'chart.js';
import Collapse from '@mui/material/Collapse';
import { useSelector } from 'react-redux';

import './Charts.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { TAccountOnList, TTransactionsOnList } from '../../types/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function Charts() {
  const chartRef = useRef<ChartJS>(null);
  const [checked, setChecked] = useState(false);
  const [daysInMonthArray, setDaysInMonthArray] = useState<Array<number>>();
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });
  const { daysInChart } = useSelector(({ account }: TAccountOnList) => ({
    daysInChart: account.labelDays,
  }));
  const { transactionsArray } = useSelector(({ transactions }: TTransactionsOnList) => ({
    transactionsArray: transactions.transactions,
  }));

  const inflowArray: number[] = [];
  const outflowArray: number[] = [];
  const balanceArray: number[] = [];
  let chosenArray: any;

  let total = 0;
  let mappedInflow: any;
  let mappedOutflow: any;
  let temporaryBalance: number = 0;

  const createArray = () => {
    const labelsArray:any = [];
    for (let i = 0; i <= daysInChart[0]; i++) {
      labelsArray[i] = i;
    }
    labelsArray.shift();
    setDaysInMonthArray(labelsArray);
  };

  transactionsArray.forEach((element) => {
    if (element.selectedDay && daysInMonthArray) {
      element.transactionType === 'Income' ? chosenArray = inflowArray : chosenArray = outflowArray;
      if (daysInChart[1] === element.selectedDay.getMonth()) {
        const temporaryVariable = chosenArray[element.selectedDay.getDate()];
        if (temporaryVariable === undefined) {
          chosenArray[element.selectedDay.getDate()] = element.amount;
        } else {
          const abc = temporaryVariable + element.amount;
          chosenArray[element.selectedDay.getDate()] = abc;
        }
      }
    }
  });

  if (daysInMonthArray) {
    mappedInflow = inflowArray.map((item: number) => {
      const sum = total + item;
      total = sum;
      return sum;
    });

    mappedOutflow = outflowArray.map((item: number) => -item);

    for (let i = 1; i <= daysInMonthArray?.length; i++) {
      if (inflowArray[i] || mappedOutflow[i]) {
        if (inflowArray[i] && mappedOutflow[i]) {
          let dailyBalance = inflowArray[i] + mappedOutflow[i];
          let actualBalance = temporaryBalance;
          balanceArray[i] = actualBalance + dailyBalance;
          temporaryBalance = balanceArray[i];
        } else if (inflowArray[i] === undefined && mappedOutflow[i]) {
          if (!temporaryBalance) {
            balanceArray[i] = mappedOutflow[i];
            temporaryBalance = balanceArray[i];
          } else {
            balanceArray[i] = temporaryBalance + mappedOutflow[i];
            temporaryBalance = balanceArray[i];
          }
        } else if (inflowArray[i] && mappedOutflow[i] === undefined && !temporaryBalance) {
          balanceArray[i] = inflowArray[i];
          temporaryBalance = balanceArray[i];
        } else if (inflowArray[i] && mappedOutflow[i] === undefined && temporaryBalance) {
          balanceArray[i] = temporaryBalance + inflowArray[i];
          temporaryBalance = balanceArray[i];
        } else if (inflowArray[i] && mappedOutflow[i] === undefined) {
          balanceArray[i] = temporaryBalance + inflowArray[i];
          temporaryBalance = balanceArray[i];
        }
      } else if (temporaryBalance) {
        balanceArray[i] = temporaryBalance;
      }
    }
  }

  const initializeChart = () => {
    if (daysInMonthArray) {
      const data = {
        labels: daysInMonthArray,
        datasets: [
          {
            label: 'Inflow',
            data: mappedInflow,
            borderColor: 'rgb(164, 210, 71)',
          },
          {
            label: 'Outflow',
            data: mappedOutflow,
            borderColor: 'rgb(255, 44, 80)',
          },
          {
            label: 'Balance',
            data: balanceArray,
            borderColor: 'rgba(51, 152, 255, 0.68)',
          },
        ],
      };

      const chart = chartRef.current;
      if (!chart) {
        return;
      }
      const chartData = {
        ...data,
      };
      setChartData(chartData);
    }
  };

  useEffect(() => {
    initializeChart();
  }, [daysInMonthArray, transactionsArray]);

  useEffect(() => {
    createArray();
    initializeChart();
  }, [daysInChart]);

  useEffect(() => {
    createArray();
    setChecked(true);
    if (daysInMonthArray) {
      setTimeout(() => {
        initializeChart();
      }, 300);
    }
  }, []);

  return (
    <div>
      <Collapse in={checked}>
        <div className="charts-container">
          <div className="charts-bar">
            <p className="charts-name">Chart</p>
          </div>
          <div className="chart-position">
            <Chart
              ref={chartRef}
              type="line"
              data={chartData}
              style={{ width: '800px' }}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default Charts;
