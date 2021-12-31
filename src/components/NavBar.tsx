import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button, ListIcon, SquareIcon, UserIcon } from "evergreen-ui";
import './NavBar.css';

function NavBar() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    }

    return <div className="nav">
        <NavLink to='/'>
            <Button iconBefore={<ListIcon/>}
                borderRadius={0}
                appearance={ isActive('/') ? "primary" : undefined }>
                Breeds
            </Button>
        </NavLink>
        <NavLink to='/story'>
            <Button iconBefore={<SquareIcon/>}
                borderRadius={0}
                appearance={ isActive('/story') ? "primary" : undefined }>
                Story
            </Button>
        </NavLink>
        <NavLink to='/collection'>
            <Button iconBefore={<UserIcon/>}
                borderRadius={0}
                appearance={ isActive('/collection') ? "primary" : undefined }>
                Collection
            </Button>
        </NavLink>
    </div>
}

export default NavBar;