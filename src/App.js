import React, { Component } from 'react'
import './App.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Posts from './Components/Posts/Posts'
import Post from './Components/Posts/Post'
import NewPost from './Components/NewPost'

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_CLIENT_ENDPOINT
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Switch>
              <Route path={'/post/new'} component={NewPost} />
              <Route path={'/post/:id'} component={Post} />
              <Route path={'/'} component={Posts} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
