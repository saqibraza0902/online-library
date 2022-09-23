import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import api from '../../axiosInstance/api';
import { useDispatch, useSelector } from 'react-redux';
import { books, users, borrows } from '../../Redux/Actions/Actions';
import { MDBContainer } from 'mdbreact'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
const DashboardSA = () => {
    const [toggle, setToggle] = useState(false)
    const AllBooks = useSelector((state) => state.book.books)
    const AllUsers = useSelector((state) => state.user.users)
    const AllBorrows = useSelector((state) => state.borrow.borrows)
    const filteredBorrow = AllBorrows?.filter(({ status, returned }) => status === 'Approved' && returned === false)
    const filteredUser = AllUsers?.filter(({ status }) => status === 1)
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const handleClick = () => {
        if (toggle === false) {
            setToggle(true)
        } else if (toggle === true) {
            setToggle(false)
        }
    }
    const title = AllBooks.map(({ title }) => title)
    const copies = AllBooks.map(({ copies }) => copies)


    useEffect(() => {
        const gettingBooks = async () => {
            const { data } = await api.get('/book/all/books', {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(books(data))
        }
        gettingBooks()
        const gettingUsers = async () => {
            const { data } = await api.get('/user/all/users', {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(users(data))
        }
        gettingUsers()
        const gettingBorrows = async () => {
            const { data } = await api.get('/borrow/all/borrows', {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(borrows(data))
        }
        gettingBorrows()

        setTimeout(() => {
            setToggle(true)
        }, 500);
    }, [dispatch, token])
    const data = {
        labels: title
        ,
        datasets: [
            {
                label: "Number of Books Left",
                data: copies,
                indexAxis: 'y',
                fill: true,
                backgroundColor: "rgba(6, 156,51, .3)",
                borderColor: "#02b844",
            }
        ]
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
                            <li className='text-muted'>Dashboard</li>
                        </div>
                    </div>
                    <div className='top-boxes'>
                        <div className='box col-lg-3  col-xs-6 rounded'>
                            <div className='d-flex ms-2 justify-content-between'>
                                <h3 className='mt-2 text-white fs-1'>{filteredBorrow?.length}</h3>
                                <i className="bi bi-book book-icon"></i>
                            </div>
                            <span className='ms-2'>Issued Books</span>
                        </div>
                        <div className='user-box col-lg-3 col-xs-6 rounded'>
                            <div className='d-flex ms-2 justify-content-between'>
                                <h3 className='mt-2 text-white fs-1'>{filteredUser?.length}</h3>
                                <i className="bi bi-people user-icon"></i>
                            </div>
                            <span className='ms-2'>Active Users</span>
                        </div>
                        <div className='book-box col-lg-3 col-xs-6 rounded'>
                            <div className='d-flex ms-2 justify-content-between'>
                                <h3 className='mt-2 text-white fs-1'>{AllBooks?.length}</h3>
                                <i className="bi bi-book book-icon-2"></i>
                            </div>
                            <span className='ms-2'>Manage Books</span>
                        </div>
                    </div>
                    <div>
                        <MDBContainer>
                            <Bar data={data} />
                        </MDBContainer>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default DashboardSA