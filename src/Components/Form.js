import React from 'react'

const Form = ({ title, body, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={title}
        type="text"
        name="title"
        placeholder="Title"
        onChange={onInputChange}
      />
      <textarea
        value={body}
        name="body"
        id=""
        cols="30"
        rows="10"
        placeholder="body"
        onChange={onInputChange}
      />
      <button>Submit</button>
    </form>
  )
}

export default Form
