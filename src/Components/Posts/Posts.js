import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

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

export default class Post extends Component {
  renderResponse({ loading, err, data }) {
    if (loading) {
      return <div>Loading...</div>
    }

    if (err) {
      return <div>Error</div>
    }

    return data.posts.map(post => (
      <Link key={post.id} to={`/post/${post.id}`}>
        <h1>{post.title}</h1>
      </Link>
    ))
  }
  render() {
    return (
      <div>
        <h1>Recent Posts</h1>
        <Query query={POSTS_QUERY}>{query => this.renderResponse(query)}</Query>
        <Link to={'/post/new'}>Create new post</Link>
      </div>
    )
  }
}
