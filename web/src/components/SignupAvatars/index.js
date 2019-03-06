import React, { Component } from 'react';
import './index.scss';

class SignupAvatars extends Component {

  handleClick = (e) => {
    console.log("AWDAWDAWDAWD");
    this.props.onClick(e.currentTarget.src)
  }

  render() {
    const uri = 'https://image.flaticon.com/icons/png/128/186/';
    const avatars= ['186720', '186693'/*, '186742', '186711', '186726', '186722', '186721', '186709', '186700', '186695', '186702', '186684', '186677', '186717', '186710', '186707'*/];
    const filetype = '.png';

    return(
      <div className={"avatar-grid"}>
        {avatars.map(avatar =>
            <img key={avatars.indexOf(avatar)} src={uri + avatar + filetype} className={"avatar"} onClick={this.handleClick} />
        )}
      </div>
    );
  }


}

export default SignupAvatars;
