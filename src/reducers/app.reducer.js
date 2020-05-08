import ActionTypes from "../action-types/index"
import { DUMMY_DATA } from "../constants/dummy-data";
import { deepCopy } from '../utils/object.util'

const defaultState = {
  billList: DUMMY_DATA.bills
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    case ActionTypes.GET_BILL_LIST: {
      return {
        ...state,
        billList: state.billList
      }
    }

    case ActionTypes.GET_FILTERED_RESULT: {
      const selectedCategory = action.category
      const selectedMonth = action.month
      let billListCopy = deepCopy(state.billList)
      let filteredList
      if(selectedCategory === '' && selectedMonth === ''){
        filteredList = billListCopy
      } else if(selectedMonth === '' && selectedCategory.length){
        filteredList = billListCopy.filter(bill => {
          return bill.category === selectedCategory
        })
      } else if(selectedCategory === '' && selectedMonth.length){
        filteredList = billListCopy.filter(bill => {
          // takes the month from date form mm/dd/yyyy
          return bill.date.split('-')[0] === selectedMonth.split('-')[0]
        })
      } else {
        filteredList = billListCopy.filter(bill => {
          return ((bill.category === selectedCategory) && (bill.date.split('-')[0] === selectedMonth.split('-')[0]))
        })
      }
      return {
        ...state,
        filteredBillList: filteredList
      }
    }

    case ActionTypes.GET_BILLS_TO_BE_PAID: {
      const monthlyBudget = parseInt(action.budget)
      let billsToBePaid = deepCopy(state.filteredBillList)
      let sortedListOfBills = billsToBePaid.sort((ele1, ele2) => {return ele2.amount - ele1.amount})
      let budgetCap = 0
      sortedListOfBills.forEach((bill) => {
        const billAmount = parseInt(bill.amount)
        if((billAmount <= monthlyBudget) && (billAmount+budgetCap) < monthlyBudget){
          budgetCap += billAmount
          bill.isPayable = true
        } else {
          bill.isPayable = false
        }
      })
      return {
        ...state,
        filteredBillList: billsToBePaid
      }
    }

    case ActionTypes.ADD_BILL: {
      let newBill = action.bill
      return {
        ...state,
        billList : [...state.billList, newBill]
      }
    }

    case ActionTypes.UPDATE_BILL: {
      let billListCopy = deepCopy(state.billList)
      const billToBeUpdated = action.bill
      for(let billIndx=0; billIndx<billListCopy.length; billIndx++){
        const billDetails = billListCopy[billIndx]
        if(billDetails.id === billToBeUpdated.id){
          billListCopy.splice(billIndx, 1, billToBeUpdated)
          break
        }
      }
      return {
        ...state,
        billList : billListCopy
      }
    }

    case ActionTypes.REMOVE_BILL: {
      let billListCopy = deepCopy(state.billList)
      const billToBeDeleted = action.bill
      for(let billIndx=0; billIndx<billListCopy.length; billIndx++){
        const billDetails = billListCopy[billIndx]
        if(billDetails.id === billToBeDeleted.id){
          billListCopy.splice(billIndx, 1)
          break
        }
      }
      return {
        ...state,
        billList: billListCopy
      }
    }

    default:
      return state
  }
};

export default appReducer;