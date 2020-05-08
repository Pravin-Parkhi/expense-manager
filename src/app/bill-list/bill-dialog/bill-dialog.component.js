import React, { useState, useEffect } from 'react'
import { getUUID } from '../../../utils/object.util'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { CATEGORY_OPTIONS } from '../../../constants/dropdown-options.constant'
import { validateFormField, validateForm , validations } from '../../../utils/validation.utils'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button , TextField, 
  FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'

  import DateFnsUtils from '@date-io/date-fns'

import './bill-dialog.component.scss'

const requiredFields = ['description', 'category', 'amount', 'date']
const formRegex = {
  amount: validations.number
}

function BillDialog (props) {
  const [ values, setValues ] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date()
  })
  const [ errors, setErrors ] = useState({})

  const { activeBill } = props
  const { handleCloseCallback, addBillCallback, updateBillCallback } = props

  const handleClose = () => {
    handleCloseCallback()
  }

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    })
    validate({
      ...values,
      [name]: event.target.value
    }, name)
  }

  const handleDateChange = (date) => {
    setValues({
      ...values,
      date
    })
    validate({
      ...values,
      date
    }, date)
  }

  const validate = (form, prop) => {
    form = form || values
    if (prop) {
      let error = validateFormField(form[prop], formRegex[prop], requiredFields.indexOf(prop) >= 0)
      setErrors({ ...errors, [prop]: error })
      return error
    } else {
      const errorObj = validateForm(form, formRegex, requiredFields)
      setErrors({ ...errors, ...errorObj.fieldErrors })
      return errorObj.hasError
    }
  }

  const handleSubmit = () => {
    if(!validate()){
      if(activeBill){
        updateBillCallback(values)
      } else {
        addBillCallback({
          ...values,
          id: getUUID()
        })
      }
    }
  }

  const populateForm = (activeBill) => {
    setValues({
      ...activeBill
    })
  }

  useEffect(()=> {
    if(activeBill){
      populateForm(activeBill)
    }
  }, [])

  return (
    <Dialog
      open
      className='bill-dialog-box'
      size='lg'
      onClose={handleClose}
      aria-labelledby='bill-dialog-title'
      aria-describedby='bill-dialog-description'
      classes={{
        paper: 'paper'
      }}
    >
      <DialogTitle>{activeBill ? 'Update Bill' : 'Add Bill'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          type='text'
          className='field-wrapper'
          value={values.description}
          onChange={handleChange('description')}
          id="outlined-basic" 
          label="Bill Description" 
          variant="outlined"
          error={errors.description}
        />
        <FormControl variant="outlined" className='field-wrapper' fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
          <Select
            labelId="category-dropdown"
            value={values.category}
            onChange={handleChange('category')}
            label="Category"
            error={errors.category}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {CATEGORY_OPTIONS.map((category) => (
              <MenuItem key={category.id} value={category.value}>{category.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type='number'
          className='field-wrapper'
          value={values.amount}
          onChange={handleChange('amount')}
          id="outlined-basic" 
          label="Bill Amount" 
          variant="outlined"
          error={errors.amount}
        />
      <FormControl margin='normal' className='field-wrapper date-picker' fullWidth>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker value={values.date} format='MM/dd/yyyy' onChange={handleDateChange} />
        </MuiPickersUtilsProvider>
      </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>Cancel</Button>
        <Button onClick={handleSubmit } color='primary' className='submit-btn'>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default BillDialog
