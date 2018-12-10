import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import Form from './Form'

const NEW_POST = gql`
  mutation addPost($title: String!, $body: String!) {
    createPost(data: { status: PUBLISHED, title: $title, body: $body }) {
      title
      body
      id
    }
  }
`

export class NewPost extends PureComponent {
  render() {
    return (
      <div>
        <h1>New post</h1>
        <Mutation mutation={NEW_POST}>
          {(createPost, result) => {
            return (
              <Form
                queryCallback={createPost}
                onSuccess={() => this.props.history.push('/')} //redirect to index
              />
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default NewPost
