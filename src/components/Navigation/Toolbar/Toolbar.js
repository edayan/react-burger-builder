import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationsItems';

const toolbar = () => {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            {/* <Logo height="80%" /> */}
            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav><NavigationItems /></nav>
        </header>
    )
}

export default toolbar
