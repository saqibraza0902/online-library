import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { books } from '../../../Redux/Actions/Actions'
import api from '../../../axiosInstance/api'
import { ToastContainer, toast } from 'react-toastify'
const DeleteRequests = () => {
    const [show, setShow] = useState(false)
    const [toggle, setToggle] = useState(false)
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const bookList = useSelector((state) => state.book.books)

    useEffect(() => {
        const getBooks = async () => {
            const { data } = await api.get('/book/all/books', {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(books(data))
        }
        getBooks()
    }, [dispatch, token])
    const deleteBook = async (id) => {
        try {
            const { data } = await api.delete(`/book/delete/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            toast(data.message)
            dispatch(books(data.book))
        } catch (error) {
            toast(error.response.data.message)
        }
    }
    const handleUpdate = async (id) => {
        try {
            const { data } = await api.patch(`/book/restore/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(books(data.book))
            toast(data.message)
            setShow(false)
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
                            <li className='text-muted'>View Books</li>
                        </div>
                    </div>
                    <div className='table-responsive table-styling'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope='col'>Auther</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Books Left</th>
                                    <th scope='col'>ISBN</th>
                                    <th scope='col'>Date</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookList?.filter(({ del }) => del === true).map((book) => (
                                    <tr key={book._id}>
                                        <td>{book.title}</td>
                                        <td>{book.auther}</td>
                                        <td>{book.category}</td>
                                        <td>{book.copies}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.date}</td>
                                        <td>{book.status}</td>
                                        <td >
                                            <div className='d-flex justify-content-between'>
                                                <i type='button' onClick={() => deleteBook(book._id)} className='bi bi-trash'></i>
                                                <i type='button' onClick={() => handleUpdate(book._id)} className='bi bi-pencil'></i>
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

        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* <form onSubmit={(e) => handleUpdate(e)}>
                    <div className='d-grid justify-content-center'>
                        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type='text' value={auther} onChange={(e) => setAuther(e.target.value)} />
                        <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} />
                        <input type='number' value={isbn} onChange={(e) => setISBN(e.target.value)} />
                        <select className='form-select shadow-none mt-2' value={status} onChange={(e) => setStatus(e.target.value)}>

                            <option value='New'>New</option>
                            <option value='Old'>Old</option>
                        </select>
                    </div>
                    <hr></hr>
                    <div className='mt-3 d-flex justify-content-end'>
                        <button type='reset' onClick={() => setShow(false)} className="btn btn-secondary">Close</button>
                        <button type='submit' className="btn btn-primary ms-3">Save changes</button>
                    </div>
                </form> */}
            </Modal.Body>
        </Modal>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
    )
}

export default DeleteRequests