import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Landing extends Component {
  render() {
    if (this.props.user) {
      return (<Redirect to='/home'/>);
    }
    return (
      <div className="page-title">
        <h1>News App</h1>
        <h4>Get up to date on the biggest stories of today!</h4>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Landing);
