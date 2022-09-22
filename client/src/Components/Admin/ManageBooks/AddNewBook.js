import React, { useEffect, useState } from 'react'
import api from '../../../axiosInstance/api'
import Navbar from '../Navbar'
import { toast, ToastContainer } from 'react-toastify'
import Sidebar from '../Sidebar'

const AddNewBook = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('')
    const [auther, setAuther] = useState('')
    const [copies, setCopies] = useState('');
    const [publication, setPublication] = useState('')
    const [isbn, setISBN] = useState('')
    const [status, setStatus] = useState('')
    const [year, setYear] = useState('')
    const [toggle, setToggle] = useState(false)
    const token = localStorage.getItem('token')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apidata = {
                title, category, auther, copies, publication, isbn, status, year
            }
            const { data } = await api.post('/book/post', apidata, {
                headers: {
                    'Authorization': token
                }
            })
            setTitle(''); setCategory(''); setAuther(''); setCopies(''); setPublication('')
            setISBN(''); setStatus(''); setYear('');
            toast(data.message)
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
    useEffect(() => {
        setTimeout(() => {
            setToggle(true)
        }, 500);
    }, [])
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
                            <span>Home </span>
                            <li className='text-muted small-text'>Add Book</li>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center col-md-12 book-add-bg">
                        <form onSubmit={(e) => handleSubmit(e)} className='book-add-form'>
                            <input type='text' className='form-control shadow-none' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Book Title' />
                            <input type='text' className='form-control shadow-none' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Book Category' />
                            <input type='text' className='form-control shadow-none' value={auther} onChange={(e) => setAuther(e.target.value)} placeholder='Book Auther' />
                            <input type='number' className='form-control shadow-none' value={copies} onChange={(e) => setCopies(e.target.value)} placeholder='Book Copies' />
                            <input type='text' className='form-control shadow-none' value={publication} onChange={(e) => setPublication(e.target.value)} placeholder='Publication' />
                            <input type='number' className='form-control shadow-none' value={isbn} onChange={(e) => setISBN(e.target.value)} placeholder='ISBN' />
                            <input type='number' className='form-control shadow-none' value={year} onChange={(e) => setYear(e.target.value)} placeholder='CopyRight Year' />
                            <select defaultValue={'Default'} className='form-control shadow-none' onChange={(e) => setStatus(e.target.value)}>
                                <option value='Default' disabled>Book status</option>
                                <option value='Old'>Old</option>
                                <option value='New'>New</option>
                            </select>
                            <div className='d-grid mt-2'>
                                <button type='submit' className='btn btn-secondary shadow-none'>Add Book</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
    )
}

export default AddNewBook