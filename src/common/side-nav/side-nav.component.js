import React from 'react'
import { NavLink } from 'react-router-dom'
import { Tooltip } from '@material-ui/core'

import DashboardOutlined from '@material-ui/icons/DashboardOutlined'
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined'

import './side-nav.component.scss'

export default function SideBar (props) {
  return (
    <div className='side-bar'>
      <div className='side-bar-option'>
        <Tooltip title='Dashboard' placement='right'>
          <div>
            <NavLink className='page-links' activeClassName='active-page' to='/dashboard'>
              <DashboardOutlined />
            </NavLink>
          </div>
        </Tooltip>
      </div>
      <div className='side-bar-option'>
        <Tooltip title='Bills' placement='right'>
          <div>
            <NavLink className='page-links' activeClassName='active-page' to='/bill-list'>
              <ListAltOutlinedIcon />
            </NavLink>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
