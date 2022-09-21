import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import api from '../../axiosInstance/api'
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert'

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [toggle, setToggle] = useState(false)
    const [reperateNewPassword, setRepeatNewPassword] = useState('')
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const id = decode.user?._id
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword === reperateNewPassword) {
            try {
                const { data } = await api.patch(`/user/updatepwd/${id}`, { oldPassword, newPassword }, {
                    headers: {
                        'Authorization': token
                    }
                })

                setOldPassword('')
                setNewPassword('')
                setRepeatNewPassword('')
                swal("Success", `${data.message} You need to Login Again`, {
                    timer: 3000,
                }).then(() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('role')
                    window.location.href = '/login'
                })
            } catch (error) {
                toast(error.response.data.message)
            }
        } else {
            toast('New Password and Repeat New Password Should be Same')
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setToggle(true)
        }, 100);
    }, [])
    const handleClick = () => {
        if (toggle === false) {
            setToggle(true)
        } else if (toggle === true) {
            setToggle(false)
        }
    }

    return (<>
        <Navbar toggle={toggle} handleClick={() => handleClick()} />
        <Sidebar toggle={toggle} />
        {/* sidebar Ends */}
        <div className={toggle === false ? "my-container active-cont" : "my-container"}>
            <div className='container'>
                <div className='row'>
                    <div className='d-md-flex justify-content-between'>
                        <div>
                            <span className='password-row'>Dashboard </span>
                            <span className='text-muted password-control'>Control Panal</span>
                        </div>
                        <div className='right-content'>
                            <i className="bi bi-speedometer2 text-muted"></i>
                            <span>Home </span>
                            <li className='text-muted'> Reset Password</li>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-center update-password-bg col-md-12 '>
                        <form onSubmit={(e) => handleSubmit(e)} className='update-password-form'>
                            <input type='password' className='form-control shadow-none' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='Old Password' />
                            <input type='password' className='form-control shadow-none' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Password' />
                            <input type='password' className='form-control shadow-none' value={reperateNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} placeholder='Confirm New Password' />
                            <div className='d-grid mt-2'>
                                <button type='submit' className='btn btn-secondary shadow-none'>Reset Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    </>

    )
}

export default UpdatePassword