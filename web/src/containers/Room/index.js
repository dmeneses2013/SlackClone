// @flow
import React, { Component }  from 'react';
import ReactDOM from 'react';
import { connect } from 'react-redux';
import { connectToChannel, leaveChannel, createMessage, loadOlderMessages } from '../../actions/room';
import MessageList from '../../components/MessageList';
import MessageForm from '../../components/MessageForm';
import RoomNavbar from '../../components/RoomNavbar';
import RoomSidebar from '../../components/RoomSidebar';
var giphy = require('giphy-api')('6pnpv5D6GRVm8ZbfI6I5PQ7WRmXm4IMc');

type MessageType = {
  id: number,
}

type Props = {
  socket: any,
  channel: any,
  room: Object,
  params: {
    id: number,
  },
  connectToChannel: () => void,
  leaveChannel: () => void,
  createMessage: () => void,
  messages: Array<MessageType>,
  presentUsers: Array,
  currentUser: Object,
  loadingOlderMessages: boolean,
  currentUserRooms: Array<Room>,
  currentUserRoomIds: Array,
  pagination: {
    total_pages: number,
    total_entries: number,
    page_size: number,
    page_number: number,
  },
  loadOlderMessages: () => void,
  onRoomJoin: () => void,
}

class Room extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    if (this.props.socket === null) { return }
    this.props.connectToChannel(this.props.socket, this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    // If user refreshes screen, need to get messages again..
    if (prevProps.socket === null) {
      this.props.connectToChannel(this.props.socket, this.props.match.params.id);
    }
    // If browser has changed channels, connect to new channel..
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.leaveChannel(this.props.channel);
      this.props.connectToChannel(prevProps.socket, this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.leaveChannel(this.props.channel);
  }

  handleLoadMore = () =>
    this.props.loadOlderMessages(
      this.props.match.params.id,
      { last_seen_id: this.props.messages[0].id }
    )

  handleMessageCreate = (data) => {
    let channel = this.props.channel;
    var symbol = data.text;
    if (symbol.charAt(0) !== '/') {
      this.props.createMessage(channel, data);
    } else {
      symbol = symbol.substring(6);
      let props = this.props;
      giphy.random(symbol).then(function (res) {
        if (res.data.images) {
          data.text = res.data.images.original.url
          props.createMessage(channel, data);
        }
      });
    }
  //  this.messageList.scrollToBottom();
  }

  render() {
    const moreMessages = this.props.pagination.total_pages > this.props.pagination.page_number;
    const { isLoading } = this.state;

    return (
      <div style={{ display: 'flex', height: '100vh', width: '90%', minWidth: '400px'}}>
        <RoomSidebar
          room={this.props.room}
          roomList={this.props.currentUserRooms}
          currentUser={this.props.currentUser}
          presentUsers={this.props.presentUsers}
          onRoomClick={this.handleRoomJoin}
          history={this.props.history}
        />
      <div className={"message-window"} style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
          <RoomNavbar
            room={this.props.room}
            users={this.props.presentUsers}
            />
          {!this.props.channel?
            <div></div>
              :
            <MessageList
              moreMessages={moreMessages}
              currentUser={this.props.currentUser}
              messages={this.props.messages}
              onLoadMore={this.handleLoadMore}
              ref={(c) => { this.messageList = c; }}
              loadingOlderMessages={this.props.loadingOlderMessages}
            />
           }
          <MessageForm onSubmit={this.handleMessageCreate} room={this.props.room.name? this.props.room.name : "unavailable" } />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
    messages: state.room.messages,
    presentUsers: state.room.presentUsers,
    currentUser: state.session.currentUser,
    pagination: state.room.pagination,
    loadingOlderMessages: state.room.loadingOlderMessages,
    currentUserRooms: state.rooms.currentUserRooms
  }),
  { connectToChannel, leaveChannel, createMessage, loadOlderMessages }
)(Room);
