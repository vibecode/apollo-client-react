import React, { PureComponent } from 'react'
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
  constructor(props) {
    super(props)
    this.state = { title: '', body: '' }
  }

  handleInput = ev => {
    console.log(ev.target.value)
    this.setState({ [ev.target.name]: ev.target.value })
  }

  handleSubmit = createPost => {
    createPost().then(() =>
      this.setState({
        title: '',
        body: ''
      })
    )
  }

  renderForm = createPost => {
    const { title, body } = this.state

    const handleSubmit = e => {
      e.preventDefault()

      createPost().then(() =>
        this.setState({
          title: '',
          body: ''
        })
      )
    }

    return (
      <Form
        onSubmit={handleSubmit}
        onInputChange={this.handleInput}
        title={title}
        body={body}
      />
    )
  }

  render() {
    const { title, body } = this.state

    return (
      <div>
        <h1>New post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
          {createPost => this.renderForm(createPost)}
        </Mutation>
      </div>
    )
  }
}

export default NewPost
