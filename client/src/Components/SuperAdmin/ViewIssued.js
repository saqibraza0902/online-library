import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { ToastContainer, toast } from 'react-toastify'
import { borrows } from '../../Redux/Actions/Actions'
import api from '../../axiosInstance/api'

const ViewIssued = (props) => {
    const [toggle, setToggle] = useState(false)
    const token = localStorage.getItem('token')
    const issuedBooks = useSelector((state) => state.borrow.borrows)

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
    }, [dispatch, token])

    const handleReturn = async (book) => {
        try {
            const id = book._id
            const bookId = book.book._id
            const { data } = await api.patch(`/borrow/update/${id}`, { bookId })
            dispatch(borrows(data.borrow))
            toast(data.message)
        } catch (error) {
            console.log(error)
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
                    <div className=' table-styling table-responsive'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Book</th>
                                    <th scope="col">Email</th>
                                    <th scope='col'>ISBN</th>
                                    <th scope='col'>B.Date</th>
                                    <th scope='col'>Returned</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issuedBooks?.filter((book) => book.status === 'Approved').map((book) =>
                                    <tr key={book._id}>
                                        <td>{book?.user?.firstname + book?.user?.lastname}</td>
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
                                                <i type='button' className='bi bi-check2' onClick={() => handleReturn(book)} ></i>
                                            </td> :
                                            <td>
                                                <i type='button' onClick={() => toast('Already Returned')} className='bi bi-check2-all'></i>
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
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
    )
}

export default ViewIssued