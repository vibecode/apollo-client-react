import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import UpdatePost from './UpdatePost'

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
    }
  }
`

class Post extends PureComponent {
  renderResponse({ loading, err, data }) {
    if (loading) {
      return <div>Loading...</div>
    }

    if (err) {
      return <div>Error</div>
    }

    const { post } = data

    return (
      <div>
        <section>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </section>
        <section>
          <h1>Edit Post</h1>
          <UpdatePost post={post} />
        </section>
      </div>
    )
  }

  render() {
    const { id } = this.props.match.params
    return (
      <Query query={POST_QUERY} variables={{ id }}>
        {(loading, err, data) =>
          this.renderResponse(loading, err, data)
        }
      </Query>
    )
  }
}

export default Post
