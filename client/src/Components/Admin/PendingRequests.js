import React, { useEffect, useState } from 'react'
import api from '../../axiosInstance/api'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { borrows } from '../../Redux/Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'

const PendingRequests = () => {
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()
    const requestedBooks = useSelector((state) => state.borrow.borrows)
    const token = localStorage.getItem('token');
    useEffect(() => {
        const gettingBorrow = async () => {
            const { data } = await api.get('borrow/all/borrows', {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(borrows(data))
        }
        gettingBorrow()
        setTimeout(() => {
            setToggle(true)
        }, 500);
    }, [dispatch, token])

    const handleApprove = async (mybook) => {
        try {
            const id = mybook?._id
            const book = mybook?.book?._id
            const { data } = await api.patch(`/borrow/approve/${id}`, { book }, {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(borrows(data.borrow))
            swal('Success', data.message, { timer: 2000 })
        } catch (error) {
            swal("Error", error, { timer: 2000 })
        }
    }
    const handleDisapprove = async (id) => {

        try {
            const { data } = await api.delete(`/borrow/delete/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            swal('Danger', data.message, { timer: 2000 })
            dispatch(borrows(data.borrows))
        } catch (error) {
            swal("Error", error, { timer: 2000 })
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
                            <li className='text-muted'>Issue Book</li>
                        </div>
                    </div>
                    <div className='table-responsive table-styling'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Book</th>
                                    <th scope="col">Email</th>
                                    <th scope='col'>ISBN</th>
                                    <th scope='col'>Req Date</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestedBooks?.map((book) =>
                                    <tr key={book._id}>
                                        <td>{book?.user?.firstname} {book?.user?.lastname}</td>
                                        <td>{book?.book?.title}</td>
                                        <td>{book?.user?.email}</td>
                                        <td>{book?.book?.isbn}</td>
                                        <td>{book?.borrowDate}</td>
                                        <td>{book?.status}</td>
                                        <td>
                                            {book.status === 'Pending' ?
                                                <div className='d-flex justify-content-between'>
                                                    <i type='button' className="bi bi-check" onClick={() => handleApprove(book)}></i>
                                                    <i type='button' className="bi bi-x" onClick={() => handleDisapprove(book._id)}></i>
                                                </div>
                                                :
                                                <div className='d-flex justify-content-between'>
                                                    <i type='button' className="bi bi-check" onClick={() => swal('Error', 'Book Already Approved', { timer: 2000 })}></i>
                                                    <i type='button' className="bi bi-x" onClick={() => swal('Error', 'Book Already Approved', { timer: 2000 })}></i>
                                                </div>
                                            }

                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default PendingRequests