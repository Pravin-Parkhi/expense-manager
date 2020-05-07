import React from 'react'

import { Card, CardContent, Typography, CardActions, Button, IconButton } from '@material-ui/core'

import billIcon from '../../assets/bill.png'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'

import './bill.component.scss'

export default function Bill (props) {

  const { bill } = props
  const { editBillCallback, deleteBillCallback } = props

  const handleEditClick = () => {
    editBillCallback(bill)
  }

  const handleDeleteClick = () => {
    deleteBillCallback(bill)
  }


  return (
    <Card className='bill-container'>
      <CardActions className='action-wrapper'>
        <IconButton aria-label="Edit" className='icon' onClick={handleEditClick}>
          <EditOutlinedIcon />
        </IconButton>
        <IconButton aria-label="Delete" className='icon' onClick={handleDeleteClick}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </CardActions>
      <CardContent className='bill-details'>
        <div className='icon-wrapper'>
          <img src={billIcon} alt='Bill' />
        </div>
        <Typography variant="h5" component="h2" className='bill-amount'>{`${bill.amount} INR`}</Typography>
        <Typography color="textSecondary" className='bill-category'>{bill.category}</Typography>
        <Typography variant="body2" component="p" className='bill-desc'>{bill.description}</Typography>
      </CardContent>
    </Card>
  )
}
