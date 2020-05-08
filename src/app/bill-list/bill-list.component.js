import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../../utils/object.util'
import { MONTH_OPTIONS, CATEGORY_OPTIONS } from '../../constants/dropdown-options.constant'
import { Typography, Button, FormControl, InputLabel, Select, MenuItem , TextField} from '@material-ui/core'
import { updateBill , removeBill , getFilteredBillList , addBill , getBillsToBePaid} from '../../actions/index'

import Bill from '../../common/bill/bill.component'
import emptyStateGif from '../../assets/empty-state.gif'
import Loader from '../../common/loader/loader.component'
import BillDialog from './bill-dialog/bill-dialog.component'
import DialogBox from '../../common/dialog-box/dialog-box.component'

import './bill-list.component.scss'

function BillList (props) {
  const [ showLoader, setLoader ] = useState(true)
  const [ activeBill, setActiveBill ] = useState()
  const [ billDialog, setBillDialog ] = useState(false)
  const [ showDeleteConfirmModal, setDeleteConfirmModal ] = useState(false)
  const [ selectedMonth, setMonth ] = useState('')
  const [ selectedCategory, setCategory ] = useState('')
  const [ monthlyBudget, setMonthlyBudget ] = useState()

  const { billList, filteredBillList } = props
  const { addBill, updateBill, removeBill, getFilteredBillList, getBillsToBePaid } = props

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleMonthChange = (event) => {
    setMonth(event.target.value)
  }

  const handleBudgetChange = (event) => {
    setMonthlyBudget(event.target.value)
    const budgetValue = event.target.value
    fetchBillToPaid(budgetValue)
  }

  const fetchBillToPaid = (monthlyBudget) => {
    getBillsToBePaid(monthlyBudget)
  }

  const handleDeleteClick = (bill) => {
    setActiveBill(bill)
    showDeleteConfirmDialog()
  }

  const handleProceedDelete = () => {
    hideDeleteConfirmDialog()
    removeBill(activeBill)
  }

  const showDeleteConfirmDialog = () => {
    setDeleteConfirmModal(true)
  }

  const hideDeleteConfirmDialog = () => {
    setActiveBill(undefined)
    setDeleteConfirmModal(false)
  }

  const handleEditClick = (bill) => {
    setActiveBill(bill)
    setBillDialog(true)
  }

  const handleAddClick = () => {
    showBillDialog()
  }

  const showBillDialog = () => {
    setBillDialog(true)
  }

  const fetchFilteredBillList = () => {
    getFilteredBillList(selectedCategory, selectedMonth)
  }

  const hideBillDialog = () => {
    setBillDialog(false)
    setActiveBill(undefined)
  }

  const handleAddBill = (newBill) => {
    if(typeof newBill.date === 'object'){
      const formattedDate = formatDate(newBill.date)
      newBill.date = formattedDate
    }
    
    addBill({...newBill, 'isPayable': false})
  }

  const handleUpdateBill  = (updatedBill) => {
    updateBill(updatedBill)
  }

  const getTotalBilledAmount = () => {
    const totalAmount = billList.reduce((result, bill) => {
      return result + parseInt(bill.amount);
    }, 0)
    return totalAmount
  }

  useEffect(()=> {
    setLoader(true)
    fetchFilteredBillList()

    setTimeout(()=>{
      setLoader(false)
    }, 500)
  },[selectedCategory, selectedMonth])

  useEffect(()=> {
    if(billDialog){
      hideBillDialog()
    }

    setLoader(true)
    fetchFilteredBillList()

    setTimeout(()=>{
      setLoader(false)
    }, 500)
    
  },[billList])

  const renderHeaderView = () => {
    return(
      <div className='header-wrapper'>
        <div className='bill-details'>
          <Typography variant='h4' className='main-heading'>Total Expenses</Typography>
          <Typography variant='h4' className='main-heading'>{`Total Billed Amount :- ${getTotalBilledAmount() || 0}`}</Typography>
        </div>
        
        <div className='filters-wrapper'>
          <div>
            <FormControl variant="outlined" className='filter-option'>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-dropdown"
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {CATEGORY_OPTIONS.map((category) => (
                  <MenuItem key={category.id} value={category.value}>{category.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className='filter-option'>
              <InputLabel id="month-label">Billing Month</InputLabel>
              <Select
                labelId="month-dropdown"
                value={selectedMonth}
                onChange={handleMonthChange}
                label="Billing Month"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {MONTH_OPTIONS.map((month) => (
                  <MenuItem key={month.id} value={month.value}>{month.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type='number'
              className='field-wrapper'
              value={monthlyBudget}
              onChange={handleBudgetChange}
              id="outlined-basic" 
              label="Monthly Budget"
              variant="outlined"
            />
          </div>
          <Button variant="contained" onClick={handleAddClick}>Add Bill</Button>
        </div>
      </div>
    )
  }

  const renderBillList = () => {
    if(filteredBillList && filteredBillList.length){
      return(
        <div className='bill-list'>
          {filteredBillList.map((bill) => (<Bill
            key={bill.id}
            bill={bill}
            editBillCallback={(bill)=> handleEditClick(bill)}
            deleteBillCallback={(bill)=> handleDeleteClick(bill)}
          />))}
        </div>
      )
    }

    return renderEmptyState() 
  }

  const renderEmptyState = () => {
    return(
      <div className='empty-state-wrapper'>
        <img src={emptyStateGif} alt='No Bills'></img>
      </div>
    )
  }

  const renderMainContent = () => {
    return(
      <div className='main-content'>
        {renderHeaderView()}
        {renderBillList()}
      </div>
    )
  }

  return (
    <div className='bill-list-container'>
      {showLoader ? <Loader /> : renderMainContent()}
      {showDeleteConfirmModal && <DialogBox 
        message='This action is permanent and can not be undo.'
        handleCloseCallback={hideDeleteConfirmDialog}
        proceedDeletionCallback={handleProceedDelete} 
      />}
      {billDialog && <BillDialog
        billDialog={billDialog}
        activeBill={activeBill}
        handleCloseCallback={hideBillDialog}
        addBillCallback={(newBill) => handleAddBill(newBill)}
        updateBillCallback={(updatedBill) => handleUpdateBill(updatedBill)}
      />}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    billList: state.app.billList,
    filteredBillList: state.app.filteredBillList
  }
}

export default (connect(mapStateToProps, { 
  addBill,
  updateBill,
  removeBill,
  getBillsToBePaid,
  getFilteredBillList
})(BillList))