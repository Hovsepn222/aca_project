import React from 'react'
import './Person.css'
import home from './icons/home.png'
import phone from './icons/phone.png'
import gear from './icons/gear.png'
import grid from './icons/grid.png'

export function Person(props) {


    return (
        <div className='body'>
            <header id="header">
                <div className="d-flex flex-column">
                    <div className="profile">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="img-fluid rounded-circle" />
                        <h1 className="text-light"><a href="index.html">Person Name</a></h1>
                    </div>
                    <nav id="navbar" className="nav-menu navbar">
                        <ul>
                            <li>
                                <a href="#home" className="nav-link scrollto">
                                    <img className="bx bx-home" src={home} />
                                    <span className='info'>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="#items" className="nav-link scrollto">
                                    <img className="bx bx-home" src={grid} />
                                    <span className='info'>My Items</span>
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="nav-link scrollto">
                                    <img className="bx bx-home" src={phone} />
                                    <span className='info'>Contact</span>
                                </a>
                            </li>
                            <li>
                                <a href="#settings" className="nav-link scrollto">
                                    <img className="bx bx-home" src={gear} />
                                    <span className='info'>Settings</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}