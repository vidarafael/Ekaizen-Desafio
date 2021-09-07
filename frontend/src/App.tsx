import './styles/global.scss'
import { Tools } from './pages/Tools/'
import { Home } from './pages/Home/'
import { CreateBudget } from './pages/CreateBudget'
import { CreateClient } from './pages/CreateClient'
import { FinishBudget } from './pages/FinishBudget'
import { EditClient } from './pages/EditClient'
import { CreateTool } from './pages/CreateTool'
import { EditTool } from './pages/EditTool'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ToolProvider } from './components/ToolContext'


export function App() {
  return (
    <ToolProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/create">
            <CreateClient />
          </Route>

          <Route path="/edit/:id">
            <EditClient />
          </Route>

          <Route path="/budget/:id">
            <CreateBudget />
          </Route>

          <Route path="/finish/:id">
            <FinishBudget />
          </Route>

          <Route path="/tools/create">
            <CreateTool />
          </Route>

          <Route path="/tools/edit/:id">
            <EditTool />
          </Route>
          
          <Route exact path="/tools">
            <Tools />
          </Route>

        </Switch>
      </BrowserRouter>
    </ToolProvider>
  )
}