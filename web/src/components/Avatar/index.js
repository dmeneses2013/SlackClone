// @flow
import React from 'react';
import md5 from 'md5';
import './index.scss';

type Props = {
  email: string,
  size?: number,
  style?: Object,
  imagesrc: string,
  user: {},
  image: string,
}

const Avatar = ({ email, size = 40, style, user, image }: Props) => {

  const hash = md5(email);
  const uri = "https://image.flaticon.com/icons/png/128/145/145867.png";

  return (
    <img
      class={"avatar"}
      src={image}
      alt={email}
      style={{ width: `${size}px`, height: `${size}px`, borderRadius: '4px', ...style }}
    />
  );
};

export default Avatar;
/*
https://image.flaticon.com/icons/png/128/186/186692.png
image.flaticon.com/icons/png/128/186/
186720
186693 186742 186711 186726 186722 186721 186709 186700 186695 186718 186702 186684 186677 186717 186710 186707
 */
