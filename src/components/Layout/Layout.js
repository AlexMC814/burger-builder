import React, { Component } from 'react';
import './Layout.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export default class Layout extends Component {
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
        <Toolbar show={this.sideDrawerShowHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className='content'>{this.props.children}</main>
        <footer className='footer'>Footer</footer>
      </div>
    );
  }
}
