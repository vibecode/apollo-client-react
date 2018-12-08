import React, { PureComponent } from 'react'
import Form from './Form'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const UPDATE_POST = gql`
  mutation updatePost(
    $id: ID!
    $title: String
    $body: String
  ) {
    updatePost(
      where: { id: $id }
      data: {
        status: PUBLISHED
        title: $title
        body: $body
      }
    ) {
      title
      body
      id
    }
  }
`

export class UpdatePost extends PureComponent {
  render() {
    return (
      <Mutation mutation={UPDATE_POST}>
        {updateCb => (
          <Form
            post={this.props.post}
            queryCallback={updateCb}
          />
        )}
      </Mutation>
    )
  }
}

export default UpdatePost
