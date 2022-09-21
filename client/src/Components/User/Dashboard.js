import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import api from '../../axiosInstance/api'
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux'
import { books } from '../../Redux/Actions/Actions';

const Dashboard = () => {
    const dispatch = useDispatch()
    const AllBooks = useSelector(state => state.book.books)
    const [toggle, setToggle] = useState(false)

    const token = localStorage.getItem('token')
    useEffect(() => {
        const gettingBooks = async () => {
            try {
                const  data  = await api.get('/book/all/books', {
                    headers: {
                        'Authorization': token
                    }
                })
                dispatch(books(data.data))
            } catch (error) {
                console.log(error)
            }
        }
        gettingBooks()
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
                                    <th scope='col'>CPY</th>
                                    <th scope='col'>Publications</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AllBooks?.map((mybook) => (
                                    <tr key={mybook._id}>
                                        <td>{mybook.title}</td>
                                        <td>{mybook.auther}</td>
                                        <td>{mybook.status}</td>
                                        <td>{mybook.isbn}</td>
                                        <td>{mybook.year}</td>
                                        <td>{mybook.publication}</td>
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

export default Dashboard