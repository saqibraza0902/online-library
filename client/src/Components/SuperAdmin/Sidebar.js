import React from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
const Sidebar = (props) => {
    const user = JSON.stringify(localStorage.getItem('token'))
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
                                <span className="w-100">{decode?.user?.firstname}</span>
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
                                <ul className='sub-ul'>
                                    <li>
                                        <Link className='text-decoration-none m-2' style={{ color: '#B8C7CE' }} to='/2/password'>
                                            <span>Change Password</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='text-decoration-none m-2' style={{ color: '#B8C7CE' }} to='/2/update'>
                                            <span>Update Details</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-link admin-side-links align-middle" href="#managebook" data-bs-toggle="collapse">
                        <i className="fa fa-book" ></i>
                        <span className=" d-sm-inline li-text">Manage Books</span>
                        <ul className="collapse hide nav flex-column " id="managebook" data-bs-parent="#menu">
                            <li className="w-100 drop-li">
                                <ul className='sub-ul'>
                                    <li>
                                        <Link className='text-decoration-none m-2' style={{ color: '#B8C7CE' }} to='/2/add/book'>
                                            <span>Add Books</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='text-decoration-none m-2' style={{ color: '#B8C7CE' }} to='/2/view/books'>
                                            <span>View Books</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='text-decoration-none m-2' style={{ color: '#B8C7CE' }} to='/2/delete/books'>
                                            <span>Delete Requests</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>



                    <li className="nav-link admin-side-links align-middle" href="#manageusers" data-bs-toggle="collapse">
                        <i className="fas fa-users"></i>
                        <span className=" d-sm-inline li-text">Manage Users</span>
                        <ul className="collapse hide nav flex-column " id="manageusers" data-bs-parent="#menu">
                            <li className="w-100 drop-li">
                                <ul className='sub-ul'>
                                    <li>
                                        <Link className='text-decoration-none m-2' style={{ color: '#B8C7CE' }} to='/2/view/users'>
                                            <span>View Users</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='text-decoration-none m-2' style={{ color: '#B8C7CE' }} to='/2/add/user'>
                                            <span>Add User</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link className="nav-link admin-side-links" to='/2/issue/book'>
                            <i className="fa fa-folder-open" aria-hidden="true"></i>
                            <span className='li-text'>Issue Book</span>
                        </Link>
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