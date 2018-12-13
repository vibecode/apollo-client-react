import React, { PureComponent, Fragment } from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import UpdatePost from './UpdatePost'
import EditMode from './EditMode'
import POST_QUERY from '../Queries/Post.graphql'

const UPDATE_POST = gql`
  mutation updatePost($check: Boolean, $id: ID!) {
    updatePost(where: { id: $id }, data: { check: $check }) {
      id
      check
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
            <Mutation
              mutation={UPDATE_POST}
              variables={{ id: post.id, check: !post.check }}
              optimisticResponse={{
                __typename: 'Mutation',
                updatePost: {
                  __typename: 'Post',
                  check: !post.check,
                  id: post.id
                }
              }}
              update={(cache, { data: { updatePost } }) => {
                const data = cache.readQuery({
                  query: POST_QUERY,
                  variables: { id: post.id }
                })

                data.post.check = updatePost.check

                cache.writeQuery({
                  query: POST_QUERY,
                  data
                })
              }}
            >
              {updatePost => (
                <input
                  type="checkbox"
                  checked={
                    typeof post.check === 'undefined' ? false : post.check
                  }
                  onChange={updatePost}
                />
              )}
            </Mutation>
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
