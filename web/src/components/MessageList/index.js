// @flow
import React, { useRef, useLayoutEffect, Component } from 'react';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import mapKeys from 'lodash/mapKeys';
import Message from '../Message';
import './index.scss';
//import useStayScrolled from 'react-stay-scrolled';
import StayScrolled from 'react-stay-scrolled';


type MessageType = {
  id: number,
  inserted_at: string,
}

type Props = {
  messages: Array<MessageType>,
}

class MessageList extends Component {

  scrollToBottom = () => {
    var a = this.stayScrolledElem.scrollTop
    var b = this.stayScrolledElem.scrollHeight - this.stayScrolledElem.clientHeight;
    var c = a / b;
    let shouldScroll = (c > 0.93)
    if (shouldScroll) {
      this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }
  }

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
      <div key={day.date} className={"messages-list"} ref={c => { this.stayScrolledElem = c; }}>
        <div className={"daydivider"}>
          <span className={"daytext"}>
            {day.date === today && 'Today'}
            {day.date === yesterday && 'Yesterday'}
            {![today, yesterday].includes(day.date) && day.date}
          </span>
        </div>
        {this.renderMessages(day.messages)}
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
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
