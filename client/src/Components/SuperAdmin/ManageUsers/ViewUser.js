import React, { useEffect, useState } from 'react'
import api from '../../../axiosInstance/api'
import Navbar from '../Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { users } from '../../../Redux/Actions/Actions'
import { toast, ToastContainer } from 'react-toastify'
import Sidebar from '../Sidebar'

const ViewUser = () => {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false)
    const AllUsers = useSelector((state) => state.user.users)
    const token = localStorage.getItem('token')
    useEffect(() => {
        const getUsers = async () => {
            const { data } = await api.get('/user/all/users', {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(users(data))
        }
        getUsers()
        setTimeout(() => {
            setToggle(true)
        }, 500);
    }, [dispatch, token])
    const update = async (id) => {
        try {
            const { data } = await api.patch(`/user/approve/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(users(data.user))
            toast(data.message)
        } catch (error) {
            toast(error.response.data.message)
        }

    }
    const deleteUser = async (id) => {
        try {
            const { data } = await api.delete(`/user/delete/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            toast(data.message)
            dispatch(users(data.user))
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
        <Navbar toggle={toggle} handleClick={() => handleClick()} />
        <Sidebar toggle={toggle} />
        {/* Sidebar ends here */}

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
                            <li className='text-muted'>View Users</li>
                        </div>
                    </div>
                    <div className='table-responsive table-styling '>
                        <table className="table table-striped ">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone No</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Role</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AllUsers?.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.firstname}{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        {user.role === 0 ? <td>User</td> : <>{user.role === 1 ? <td>Admin</td> : <td>Super Admin</td>}</>}
                                        {user.status === 1 ?
                                            <td>Approved</td> :
                                            <td>Not Approved</td>
                                        }
                                        <td>
                                            <div className='d-flex justify-content-between'>
                                                {user.role === 2 ?
                                                    <i type='button' onClick={() => toast('Super admin cannot be deleted')} className='bi bi-trash'></i>
                                                    :
                                                    <i type='button' onClick={() => deleteUser(user._id)} className='bi bi-trash'></i>
                                                }

                                                {user.status === 1 ?
                                                    <i type='button' onClick={() => toast('User Already Approved')} className='bi bi-pencil'></i>
                                                    :
                                                    <i type='button' onClick={() => update(user._id)} className='bi bi-pencil'></i>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </>
    )
}

export default ViewUser