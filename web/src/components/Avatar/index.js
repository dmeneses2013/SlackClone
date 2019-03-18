// @flow
import React from 'react';
import md5 from 'md5';
import './index.scss';

type Props = {
  size?: number,
  style?: Object,
  imagesrc: string,
  user: {},
  image: string,
}

const Avatar = ({ size = 40, style, user, image }: Props) => {
  return (
    <img
      className={"avatar"}
      src={image}
      style={{ width: `${size}px`, height: `${size}px`, borderRadius: '4px', ...style }}
    />
  );
};
export default Avatar;
