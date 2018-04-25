import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    const { user } = this.props;
    if (user === null) {
      return;
    }
    return (
      <div className="nav-right">
        {user && <Link to="/profile" className="nav-item">Your Stories</Link>}
        {user && <a className="nav-item" href="/api/logout">Logout</a>}
        {!user && <a className="nav-item" href="/auth/google">Login With Google</a>}
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        <Link to={this.props.user ? '/home' : '/'} className="nav-item logo">
          News App
        </Link>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Header);
