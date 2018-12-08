import React, { Component } from 'react'
import './App.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Posts from './Components/Posts'
import Post from './Components/Post'
import NewPost from './Components/NewPost'

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_CLIENT_ENDPOINT,
  clientState: {
    defaults: { isEditMode: false },
    resolvers: {}
  }
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Switch>
              <Route
                path={'/post/new'}
                component={NewPost}
              />
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
