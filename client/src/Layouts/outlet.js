import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Header from "../components/Header/Header"
import React from "react";

export default function NavBarLayout() {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch(); // to dispatch login state
    return (
        <div>
            <Header />
            <Outlet/>
        </div>
    )

}