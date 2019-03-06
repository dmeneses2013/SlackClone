// @flow
import React from 'react';
import './index.scss';
import UserLogo from '../../assets/images/UserLogo.png';
import star from '../../assets/images/star.png';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import mapKeys from 'lodash/mapKeys';

type Props = {
  room: {
    name: string,
  },
  users: Array<User>,
}

const RoomNavbar = ({ room, users }: Props) =>
  <nav className={"room-navbar"}>
    <h3># {room.name}</h3>
    <div className={"navbar-subtitle"}>
      <img src={star}/>
        <span> | </span>
        <img src={UserLogo}/>
        <h4 className={"user-count"}>{users.length}</h4>
        <span> | </span>
    </div>
    <div className={"navbar-day"}></div>
  </nav>;

export default RoomNavbar;
