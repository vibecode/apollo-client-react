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
        <Link to={'/post/new'} className="new_post_button">
          Create new post
        </Link>

        <h1>Recent Posts</h1>
        <Query query={POSTS_QUERY}>
          {query => this.renderResponse(query)}
        </Query>
      </div>
    )
  }
}
