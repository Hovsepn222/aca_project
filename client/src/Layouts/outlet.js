import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React from "react";

export default function NavBarLayout() {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch(); // to dispatch login state
    return (
        <div>
            {/* <p>{user ? 'Login': 'Logout'}</p> */}
            <Outlet/>
        </div>
    )

}