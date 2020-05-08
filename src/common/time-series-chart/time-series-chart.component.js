import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';

import './time-series-chart.component.scss'


export default function TimeSeriesChart (props) {
  const { data } = props
  const [ billList, setBillList ] = useState({
    labels: [],
    datasets: []
  })

  const populateVizData = () => {
    // For some reason it is throwing circular dependency, so mutating the state for now
    // I will fix this later tonight
    
    // let billListCopy = deepCopy(billList)
    let billListCopy = billList
    billListCopy.labels = data.days
    billListCopy.datasets[0] = {
      label: 'Monthly Expense',
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: data.billAmounts
    }
    setBillList(billListCopy)
  }

  useEffect(()=> {
    setBillList({
      labels: [],
      datasets: []
    })
    setTimeout(() => {
      populateVizData()
    }, 0)
  }, [data])

  return (
    <Line
      data={billList}
      options={{
        title:{
          display:true,
          text:'Expense per month',
          fontSize:20
        },
        legend:{
          display:true,
          position:'right'
        }
      }}
    />
  )
}
