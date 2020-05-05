import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getBillList} from '../../actions/index'

import Loader from '../../common/loader/loader.component'

import './dashboard.component.scss'


function Dashboard (props) {
  const [ showLoader, setLoader ] = useState(true)

  const { getBillList } = props


  useState(()=> {
    getBillList()

    setTimeout(()=>{
      setLoader(false)
    }, 500)
  },[])


  const renderVisualization = () => {
    return(
      <div className='visualization-container'>gagaga</div>
    )
  }

 
  return (
    <div className='dashboard-container'>
      {showLoader ? <Loader /> : renderVisualization()}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    billList: state.app.billList
  }
}

export default (connect(mapStateToProps, { getBillList })(Dashboard))