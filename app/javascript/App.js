import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StepOnePage from './pages/StepOnePage'
import StepTwoPage from './pages/StepTwoPage'
import StepThreePage from './pages/StepThreePage'

function App () {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={HomePage} />
        <Route path="/step-one/" component={StepOnePage} />
        <Route path="/step-two/" component={StepTwoPage} />
        <Route path="/step-three/" component={StepThreePage} />

        <Route path="/trees" exact component={HomePage} />
        <Route path="/trees/step-one/" component={StepOnePage} />
        <Route path="/trees/step-two/" component={StepTwoPage} />
        <Route path="/trees/step-three/" component={StepThreePage} />
      </div>
    </Router>
  )
}

export default App
