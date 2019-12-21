import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationsItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            {/* <Logo height="80%" /> */}
            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav className={classes.DesktopOnly}><NavigationItems /></nav>
        </header>
    )
}

export default toolbar
