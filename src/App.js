import React, { Component } from 'react'
import './App.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_CLIENT_ENDPOINT
})

console.log(process.env.REACT_APP_APOLLO_CLIENT_ENDPOINT)

const testQuery = gql`
  {
    posts {
      id
      title
      body
      createdAt
    }
  }
`

client
  .query({
    query: testQuery
  })
  .then(res => console.log(res))

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>lol</div>
      </ApolloProvider>
    )
  }
}

export default App
