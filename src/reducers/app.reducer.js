import ActionTypes from "../action-types/index"
import { DUMMY_DATA } from "../constants/dummy-data";
import { deepCopy } from '../utils/object.util'

const defaultState = {
  billList: DUMMY_DATA.data
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    case ActionTypes.GET_BILL_LIST: {
      return {
        ...state,
        billList: state.billList
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
      return {
        ...state,
        billList : billListCopy
      }
    }

    case ActionTypes.REMOVE_BILL: {
      return {
        ...state,
        billList: state.billList
      }
    }

    default:
      return state
  }
};

export default appReducer;