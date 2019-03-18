// @flow
import React, { useState, useEffect } from 'react';
import './index.scss';
import UserLogo from '../../assets/images/UserLogo.png';
import star from '../../assets/images/star.png';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import mapKeys from 'lodash/mapKeys';
import RoomTopicForm from '../RoomTopicForm';

type Props = {
  room: {
    name: string,
  },
  users: Array<User>,
}

const RoomNavbar = ({ room, users, onEditClick, topic, topicFormIsVisible, onTopicSubmit, closeTopicForm }: Props) => {


  return (
      <nav className={"room-navbar"}>
        <h3>#{room.name}</h3>
        <div className={"room-navbar-subtitle"}>
          <img src={star}/>
            <span> | </span>
            <img src={UserLogo}/>
            <h4 className={"user-count"}>{users.length}</h4>
            <span> | </span>
            {!topicFormIsVisible ?
              <span className={"topic"} onClick={onEditClick} >
                <span className={"topic-text"}>
                  {topic? topic : 'Add a topic'}
                  </span>
              <span className={"ok"}>
                  <button className={"hidden"}>Edit</button></span>
                </span>
                :
              <div className={"navbar-topic-form"} ><RoomTopicForm onSubmit={onTopicSubmit} currentRoom={room} closeTopicForm={closeTopicForm}/></div>
              }



        </div>
        <div className={"navbar-day"}></div>
      </nav>)

    }

export default RoomNavbar;
