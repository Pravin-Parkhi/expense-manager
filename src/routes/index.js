import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../app/dashboard/dashboard.component'
import BillList from '../app/bill-list/bill-list.component'
import BaseLayout from '../common/base-layout/base-layout.component'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <BaseLayout>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/bill-list' component={BillList} />
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  )
}

