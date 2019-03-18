// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import './index.scss';


type Props = {
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
  room: string,
}

class MessageForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, room } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className={"message-form"}>
        <div className="input-group">
          <Field
            autoComplete="off"
            name="text"
            type="text"
            component="input"
            className={"form-control"}
            placeholder={"Message " + room}
          />
          <div className="input-group-btn">
          </div>
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.text) {
    errors.text = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'newMessage',
  validate,
})(MessageForm);
