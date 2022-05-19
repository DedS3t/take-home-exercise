import React from 'react';
import PropTypes from 'prop-types';
import './TeamMember.css';
import CodelitEmptyAvatar from '../../assets/codelit_empty_avatar.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons' 

class TeamMember extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
    story: PropTypes.string,
    favoriteColor: PropTypes.string,
    placeHolder: PropTypes.bool,
    onClick: PropTypes.func,
    onDelete: PropTypes.func, 
    onEdit: PropTypes.func,
  };

  static defaultProps = {
    photoUrl: CodelitEmptyAvatar,
    story: null,
    favoriteColor: '#3466F2'
  };

  render() {
    return (
      <div className="container">
        <header>
        {!this.props.placeHolder && 
        <div>
          <FontAwesomeIcon icon={faPenToSquare} className="icon fl" onClick={this.props.onEdit} />
          <FontAwesomeIcon icon={faTrashCan} className="icon fr trash" onClick={this.props.onDelete} />
        </div>
        }
          <div className="avatar-container">
            <img
              className="avatar"
              src={this.props.photoUrl}
              alt={this.props.name}
            />
          </div>
          <h2 className="title">{this.props.title}</h2>
          <h1 className={`name ${this.props.onClick ? "link": ""}`} onClick={this.props.onClick}>{this.props.name}</h1>
        </header>
        <div className="body">{this.props.story}</div>

        <footer style={{ backgroundColor: this.props.favoriteColor }}>
          <div className="full-width-flex-box">
            <div className="one-third-flex-box stat">9.0</div>
            <div className="one-third-flex-box stat bordered">9.0</div>
            <div className="one-third-flex-box stat">9.0</div>
          </div>
          <div className="full-width-flex-box">
            <div className="one-third-flex-box">CANDID</div>
            <div className="one-third-flex-box">LEARNING</div>
            <div className="one-third-flex-box">GRIT</div>
          </div>
        </footer>
      </div>
    );
  }
}

export default TeamMember;
