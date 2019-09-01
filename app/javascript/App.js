import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from './HomePage'
import GeoTagPage from './GeoTagPage'
import ImageCapturePage from './ImageCapturePage'
import SubmitPage from './SubmitPage'

function App () {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={HomePage} />
        <Route path="/step-one/" component={GeoTagPage} />
        <Route path="/step-two/" component={ImageCapturePage} />
        <Route path="/step-three/" component={SubmitPage} />

        <Route path="/trees" exact component={HomePage} />
        <Route path="/trees/step-one/" component={GeoTagPage} />
        <Route path="/trees/step-two/" component={ImageCapturePage} />
        <Route path="/trees/step-three/" component={SubmitPage} />
      </div>
    </Router>
  )
}

export default App

//   <nav>
//     <ul>
//       <li>
//         <Link to="/">Home</Link>
//       </li>
//       <li>
//         <Link to="/step-one/">Secondary Image</Link>
//       </li>
//       <li>
//         <Link to="/step-two/">Primary Image</Link>
//       </li>
//       <li>
//         <Link to="/step-three/">Submit Page</Link>
//       </li>
//     </ul>
//   </nav>
