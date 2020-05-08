import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getBillList , updateBill , removeBill , getCategoryWiseBillList , addBill } from '../../actions/index'
import { CATEGORY_OPTIONS } from '../../constants/dropdown-options.constant'
import { Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

import Bill from '../../common/bill/bill.component'
import Loader from '../../common/loader/loader.component'
import BillDialog from './bill-dialog/bill-dialog.component'
import DialogBox from '../../common/dialog-box/dialog-box.component'

import './bill-list.component.scss'

function BillList (props) {
  const [ showLoader, setLoader ] = useState(true)
  const [ activeBill, setActiveBill ] = useState()
  const [ selectedCategory, setCategory ] = useState('')
  const [ billDialog, setBillDialog ] = useState(false)
  const [ showDeleteConfirmModal, setDeleteConfirmModal ] = useState(false)

  const { billList, filteredBillList } = props
  const { addBill, updateBill, removeBill, getBillList, getCategoryWiseBillList } = props


  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
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

  const fetchBillList = () => {
    getBillList()
  }

  const fetchCategoryWiseBillList = () => {
    getCategoryWiseBillList(selectedCategory)
  }

  const hideBillDialog = () => {
    setBillDialog(false)
  }

  const handleAddBill = (newBill) => {
    addBill(newBill)
  }

  const handleUpdateBill  = (updatedBill) => {
    updateBill(updatedBill)
  }

  useEffect(()=> {
    setLoader(true)
    fetchCategoryWiseBillList()

    setTimeout(()=>{
      setLoader(false)
    }, 500)
  },[selectedCategory])

  useEffect(()=> {
    if(billDialog){
      hideBillDialog()
    }

    if(selectedCategory){
      setLoader(true)
      fetchCategoryWiseBillList()

      setTimeout(()=>{
        setLoader(false)
      }, 500)
    }
  },[billList])

  const renderHeaderView = () => {
    return(
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
              <MenuItem value=""><em>None</em></MenuItem>
              {CATEGORY_OPTIONS.map((category) => (
                <MenuItem key={category.id} value={category.value}>{category.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleAddClick}>Add Bill</Button>
        </div>
      </div>
    )
  }

  const renderBillList = () => {
    return(
      <div className='bill-list'>
        {filteredBillList && filteredBillList.map((bill) => (<Bill 
          bill={bill}
          editBillCallback={(bill)=> handleEditClick(bill)}
          deleteBillCallback={(bill)=> handleDeleteClick(bill)}
        />))}
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
  getBillList,
  updateBill,
  removeBill,
  getCategoryWiseBillList
})(BillList))