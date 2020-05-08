import ActionTypes from '../action-types/index'

export const getBillList = () => {
  return {
    type: ActionTypes.GET_BILL_LIST
  }
}

export const getFilteredBillList = (category, month) => {
  return {
    type: ActionTypes.GET_FILTERED_RESULT,
    category,
    month
  }
}

export const getBillsToBePaid = (budget) => {
  return {
    type: ActionTypes.GET_BILLS_TO_BE_PAID,
    budget
  }
}

export const addBill = (bill) => {
  return {
    type: ActionTypes.ADD_BILL,
    bill
  }
}

export const updateBill = (bill) => {
  return {
    type: ActionTypes.UPDATE_BILL,
    bill
  }
}

export const removeBill = (bill) => {
  return {
    type: ActionTypes.REMOVE_BILL,
    bill
  }
}