import jwtDecode from 'jwt-decode';
import React from 'react'
import { ImCross } from 'react-icons/im'
import { FaBars } from 'react-icons/fa'
const Navbar = (props) => {

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        window.location.href = '/login'
    }
    const user = localStorage.getItem('token')
    const decode = jwtDecode(user)
    return (
        <div >
            <nav className="navbar dash-bg" >
                <div className='d-flex'>
                    <span className="navbar-brand text-white ms-4" ><strong onClick={() => props.handleClick()} type='button'>
                        {props.toggle === true ?
                            <>
                                <i className='fs-6 me-2'><FaBars /></i>
                                <span className='fs-6'>User</span>
                            </> :
                            <>
                                <i className='fs-6 me-2'><ImCross /></i>
                                <span className='fs-6'>User</span>
                            </>
                        }
                    </strong></span>
                </div>
                <div className='d-flex dropdown '  type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >
                    <div type='button' >
                        <img style={{ height: '40px', width: '40px' }} className='rounded-circle nav-dp' src='https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' alt='' />
                    </div>
                    <div className="admin-nav-name ">
                        <span className="w-100 ">
                            {decode?.user?.firstname} {decode?.user?.lastname}
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end " aria-labelledby="dropdownMenuButton1">
                            <li className='w-100' onClick={() => handleLogout()}><span class="dropdown-item" >Action</span></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar