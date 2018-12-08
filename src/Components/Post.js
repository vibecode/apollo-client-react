import React, { PureComponent, Fragment } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import UpdatePost from './UpdatePost'
import EditMode from './EditMode'

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
    }

    isEditMode @client
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

    const { post, isEditMode } = data

    return (
      <section>
        {isEditMode ? (
          <Fragment>
            <h1>Edit post</h1>
            <UpdatePost post={post} />
          </Fragment>
        ) : (
          <Fragment>
            <h1>{post.title}</h1>
            <div>{post.body}</div>
          </Fragment>
        )}
        <EditMode isEditMode={isEditMode} />
      </section>
    )
  }

  render() {
    const { id } = this.props.match.params

    return (
      <div>
        <Query query={POST_QUERY} variables={{ id }}>
          {(loading, err, data) => {
            return this.renderResponse(loading, err, data)
          }}
        </Query>
      </div>
    )
  }
}

export default Post
