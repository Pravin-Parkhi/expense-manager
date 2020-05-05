import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getBillList} from '../../actions/index'
import { Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

import Loader from '../../common/loader/loader.component'

import './bill-list.component.scss'

function BillList (props) {
  const [ showLoader, setLoader ] = useState(true)
  const [ selectedCategory, setCategory ] = useState('')

  const { getBillList } = props

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }
  

  useState(()=> {
    getBillList()

    setTimeout(()=>{
      setLoader(false)
    }, 500)
  },[])


  const renderBillList = () => {
    return(
      <div className='main-content'>
        <div className='header-wrapper'>
          <Typography variant='h4' className='main-heading'>Bills</Typography>
          <div className='filters-wrapper'>
            <FormControl variant="outlined" className='filter-option'>
              <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
              <Select
                labelId="category-dropdown"
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained">Add Bill</Button>
          </div>
        </div>
      </div>
    )
  }

 
  return (
    <div className='bill-list-container'>
      {showLoader ? <Loader /> : renderBillList()}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    billList: state.app.billList
  }
}

export default (connect(mapStateToProps, { getBillList })(BillList))