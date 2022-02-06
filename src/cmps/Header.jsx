import React from 'react';
import { Link } from 'react-router-dom'
import SpaceXLogo from '../assets/img/SpaceX_Logo.png'

export function Header() {

    return (
        <div className="header">
            <Link to={'/'}>
                <img className="spacex_logo" src={SpaceXLogo} alt="" />
            </Link>
        </div>
    )
}