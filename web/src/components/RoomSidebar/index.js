// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.scss';
import { joinRoom } from '../../actions/rooms';


type User = {
  id: number,
  username: string,
}

type Props = {
  room: {
    id: number,
    name: string,
  },
  currentUser: {
    username: string,
  },
  currentRoom: {},
  presentUsers: Array<User>,
  currentUserRoomIds: Array,
  roomList: Array<Room>,
  joinRoom: () => void,
}

class RoomSidebar extends Component {

  handleChannelClick = () => {
    this.props.history.push('/');
  }

render() {
  const {currentUser, presentUsers, roomList, room } = this.props;

  return(
      <div className={"room-sidebar-container"}>
        <div className={"header"}>
          <h1>Slack Clone</h1>
          <h2>{currentUser.username}</h2>
        </div>
        <div className={"channels"}>
        <h2 onClick={this.handleChannelClick}>Channels</h2>
          {roomList.map(room =>
            <div key={room.id} id={room.id} className={(this.props.room.id === room.id)? "selected" : ''} onClick={this.handleClick}>
              <Link to={`/r/${room.id}` }>
                  #{room.name}
              </Link>
            </div>
          )}
        </div>
        <div className={"users"}>
          <h2>Direct Messages</h2>
              {presentUsers.map(user =>
                <div key={user.id}>
                  <span><span className="dot">● </span>{user.username} </span>
                </div>
              )}
              {
                room.users.filter(user => !presentUsers.map(user => user.username).includes(user.username)).map(user =>
                <div>
                  <span><span className="empty-dot">● </span>{user.username} </span>
                </div>
              )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    room: state.room.currentRoom,
  }),
  {joinRoom})(RoomSidebar);
