import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getBillList} from '../../actions/index'
import { MONTH_OPTIONS } from '../../constants/dropdown-options.constant'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

import Loader from '../../common/loader/loader.component'
import TimeSeriesChart from '../../common/time-series-chart/time-series-chart.component'

import './dashboard.component.scss'


function Dashboard (props) {
  const [ showLoader, setLoader ] = useState(true)
  const [ selectedMonth, setMonth ] = useState('01')
  const [ visualData, setVisualData ] = useState({})

  const { billList } = props
  const { getBillList } = props

  const handleMonthChange = (event) => {
    setMonth(event.target.value)
  }

  const constructVizdata = () => {
    const currentYear = 2020
    let yearObj = {
      '01': {billAmounts: [], days: [], numberOfDays: 0},
      '02': {billAmounts: [], days: [], numberOfDays: 0},
      '03': {billAmounts: [], days: [], numberOfDays: 0},
      '04': {billAmounts: [], days: [], numberOfDays: 0},
      '05': {billAmounts: [], days: [], numberOfDays: 0},
      '06': {billAmounts: [], days: [], numberOfDays: 0},
      '07': {billAmounts: [], days: [], numberOfDays: 0},
      '08': {billAmounts: [], days: [], numberOfDays: 0},
      '09': {billAmounts: [], days: [], numberOfDays: 0},
      '10': {billAmounts: [], days: [], numberOfDays: 0},
      '11': {billAmounts: [], days: [], numberOfDays: 0},
      '12': {billAmounts: [], days: [], numberOfDays: 0}
    }
    Object.keys(yearObj).forEach((month) => {
      const numberOfDays = new Date(currentYear, month, 0).getDate()
      yearObj[month].numberOfDays = numberOfDays
      for(let dayIndx=0; dayIndx<numberOfDays; dayIndx++){
        yearObj[month].billAmounts.push(0)
        yearObj[month].days.push(dayIndx)
      }
    })

    billList.forEach((bill, index) => {
      const dataArr = bill.date.split('-')
      const day = dataArr[1].replace(/^0+/, '')
      const month = dataArr[0]
      yearObj[month].billAmounts[day] = bill.amount
    })

    setVisualData(yearObj[selectedMonth])
  }

  useEffect(()=> {
    getBillList()

    setTimeout(()=>{
      setLoader(false)
    }, 500)
  },[])

  useEffect(()=> {
    constructVizdata()
  }, [billList, selectedMonth])


  const renderVisualization = () => {
    return(
      <div className='visualization-container'>
        <div className='filter-wrapper'>
          <FormControl variant="outlined" className='filter-option'>
            <InputLabel id="month-label">Billing Month</InputLabel>
            <Select
              labelId="month-dropdown"
              value={selectedMonth}
              onChange={handleMonthChange}
              label="Billing Month"
            >
              {MONTH_OPTIONS && MONTH_OPTIONS.map((month) => (
                <MenuItem key={month.id} value={month.value}>{month.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='viz-wrapper'>
          <TimeSeriesChart data={visualData} />
        </div>
      </div>
    )
  }

 
  return (
    <div className='dashboard-container'>
      {showLoader ? <Loader /> : renderVisualization()}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    billList: state.app.billList
  }
}

export default (connect(mapStateToProps, { getBillList })(Dashboard))