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

    case ActionTypes.GET_CATEGORY_WISE_BILL_LIST: {
      const selectedCategory = action.category
      let billListCopy = deepCopy(state.billList)
      let filteredList
      if(selectedCategory === ''){
        filteredList = billListCopy
      } else {
        filteredList = billListCopy.filter(bill => {
          return bill.category === selectedCategory
        })
      }
      return {
        ...state,
        filteredBillList: filteredList
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