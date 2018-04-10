import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.user) {
      case null:
        return;
      case false:
        return (
          <a className="nav-item" href="/auth/google">Login With Google</a>
        );
      default:
        return (
          <a className="nav-item" href="/api/logout">Logout</a>
        );
    }
  }

  render() {
    return (
      <div className="header">
        <Link to={this.props.user ? '/home' : '/'} className="nav-item logo">
          News App
        </Link>
        <div className="nav-right">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Header);
