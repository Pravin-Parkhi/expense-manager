import React from 'react'
import { AppBar, Toolbar, IconButton, Typography  } from '@material-ui/core'

import brandLogo from '../../assets/brand-logo.png'

import './header.component.scss'

export default function Header (props) {

  return (
    <AppBar className='header-container' position="static">
      <Toolbar>
        <IconButton edge="start" className='' color="inherit" aria-label="menu">
          <img src={brandLogo} className='brand-logo' alt='Brand Logo' />
        </IconButton>
        <Typography variant="h6" className='brand-name'>Expense Manager</Typography>
      </Toolbar>
    </AppBar>
  )
}
