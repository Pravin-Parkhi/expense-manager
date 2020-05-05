import { zipObject } from 'lodash'

const ACTION_TYPES = [
  "GET_BILL_LIST",
  
  "ADD_BILL",

  "UPDATE_BILL",

  "REMOVE_BILL"
]

export default zipObject(ACTION_TYPES, ACTION_TYPES)
