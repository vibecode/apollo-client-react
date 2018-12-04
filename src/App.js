import React, { Component } from 'react'
import './App.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_CLIENT_ENDPOINT
})

const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      body
      createdAt
    }
  }
`

class App extends Component {
  renderResponse({ loading, err, data }) {
    if (loading) {
      return <div>Loading...</div>
    }

    if (err) {
      return <div>Error</div>
    }

    return data.posts.map(post => <h1 key={post.id}>{post.title}</h1>)
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={POSTS_QUERY}>{this.renderResponse}</Query>
      </ApolloProvider>
    )
  }
}

export default App
