import React from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
const Sidebar = (props) => {
    const user = localStorage.getItem('token')
    const decode = jwtDecode(user)
    return (
        <>
            <div className={props.toggle === false ? "side-navbar active-nav d-flex justify-content-between flex-wrap flex-column " : "side-navbar  d-flex justify-content-between flex-wrap flex-column "} id="sidebar">
                <ul className="nav flex-column text-white w-100">
                    <span className="nav-link h3 text-white ">
                        <div className="logo d-flex">
                            <img style={{ height: '40px', width: '40px' }} className='rounded-circle'
                                src='https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg'
                                alt='' />
                            <div className='name-status'>
                                <span className="w-100">{decode.user.firstname}</span>
                                <div><small>Online</small></div>
                            </div>
                        </div>
                    </span>
                    <li  >
                        <Link className="nav-link admin-side-links" to='/0/dashboard'>
                            <i className="bi bi-speedometer2"></i>
                            <span className='li-text'>Dashboard</span>
                        </Link>
                    </li>

                    <li  >
                        <Link className="nav-link admin-side-links" to='/0/password'>
                            <i className="fas fa-graduation-cap"></i>
                            <span className='li-text'>Change Password</span>
                        </Link>
                    </li>
                    <li  >
                        <Link className="nav-link admin-side-links" to='/0/issued'>
                            <i className="fa fa-list"></i>
                            <span className='li-text'>Issued Books</span>
                        </Link>
                    </li>
                    <li  >
                        <Link className="nav-link admin-side-links" to='/0/archive'>
                            <i className="fa fa-list"></i>
                            <span className='li-text'>Archived Books</span>
                        </Link>
                    </li>
                    <li  >
                        <Link className="nav-link admin-side-links" to='/0/borrow'>
                            <i className="fa fa-list"></i>
                            <span className='li-text'>Request A Book</span>
                        </Link>
                    </li>
                </ul>
            </div >
        </>
    )
}

export default Sidebar