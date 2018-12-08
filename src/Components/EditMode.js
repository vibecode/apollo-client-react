import React, { PureComponent } from 'react'
import { ApolloConsumer } from 'react-apollo'

export class EditMode extends PureComponent {
  render() {
    const isEditMode = this.props.isEditMode

    return (
      <ApolloConsumer>
        {client => (
          <button
            onClick={() =>
              client.writeData({
                data: { isEditMode: !isEditMode }
              })
            }
          >
            {isEditMode ? 'Cancel Edit' : 'Edit'}
          </button>
        )}
      </ApolloConsumer>
    )
  }
}

export default EditMode
