import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import POSTS_QUERY from '../Queries/Posts.graphql'

export default class Post extends Component {
  renderResponse({ loading, err, data, fetchMore }) {
    if (loading) {
      return <div>Loading...</div>
    }

    if (err) {
      return <div>Error</div>
    }

    return (
      <ul>
        {data.posts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>
              <h1>{post.title || 'No title'}</h1>
            </Link>
          </li>
        ))}
        <button
          className={'left'}
          onClick={() =>
            fetchMore({
              variables: {
                skip: data.posts.length
              },
              updateQuery: (prevData, { fetchMoreResult }) => {
                if (!fetchMoreResult) return

                return {
                  ...prevData,
                  posts: [...prevData.posts, ...fetchMoreResult.posts]
                }
              }
            })
          }
        >
          Load more
        </button>
      </ul>
    )
  }
  render() {
    return (
      <div>
        <Link to={'/post/new'} className="new_post_button">
          Create new post
        </Link>

        <h1>Recent Posts</h1>
        <Query query={POSTS_QUERY}>{query => this.renderResponse(query)}</Query>
      </div>
    )
  }
}
