import React, { useEffect, useState } from 'react'
import api from '../../axiosInstance/api'
import Navbar from './Navbar'
import JWTdecode from 'jwt-decode'
import Sidebar from './Sidebar'
import { ToastContainer, toast } from 'react-toastify'

const Borrow = () => {
    const [books, setBooks] = useState([])
    const [bookValue, setBookValue] = useState('all')
    const [bookStatus, setBookStatus] = useState('all')
    const [search, setSearch] = useState("");
    const [book, setBook] = useState()
    const [message, setMessage] = useState('')
    const [toggle, setToggle] = useState(false)

    const token = localStorage.getItem('token')
    const decode = JWTdecode(token)
    const user = decode.user?._id

    const uniqueObjects = [...new Map(books?.map(item => [item.category, item])).values()]
    const uniqueStatus = [...new Map(books?.map(item => [item.auther, item])).values()]
    useEffect(() => {
        const gettingBooks = async () => {
            const { data } = await api.get('/book/all/books', {
                headers: {
                    'Authorization': token
                }
            })
            setBooks(data)
        }
        gettingBooks()
        setTimeout(() => {
            setToggle(true)
        }, 100);
    }, [token])
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await api.post('/borrow/post', { book, user, message }, {
                headers: {
                    'Authorization': token
                }
            })

            setBook()
            setMessage('')
            toast(data.message)
        } catch (error) {
            toast(error.response.data.message)
        }
        e.target.reset()
    }
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
                        <div className='container'>
                            <div className='row d-flex'>

                                <div className='d-md-flex justify-content-between'>
                                    <div>
                                        <span className='password-row'>Dashboard </span>
                                        <span className='text-muted password-control'>Control Panal</span>
                                    </div>
                                    <div className='right-content'>
                                        <i className="bi bi-speedometer2 text-muted"></i>
                                        <span>Home </span>
                                        <li className='text-muted'> Request a Book</li>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='col-md-9 table-responsive borrow-table table-styling'>
                            <table className="table table-striped ">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Auther</th>
                                        <th scope='col'>Category</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">ISBN</th>
                                        <th scope='col'>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {books?.filter(({ del }) => del === false).filter((a) => {
                                        return bookValue === 'all' || a.category === bookValue
                                    }).filter((a) => {
                                        return bookStatus === 'all' || a.auther === bookStatus
                                    }).filter((val) => {
                                        if (search === '') {
                                            return val
                                        } else if (
                                            val.title.toLowerCase().includes(search.toLowerCase()) ||
                                            val.category.toLowerCase().includes(search.toLowerCase()) ||
                                            val.auther.toLowerCase().includes(search.toLowerCase()) ||
                                            val.status.toLowerCase().includes(search.toLowerCase()) ||
                                            val.isbn.includes(search)
                                        ) {
                                            return val;
                                        }
                                        return null
                                    }).map((mybook) => (
                                        <tr key={mybook._id}>
                                            <td>{mybook.title}</td>
                                            <td>{mybook.auther}</td>
                                            <td>{mybook.category}</td>
                                            <td>{mybook.status}</td>
                                            <td>{mybook.isbn}</td>
                                            <td>
                                                <input type='radio' checked={book === mybook._id} value={book} name='abc' onChange={() => setBook(mybook._id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='col-md-3 search-book'>

                            <div >
                                <select className="form-select bg-none  shadow-none" onChange={(e) => setBookValue(e.target.value)}>
                                    <option value='all'>All Books</option>
                                    {uniqueObjects.map(({ category }) => (
                                        <option key={category.id} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className=' justify-content-center w-auto' >
                                <select className="form-select bg-none shadow-none" onChange={(e) => setBookStatus(e.target.value)}>
                                    <option value='all'>All Authers</option>
                                    {uniqueStatus.map(({ auther }) => (
                                        <option key={auther.id} value={auther}>{auther}</option>
                                    ))}
                                </select>
                            </div>
                            <div className=' justify-content-center' >
                                <input type="search" className='form-control shadow-none' placeholder="Search Books..." onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <input type='text' className='form-control shadow-none' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter your messgae' />
                                <div className='d-flex justify-content-end pt-2 pb-2 me-1'>
                                    <button className='btn btn-secondary shadow-none' type='submit'>Submit</button>
                                </div>
                            </form>
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
            </div>
        </>

    )
}

export default Borrow