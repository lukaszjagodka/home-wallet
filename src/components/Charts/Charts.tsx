/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
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
import { BudgetTypeEnum } from '../../helpers/enum/enum';

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
  const [lastSelectedtransaction, setLastSelectedtransaction] = useState<number>(1);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });
  const {
    daysInChart, updateChart, inflow, outflow,
  } = useSelector(({ account }: TAccountOnList) => ({
    daysInChart: account.labelDays,
    updateChart: account.updateChart,
    inflow: account.inflow,
    outflow: account.outflow,
  }));
  const { transactionsArray } = useSelector(({ transactions }: TTransactionsOnList) => ({
    transactionsArray: transactions.transactions,
  }));

  const inflowArray: number[] = [];
  const outflowArray: number[] = [];
  let balanceArray: number[] = [];
  let negativeArray: number[] = [];
  let chosenArray: any;

  let total: number = 0;
  let yoyal: number = 0;
  let mappedInflow: any;
  let mappedOutflow: any;
  let temporaryBalance: number = 0;

  const createArray = () => {
    const labelsArray:any = [];
    for (let i = 1; i <= daysInChart[0]; i++) {
      labelsArray[i] = i;
    }
    setDaysInMonthArray(labelsArray);
  };

  transactionsArray.forEach((element) => {
    if (element.selectedDay && daysInMonthArray) {
      element.transactionType === BudgetTypeEnum.Income ? chosenArray = inflowArray : chosenArray = outflowArray;
      if (daysInChart[1] === element.selectedDay.getMonth()) {
        const temporaryVariable = chosenArray[element.selectedDay.getDate()];
        if (temporaryVariable === undefined) {
          chosenArray[element.selectedDay.getDate()] = element.amount;
        } else {
          const drawer = temporaryVariable + element.amount;
          chosenArray[element.selectedDay.getDate()] = drawer;
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

    negativeArray = mappedOutflow.map((item: number) => {
      const sum = yoyal + item;
      yoyal = sum;
      return sum;
    });

    if (transactionsArray.length) {
      for (let i = 1; i <= lastSelectedtransaction; i++) {
        if (typeof mappedInflow[i] === 'undefined') {
          mappedInflow[i] = mappedInflow[i - 1];
        }
      }

      for (let i = 1; i <= lastSelectedtransaction; i++) {
        if (typeof negativeArray[i] === 'undefined') {
          negativeArray[i] = negativeArray[i - 1];
        }
      }
    }

    for (let i = 1; i <= daysInMonthArray?.length; i++) {
      if (inflowArray[i] || mappedOutflow[i]) {
        if (inflowArray[i] && mappedOutflow[i]) {
          const dailyBalance = inflowArray[i] + mappedOutflow[i];
          const actualBalance = temporaryBalance;
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
            data: negativeArray,
            borderColor: 'rgb(255, 44, 80)',
          },
          {
            label: 'Balance',
            data: balanceArray = balanceArray.slice(0, lastSelectedtransaction + 2),
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
  }, [daysInMonthArray, transactionsArray, updateChart]);

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

  useEffect(() => {
    if (transactionsArray[0]) {
      const x = transactionsArray[0].selectedDay;
      x && setLastSelectedtransaction(x.getDate());
    }
  });

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
