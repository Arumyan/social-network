import React from 'react';
import classes from './Nav.module.scss';

import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className={classes.Nav}>
      <ul className={classes.NavList}>
        <li>
          <NavLink to='/myprofile' activeClassName={classes.active} exact>
            My profile
          </NavLink>
        </li>
        <li>
          <NavLink to='/' activeClassName={classes.active} exact>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/messages' activeClassName={classes.active}>
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink to='/news' activeClassName={classes.active} exact>
            News
          </NavLink>
        </li>
        <li>
          <NavLink to='/settings' activeClassName={classes.active}>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
