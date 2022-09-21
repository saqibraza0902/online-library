import React, { useState } from 'react'
import api from '../../../axiosInstance/api'
import Navbar from '../Navbar'
import { toast, ToastContainer } from 'react-toastify'
import Sidebar from '../Sidebar'

const AddUser = () => {
    const [regFName, setRegFName] = useState('');
    const [regLName, setRegLName] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPhone, setRegPhone] = useState('');
    const [regRole, setRegRole] = useState('')
    const [regPass, setRegPass] = useState('')
    const [cRegPass, setCRegPass] = useState('')
    const [toggle, setToggle] = useState(false)
    const token = localStorage.getItem('token')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (regPass === cRegPass) {
                const apidata = {
                    firstname: regFName,
                    lastname: regLName,
                    email: regEmail,
                    phone: regPhone,
                    role: regRole,
                    password: regPass
                }
                const { data } = await api.post(`/user/send/otp`, apidata, {
                    headers: {
                        'Authorization': token
                    }
                })
                setRegFName(''); setRegLName(''); setRegEmail(''); setRegPhone('')
                setRegPass(''); setCRegPass('');
                toast(data.message)
            } else {
                toast('Password and Confirm Password Should be Same')
            }

        } catch (error) {
            toast(error.response.data.message)
        }
    }
    const handleClick = () => {
        if (toggle === false) {
            setToggle(true)
        } else if (toggle === true) {
            setToggle(false)
        }
    }

    return (<>
        <Navbar handleClick={() => handleClick()} />
        <Sidebar toggle={toggle} />
        {/* Sidebar and Navbar ends here */}

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
                            <li className='text-muted'>Add User</li>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center col-md-12 inside-signin-super-admin-bg">
                        <form onSubmit={(e) => handleSubmit(e)} className='inside-signin-super-admin'>
                            <input type='text' className='form-control shadow-none' value={regFName} onChange={(e) => setRegFName(e.target.value)} placeholder='Firstname' />
                            <input type='text' className='form-control shadow-none mt-2' value={regLName} onChange={(e) => setRegLName(e.target.value)} placeholder='Lastname' />
                            <input type='email' className='form-control shadow-none mt-2' value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder='Email' />
                            <input type='number' className='form-control shadow-none mt-2' value={regPhone} onChange={(e) => setRegPhone(e.target.value)} placeholder='Phone' />
                            <input type='password' className='form-control shadow-none mt-2' value={regPass} onChange={(e) => setRegPass(e.target.value)} placeholder='Password' />
                            <input type='password' className='form-control shadow-none mt-2' value={cRegPass} onChange={(e) => setCRegPass(e.target.value)} placeholder='Confirm Password' />
                            <select defaultValue={'Default'} className='form-select shadow-none mt-2' onChange={(e) => setRegRole(e.target.value)}>
                                <option value='Default'></option>
                                <option value='0'>User</option>
                                <option value='1'>Admin</option>
                            </select>
                            <div className='d-flex p-1 pt-3 justify-content-center'>
                                <button type='submit' className='btn btn-primary btn-login w-75'>Create Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
    )
}

export default AddUser