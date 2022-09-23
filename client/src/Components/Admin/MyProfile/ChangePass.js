import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import swal from 'sweetalert'
import Sidebar from '../Sidebar'
import api from '../../../axiosInstance/api'
import jwtDecode from 'jwt-decode'


const ChangePass = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reperateNewPassword, setRepeatNewPassword] = useState('')
    const [toggle, setToggle] = useState(false)
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const id = decode?.user?._id

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newPassword !== reperateNewPassword) {
                swal('Error', 'Password and Confirm Password Should be same', { timer: 2000 })
            } else {
                const { data } = await api.patch(`/user/updatepwd/${id}`, { oldPassword, newPassword }, {
                    headers: {
                        'Authorization': token
                    }
                })
                setNewPassword('')
                setOldPassword('')
                setRepeatNewPassword('')
                swal("Success", `You need to Login Again ${data.message}`, {
                    timer: 2000,
                }).then(() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('role')
                    window.location.href = '/login'
                })
            }

        } catch (error) {
            if (error.response.status === 400) {
                swal('Error', error.response.data.message, { timer: 2000 })
            }
            swal('Error', error, { timer: 2000 })
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setToggle(true)
        }, 500);
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


                    <div className='d-flex justify-content-center align-items-center col-md-12 update-password-bg'  >
                        <form onSubmit={(e) => handleSubmit(e)} className='update-password-form'>
                            <input type='password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='Old Password' />
                            <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Password' />
                            <input type='password' value={reperateNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} placeholder='Confirm New Password' />
                            <div className='d-grid'>
                                <button type='submit'>Reset Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ChangePass