import jwtDecode from 'jwt-decode';
import React from 'react'
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
                    <span className="navbar-brand text-muted ms-4" ><strong onClick={() => props.handleClick()} type='button'>Super Admin Panal</strong></span>
                </div>
                <div className='d-flex' type='button' onClick={() => handleLogout()}>
                    <div type='button' >
                        <img style={{ height: '40px', width: '40px' }} className='rounded-circle nav-dp' src='https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' alt='' />
                    </div>
                    <div className="admin-nav-name">
                        <span className="w-100">{decode?.user?.firstname}-{decode?.user?.lastname}</span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar