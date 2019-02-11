import React from 'react';
import './SideDrawer.scss';

import Logo from '../../Logo/Logo';
import NavItems from '../../Navigation/NavItems/NavItems';
import BackDrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
  let classes = ['side-drawer', 'close'];
  if (props.open) {
    classes = ['side-drawer', 'open'];
  }
  return (
    <React.Fragment>
      <BackDrop show={props.open} hide={props.closed} />
      <div className={classes.join(' ')}>
        <div className='side-drawer__logo'>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
