// @flow
import React from 'react';
import { css, StyleSheet } from 'aphrodite';

type Props = {
  room: {
    name: string,
  },
}

const styles = StyleSheet.create({
  navbar: {
    padding: '15px',
    background: '#fff',
    borderBottom: '1px solid rgb(240,240,240)',
  },
});

const RoomNavbar = ({ room }: Props) =>
  <nav className={css(styles.navbar)}>
    <div>"Hi"</div>
  </nav>;

export default RoomNavbar;
