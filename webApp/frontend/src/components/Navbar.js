import React from 'react'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { AiFillExperiment, AiFillStar } from 'react-icons/ai'
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.jpg'
export default function Navbar(props) {
    const navigate = useNavigate()
    const LoadRecents = (e) => {
        document.getElementById("navbarBasicExample").className="navbar-menu"
        navigate("/recents")
    }
    const LoadAll = (e) => {
        e.preventDefault()
        document.getElementById("navbarBasicExample").className="navbar-menu"
        navigate("/")
    }
    return (
        <div>
            <nav className="navbar is-hidden-desktop is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href=".">
                        <img src={logo} alt="" width="70" height="90"/>
                    </a>
                    <b style={{marginTop:"auto",marginBottom:"auto",fontSize:"x-large"}}>JANAK AI</b>
                    <a href="/" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={(e)=>{
                        e.preventDefault()
                        if(document.getElementById("navbarBasicExample").className.includes("is-active"))
                        {
                            document.getElementById("navbarBasicExample").className="navbar-menu"
                        }
                        else{
                            document.getElementById("navbarBasicExample").className="navbar-menu is-active"
                        }
                    }}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="./recents" className="navbar-item" onClick={LoadRecents}>
                            <RxCounterClockwiseClock />Recents
                        </a>
                        <a href="/" className="navbar-item" onClick={LoadAll}>
                            <AiFillExperiment />All Users
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}