import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import api from '../../../axiosInstance/api';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux'
import { books } from '../../../Redux/Actions/Actions';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-bootstrap'

const ViewAdminBooks = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('')
    const [auther, setAuther] = useState('')
    const [category, setCategory] = useState('')
    const [isbn, setISBN] = useState('')
    const [Id, setID] = useState('')
    const [existingISBN, setExistingISBN] = useState('')
    const [status, setStatus] = useState('')
    const dispatch = useDispatch()
    const AllBooks = useSelector(state => state.book.books)
    const [toggle, setToggle] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        const gettingBooks = async () => {
            try {
                const { data } = await api.get('/book/all/books', {
                    headers: {
                        'Authorization': token
                    }
                })
                dispatch(books(data))
            } catch (error) {
                console.log(error)
            }

        }
        gettingBooks()

        setTimeout(() => {
            setToggle(true)
        }, 500);
    }, [dispatch, token])
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const apiData = {
                title,
                auther,
                category,
                isbn,
                existingISBN,
                status
            }
            const { data } = await api.patch(`/book/update/${Id}`, apiData, {
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
    const updating = (book) => {
        setShow(true)
        setTitle(book.title)
        setAuther(book.auther)
        setCategory(book.category)
        setExistingISBN(book.isbn)
        setISBN(book.isbn)
        setStatus(book.status)
        setID(book._id)
    }
    const deleteRequest = async (id) => {
        try {
            const { data } = await api.patch(`/book/delete/request/${id}`)
            toast(data.message)
            dispatch(books(data.book))
        } catch (error) {
            if (error.response.status === 400) {
                toast(error.response.data.message)
            }
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
                            <li className='text-muted'> Book list for user</li>
                        </div>
                    </div>


                    <div className='table-responsive table-styling' >
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Auther</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">ISBN</th>
                                    <th scope='col'>Books Left</th>
                                    <th scope='col'>CPY</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AllBooks?.filter(({ del }) => del === false).map((mybook) => (
                                    <tr key={mybook._id}>
                                        <td>{mybook.title}</td>
                                        <td>{mybook.auther}</td>
                                        <td>{mybook.status}</td>
                                        <td>{mybook.isbn}</td>
                                        <td>{mybook.copies}</td>
                                        <td>{mybook.year}</td>
                                        <td >
                                            <div className='d-flex justify-content-between'>
                                                <i type='button' className='bi bi-trash' onClick={() => deleteRequest(mybook._id)}></i>
                                                <i type='button' className='bi bi-pencil ' onClick={() => updating(mybook)}></i>
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
                <form onSubmit={(e) => handleUpdate(e)}>
                    <div className='d-grid justify-content-center'>
                        <input type='text' className='form-control shadow-none' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type='text' className='form-control shadow-none mt-2' value={auther} onChange={(e) => setAuther(e.target.value)} />
                        <input type='text' className='form-control shadow-none mt-2' value={category} onChange={(e) => setCategory(e.target.value)} />
                        <input type='number' className='form-control shadow-none mt-2' value={isbn} onChange={(e) => setISBN(e.target.value)} />
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
                </form>
            </Modal.Body>
        </Modal>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>

    )
}

export default ViewAdminBooks