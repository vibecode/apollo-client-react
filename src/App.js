import React, { Component } from 'react'
import './App.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Posts from './Components/Posts'
import Post from './Components/Post'
import NewPost from './Components/NewPost'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path={'/post/new'} component={NewPost} />
            <Route path={'/post/:id'} component={Post} />
            <Route path={'/'} component={Posts} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
