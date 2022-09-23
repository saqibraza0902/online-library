import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { borrows } from '../../Redux/Actions/Actions'
import api from '../../axiosInstance/api'
import swal from 'sweetalert'

const ApprovedRequests = () => {
    const [toggle, setToggle] = useState(false)

    const issuedBooks = useSelector((state) => state.borrow.borrows)
    const token = localStorage.getItem('token');
    const dispatch = useDispatch()
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

    const handleReturn = async (book) => {
        try {
            const id = book._id
            const bookId = book.book._id
            const { data } = await api.patch(`/borrow/update/${id}`, { bookId }, {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(borrows(data.borrow))
            swal('Success', data.message, { timer: 2000 })
            try {
                const { data } = await api.delete(`/borrow/delete/borrow/${id}`, {
                    headers: {
                        'Authorization': token
                    }
                })
                console.log(data)
            } catch (error) {
                swal("Error", error, { timer: 2000 })
            }
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
                            <li className='text-muted'>View Issued Books</li>
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
                                    <th scope='col'>B Date</th>
                                    <th scope='col'>Returned</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issuedBooks?.filter((book) => book.status === 'Approved').map((book) =>
                                    <tr key={book._id}>
                                        <td>{book?.user?.firstname} {book?.user?.lastname}</td>
                                        <td>{book?.book?.title}</td>
                                        <td>{book?.user?.email}</td>
                                        <td>{book?.book?.isbn}</td>
                                        <td>{book?.issueDate}</td>
                                        {book?.returned === false ?
                                            <td>Not Returned</td> :
                                            <td>Returned</td>
                                        }
                                        {book?.returned === false ?
                                            <td>
                                                <i type='button' onClick={() => handleReturn(book)} className='bi bi-check2'></i>
                                            </td> :
                                            <td>
                                                <i type='button' onClick={() => swal('Error', 'Already Returned', { timer: 2000 })} className='bi bi-check2-all'></i>
                                            </td>
                                        }
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

export default ApprovedRequests