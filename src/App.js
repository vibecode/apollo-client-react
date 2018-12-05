import React, { Component } from 'react'
import './App.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Posts from './Components/Posts/Posts'
import Post from './Components/Posts/Post'

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_CLIENT_ENDPOINT
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route path={'/'} component={Posts} />
            <Switch>
              <Route path={'/post/:id'} component={Post} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
