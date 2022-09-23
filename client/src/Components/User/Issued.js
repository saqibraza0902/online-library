import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import api from '../../axiosInstance/api'
import { useDispatch, useSelector } from 'react-redux'
import { UserIssued } from '../../Redux/Actions/Actions';
import Sidebar from './Sidebar';
import JWTdecode from 'jwt-decode';
import swal from 'sweetalert';

const Issued = () => {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false)
    const IssuedBooks = useSelector(state => state.borrow.userIssued)
    const token = localStorage.getItem('token')
    const decode = JWTdecode(token)
    const user = decode.user?._id


    useEffect(() => {
        const gettingBooks = async () => {
            try {
                const { data } = await api.post('/borrow/user/borrow', { user }, {
                    headers: {
                        'Authorization': token
                    }
                })
                dispatch(UserIssued(data))
            } catch (error) {
                swal("Success", `${error} You need to Login Again`, {
                    timer: 3000,
                })
            }
        }
        gettingBooks()
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
                            <li className='text-muted'> View Issued Books</li>
                        </div>
                    </div>


                    <div className='table-responsive table-styling'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Auther</th>
                                    <th scope="col">Issue Date</th>
                                    <th scope="col">Due Date</th>
                                    <th scope='col'>ISBN</th>

                                </tr>
                            </thead>
                            <tbody>
                                {IssuedBooks?.filter(({ status, returned }) => status === 'Approved' && returned === false)
                                    .map((mybook) => (
                                        <tr key={mybook._id}>
                                            <td>{mybook.user.firstname}</td>
                                            <td>{mybook.book.title}</td>
                                            <td>{mybook.book.auther}</td>
                                            <td>{mybook.issueDate}</td>
                                            <td>{mybook.dueDate}</td>
                                            <td>{mybook.book.isbn}</td>
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

export default Issued