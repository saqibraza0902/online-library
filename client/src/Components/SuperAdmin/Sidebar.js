import React from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
const Sidebar = (props) => {
    const user = JSON.stringify(localStorage.getItem('token'))
    const decode = jwtDecode(user)
    console.log(decode)
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
                                <span className="w-100">{decode?.user?.firstname} {decode?.user?.lastname}</span>
                                <div><small>Online</small></div>
                            </div>
                        </div>
                    </span>
                    <li>
                        <Link to='/2/dashboard' className='nav-link admin-side-links'>
                            <i className="bi bi-speedometer2"></i>
                            <span className='li-text'>Dashboard</span>
                        </Link>
                    </li>

                    <li className="nav-link admin-side-links align-middle" href="#profile" data-bs-toggle="collapse">
                        <i className="fa fa-user" aria-hidden="true"></i>
                        <span className=" d-sm-inline li-text">My Profile</span>
                        <ul className="collapse hide nav flex-column " id="profile" data-bs-parent="#menu">
                            <li className="w-100 drop-li">
                                <Link className='text-decoration-none ' to='/2/password'>
                                    <div className='profile-submenu'>
                                        <i className="far fa-circle"></i> <span className=" d-sm-inline">Change Password</span>
                                    </div>
                                </Link>
                                <Link className='text-decoration-none' to='/2/update'>
                                    <div className='profile-submenu mt-2'>
                                        <i className="far fa-circle"></i>  <span className=" d-sm-inline ">Update Details</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-link admin-side-links align-middle" href="#managebook" data-bs-toggle="collapse">
                        <i className="fa fa-book" ></i>
                        <span className=" d-sm-inline li-text">Manage Books</span>
                        <ul className="collapse hide nav flex-column " id="managebook" data-bs-parent="#menu">
                            <li className="w-100 drop-li">
                                <Link className='text-decoration-none ' to='/2/add/book'>
                                    <div className='profile-submenu'>
                                        <i className="far fa-circle"></i> <span className=" d-sm-inline">Add Books</span>
                                    </div>
                                </Link>
                                <Link className=' profile-submenu text-decoration-none' to='/2/view/books'>
                                    <div className='profile-submenu mt-2'>
                                        <i className="far fa-circle"></i>  <span className=" d-sm-inline ">View Books</span>
                                    </div>
                                </Link>
                                <Link className=' profile-submenu text-decoration-none' to='/2/delete/books'>
                                    <div className='profile-submenu mt-2'>
                                        <i className="far fa-circle"></i>  <span className=" d-sm-inline ">Delete Requests</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li >
                        <Link className="nav-link admin-side-links" to='/2/issue/book'>
                            <i className="fa fa-folder-open" aria-hidden="true"></i>
                            <span className='li-text'>Issue Book</span>
                        </Link>
                    </li>

                    <li className="nav-link admin-side-links align-middle" href="#manageusers" data-bs-toggle="collapse">
                        <i className="fas fa-users"></i>
                        <span className=" d-sm-inline li-text">Manage Users</span>
                        <ul className="collapse hide nav flex-column " id="manageusers" data-bs-parent="#menu">
                            <li className="w-100 drop-li">
                                <Link className='text-decoration-none' to='/2/add/user'>
                                    <div className='profile-submenu'>
                                        <i className="far fa-circle"></i> <span className="d-sm-inline">Add User</span>
                                    </div>
                                </Link>
                                <Link className='text-decoration-none' to='/2/view/users'>
                                    <div className='profile-submenu mt-2'>
                                        <i className="far fa-circle"></i>  <span className="d-sm-inline  ">View All Users</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link className="nav-link admin-side-links" to='/2/view/issued'>
                            <i className="fa fa-list"></i>
                            <span className='li-text'>View Issue Books</span>
                        </Link>
                    </li>
                </ul>
            </div >
        </>
    )
}

export default Sidebar