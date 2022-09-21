import React, { useEffect, useState } from 'react'
import api from '../../axiosInstance/api'
import Navbar from './Navbar'
import JWTdecode from 'jwt-decode'
import { UserBorrow } from '../../Redux/Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './Sidebar'

const Archive = () => {
    const [toggle, setToggle] = useState(false)
    const Books = useSelector((state) => state.borrow.userBorrows)
    const token = localStorage.getItem('token')
    const decode = JWTdecode(token)
    const user = decode.user?._id

    const dispatch = useDispatch()
    useEffect(() => {
        const gettingArchived = async () => {
            const { data } = await api.post('/borrow/user/borrow', { user }, {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(UserBorrow(data))
        }
        gettingArchived()
        setTimeout(() => {
            setToggle(true)
        }, 100);
    }, [dispatch, user, token])
    const handleClick = () => {
        if (toggle === false) {
            setToggle(true)
        } else if (toggle === true) {
            setToggle(false)
        }
    }
    return (
        <>
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
                                <li className='text-muted'> View Archived Books</li>
                            </div>
                        </div>


                        <div className='d-flex justify-content-between table-styling'  >
                            <table className="table table-striped">

                                <thead>
                                    <tr>
                                        <th scope='col'>Name</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Auther</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">ISBN</th>
                                        <th scope='col'>Requested Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Books?.filter(({ status }) => status === 'Pending').map((mybook) => (
                                        <tr key={mybook._id}>
                                            <td>{mybook.user.firstname}</td>
                                            <td>{mybook.book.title}</td>
                                            <td>{mybook.book.auther}</td>
                                            <td>{mybook.book.status}</td>
                                            <td>{mybook.book.isbn}</td>
                                            <td>{mybook.borrowDate}</td>
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

export default Archive