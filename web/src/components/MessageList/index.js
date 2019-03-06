// @flow
import React, { Component } from 'react';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import mapKeys from 'lodash/mapKeys';
import Message from '../Message';
import './index.scss';

type MessageType = {
  id: number,
  inserted_at: string,
}

type Props = {
  messages: Array<MessageType>,
}

class MessageList extends Component {

  renderMessages = messages =>
    messages.map(message => <Message key={message.id} message={message} />);

  renderDays() {
    const { messages } = this.props;
    messages.map(message => message.day = moment(message.inserted_at).format('MMMM Do'));
    const dayGroups = groupBy(messages, 'day');
    const days = [];
    mapKeys(dayGroups, (value, key) => {
      days.push({ date: key, messages: value });
    });
    const today = moment().format('MMMM Do');
    const yesterday = moment().subtract(1, 'days').format('MMMM Do');
    return days.map(day =>
      <div className={"inner"}>
      <div key={day.date} className={"messages-list"}>
        <div className={"daydivider"}>
          <span className={"daytext"}>
            {day.date === today && 'Today'}
            {day.date === yesterday && 'Yesterday'}
            {![today, yesterday].includes(day.date) && day.date}
          </span>
        </div>
        {this.renderMessages(day.messages)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={"messages-container"}>
        {this.renderDays()}
      </div>
    );
  }
}

export default MessageList;
