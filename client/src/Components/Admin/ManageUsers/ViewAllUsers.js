import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { users } from '../../../Redux/Actions/Actions'
import api from '../../../axiosInstance/api'
const ViewAllUsers = () => {
    const [toggle, setToggle] = useState(false)
    const AllUsers = useSelector((state) => state.user.users)
    const dispatch = useDispatch()
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

    const handleClick = () => {
        if (toggle === false) {
            setToggle(true)
        } else if (toggle === true) {
            setToggle(false)
        }
    }
    return (<>
        <Navbar toggle={toggle}  handleClick={() => handleClick()} />
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
                            <li className='text-muted'> Book list for user</li>
                        </div>
                    </div>


                    <div className='table-responsive table-styling' >
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Role</th>
                                    <th scope='col'>Email</th>

                                </tr>
                            </thead>
                            <tbody>
                                {AllUsers?.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.firstname} {user.lastname}</td>
                                        <td>{user.phone}</td>
                                        {user.status === 1 ? <td>Authorized</td> : <td>Unauthorize</td>}
                                        {user.role === 0 ? <td>User</td> : <>{user.role === 1 ? <td>Admin</td> : <td>Super Admin</td>}</>}
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ViewAllUsers