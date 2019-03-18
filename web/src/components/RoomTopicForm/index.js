import React, { useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import './index.scss';

const RoomTopicForm = ({ currentRoom, onSubmit, closeTopicForm }: Props) => {

  return(
    <div>
    <form onSubmit={onSubmit} className={"message-form"}>
      <div className="input-group">
        <Field
          autoComplete="off"
          defaultprevented='true'
          name="Hey"
          type="text"
          component="input"
          className={"form-control"}
          placeholder={"Edit topic"}
          autoFocus={true}
          onBlur={closeTopicForm}
          initialvalues={"HEY"}
          />
        <div className="input-group-btn">
        </div>
      </div>
    </form>
    </div>
  );
}

export default reduxForm({
  form: 'newTopic'
})(RoomTopicForm);
