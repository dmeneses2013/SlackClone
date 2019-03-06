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
  const {room ,currentUser, roomName, presentUsers, currentUserRoomIds,roomList, onRoomJoin, onRoomClick } = this.props;
  return(
      <div className={"room-sidebar"}>
        <div className={"header"}>
          <h1>Slack Clone</h1>
          <h2>{currentUser.username}</h2>
        </div>
        <div className={"channels"}>
        <h2 onClick={this.handleChannelClick}>Channels</h2>
        <ul>
          {roomList.map(room =>
            <li key={room.id} id={room.id} className={(this.props.room.id === room.id)? "selected" : ''} onClick={this.handleClick}>
              <Link to={`/r/${room.id}` }>
                  # {room.name}
              </Link>
            </li>
          )}
        </ul>
        </div>
        <div className={"users"}>
          <h2>Users</h2>
            <ul>
              {presentUsers.map(user =>
                <li key={user.id}>
                  <span>{user.username} </span>
                </li>
              )}
          </ul>
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
