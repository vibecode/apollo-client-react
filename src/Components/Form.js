import React from 'react'

class Form extends React.Component {
  state = {
    id: this.props.post.id || '',
    title: this.props.post.title || '',
    body: this.props.post.body || ''
  }

  static defaultProps = {
    post: {}
  }

  handleInput = ev => {
    this.setState({ [ev.target.name]: ev.target.value })
  }

  handleSubmit = async ev => {
    const { id, title, body } = this.state
    ev.preventDefault()

    await this.props.queryCallback({
      variables: {
        title,
        body,
        id
      }
    })

    this.setState({ title: '', body: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.title}
          type="text"
          name="title"
          placeholder="Title"
          onChange={this.handleInput}
        />
        <textarea
          value={this.state.body}
          name="body"
          id=""
          cols="30"
          rows="10"
          placeholder="body"
          onChange={this.handleInput}
        />
        <button>Submit</button>
      </form>
    )
  }
}

export default Form
