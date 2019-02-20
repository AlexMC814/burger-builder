import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Layout.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerShowHandler = () => {
    this.setState({
      showSideDrawer: true,
    });
  };

  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  render() {
    return (
      <div className='wrapper'>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          show={this.sideDrawerShowHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className='content'>{this.props.children}</main>
        <footer className='footer'>Footer</footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
