import React, { useEffect, useState } from 'react'
import api from '../../../axiosInstance/api'
import Navbar from '../Navbar'
import swal from 'sweetalert'
import Sidebar from '../Sidebar'
import jwtDecode from 'jwt-decode'

const Update = () => {
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const user = decode?.user
    const [regFName, setRegFName] = useState(user?.firstname);
    const [regLName, setRegLName] = useState(user?.lastname)
    const [regEmail, setRegEmail] = useState(user?.email)
    const [regPhone, setRegPhone] = useState(user?.phone);
    const [toggle, setToggle] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apidata = {
                firstname: regFName,
                lastname: regLName,
                existingEmail: user?.email,
                email: regEmail,
                phone: regPhone,
            }
            const id = user._id
            const { data } = await api.patch(`/user/update/${id}`, apidata, {
                headers: {
                    'Authorization': token
                }
            })
            setRegFName(''); setRegLName(''); setRegEmail(''); setRegPhone('')
            swal("Success", `You need to Login Again ${data.message}`, {
                timer: 2000,
            }).then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('role')
                window.location.href = '/login'
            })
        } catch (error) {
            swal('Error', error.response.data.message, { timer: 2000 })
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
                            <span>Home</span>
                            <li className='text-muted'>Update Details</li>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center col-md-12 update-details-bg">
                        <form onSubmit={(e) => handleSubmit(e)} className='update-details-form'>
                            <input type='text' value={regFName} onChange={(e) => setRegFName(e.target.value)} placeholder='Firstname' />
                            <input type='text' value={regLName} onChange={(e) => setRegLName(e.target.value)} placeholder='Lastname' />
                            <input type='email' value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder='Email' />
                            <input type='number' value={regPhone} onChange={(e) => setRegPhone(e.target.value)} placeholder='Phone' />
                            <div className='d-grid'>
                                <button type='submit'>Update Details</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Update