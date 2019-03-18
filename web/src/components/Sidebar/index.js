// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import iconSidebar from '../../assets/images/iconSidebar.png';


const styles = StyleSheet.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgb(38,0,39)',
  },

  link: {
    position: 'relative',
    display: 'flex',
    width: '65px',
    color: 'rgba(255,255,255,.6)',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },

  settingsImg: {
    width: "inherit",
    borderRadius: "10%",
  },


  activeLink: {
    color: '#fff',
    ':after': {
      position: 'absolute',
      top: '8px',
      bottom: '8px',
      left: '0',
      width: '3px',
      background: 'rgba(255,255,255,.2)',
      borderTopRightRadius: '3px',
      borderBottomRightRadius: '3px',
      content: '""',
    },
  },

  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    margin: '12px auto',
    fontSize: '20px',
    background: 'rgba(255,255,255,.2)',
    borderRadius: '5px',
  },

  logoutButton: {
    padding: '0',
    background: 'transparent',
    border: '0',
    cursor: 'pointer',
  },
});

type Room = {
  id: number,
  name: string,
}

type RoomLinkProps = {
  room: Room
}

const RoomLink = ({ room }: RoomLinkProps) =>
  <Link to={`/r/${room.id}`} className={css(styles.link)}>
    <div className={css(styles.badge)}>
    </div>
  </Link>;

type Props = {
  rooms: Array<Room>,
  router: Object,
  onLogoutClick: () => void,
}

const Sidebar = ({ rooms, router, onLogoutClick }: Props) =>
  <div className={css(styles.sidebar)}>
    <Link
      to="/"
      className={css(styles.link)}
    >
      <div className={css(styles.badge)}>
        <img src={iconSidebar} className={css(styles.settingsImg)}>
        </img>
        <span className="fa fa-plus" />
      </div>
    </Link>
    <div style={{ flex: '1' }} />
    <button
      onClick={() => onLogoutClick(router)}
      className={css(styles.link, styles.logoutButton)}
    >
      <div className={css(styles.badge)}>
        <img src="https://www.logospng.com/images/61/iconfinder-iconico-by-nicolas-rubio-61578.png" className={css(styles.settingsImg)} />
        <span className="fa fa-sign-out" />
      </div>
    </button>
  </div>;

export default Sidebar;
