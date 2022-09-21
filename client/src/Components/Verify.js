import React from 'react'
import { useParams } from 'react-router-dom';
import api from '../axiosInstance/api';
import swal from 'sweetalert';

const Verify = () => {
    const { token } = useParams();
    console.log(token)
    const tokens = token
    console.log(tokens)
    const verifyUser = async () => {
        const { data } = await api.post('/user/post', { tokens })
        swal("Success", data.message, {
            timer: 2000,
        }).then(() => {
           window.location.href = '/login'
        })
    }

    return (
        <div className='container'>
            <div className=' d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <div>
                    <button className='btn btn-primary' onClick={() => verifyUser()}>Verify</button>
                </div>
            </div>
        </div>
    )
}

export default Verify