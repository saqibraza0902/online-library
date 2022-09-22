import React, { useEffect, useState } from 'react'
import Header from './Header'
import api from '../axiosInstance/api'
import swal from 'sweetalert'
import Modal from 'react-bootstrap/Modal'
import { ToastContainer, toast } from 'react-toastify'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'


const Login = () => {
    const [regFName, setRegFName] = useState('');
    const [regLName, setRegLName] = useState('');
    const [regEmail, setRegEmail] = useState('')
    const [regPhone, setRegPhone] = useState('');
    const [regPass, setRegPass] = useState('')
    const [cRegPass, setCRegPass] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [code1, setCode1] = useState()
    const [code2, setCode2] = useState()
    const [code3, setCode3] = useState()
    const [code4, setCode4] = useState()
    const [user, setUser] = useState(null)
    const [modal, setModal] = useState(false)
    const [addclass, setAddClass] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const Login = {
                email, password
            }
            const { data } = await api.post('/user/login/otp', Login)
            if (data.id === null) {
                swal("Error", data.message, {
                    timer: 1200,
                })
            } else {
                setUser(data.id)
                setModal(true)

            }
        } catch (error) {
            swal("Error", error.response.data.message, {
                timer: 1000,
            })
        }
    }
    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            if (regPass === cRegPass) {
                const SignUpData = {
                    firstname: regFName,
                    lastname: regLName,
                    email: regEmail,
                    phone: regPhone,
                    role: 0,
                    password: regPass
                }
                const { data } = await api.post('/user/send/otp', SignUpData)
                setRegFName(''); setRegLName(''); setRegEmail(''); setRegPhone('')
                setRegPass(''); setCRegPass('');
                toast(data.message)
            } else {
                toast('Password and Confirm Password Should be Same')
            }
        } catch (error) {
            swal("Error", error.response.data.message, {
                timer: 1000,
            })
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const code = code1 + code2 + code3 + code4
        console.log(code)
        try {
            const { data } = await api.post('/user/login/verify', { user, code })
            setModal(false)
            setCode1(''); setCode2(''); setCode3(''); setCode4('')
            setUser()
            console.log(data)
            swal("Success", data.message, {
                timer: 1000,
            }).then(() => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('role', data.role)
                window.location.href = `/${data.role}/dashboard`
            })
        } catch (error) {
            swal("Error", error.response.data.message, {
                timer: 1000,
            })
        }
    }
    useEffect(() => {
        const role = localStorage.getItem('role')
        const token = localStorage.getItem('token')

        if (token !== null && role) {

            swal("Failed", 'Already Login', {
                timer: 1000,
            }).then(() => {
                window.location.href = `/${role}/dashboard`
            })

        }
    }, [])
    const handleHide = () => {
        setShow(false)
    }
    const handleShow = () => {
        setShow(true)
    }
    const handleClass = () => {
        setAddClass(true)
    }
    const handleSignUpbutton = () => {
        handleClass()
        handleShow()
    }
    const handleSigninButton = () => {
        handleHide()
        handleClass()
    }
    const handleChange = (element, index) => {

        //Focus next input
        if (element.id === 'first') {
            setCode1(element.value)
        } else if (element.id === 'second') {
            setCode2(element.value)
        } else if (element.id === 'third') {
            setCode3(element.value)
        } else if (element.id === 'forth') {
            setCode4(element.value)
            console.log(element.nextSibling)
        }
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
    return (
        <div>
            <div className='header'>
                <Header />
            </div>
            {show === true ?
                <div className='signup-div'>

                    <div className={addclass ? 'col-md-6 col-sm-12 sign-up slide4' : 'col-md-6 col-sm-12 sign-up'}>
                        <div className='top-signup-content'>
                            <h3>Sign Up</h3>
                            <span><i type='button'><FaFacebookF /></i><i type='button'><FaTwitter /></i></span>
                        </div>
                        <form onSubmit={(e) => handleSignUp(e)} className='signup-form'>
                            <label>Firstname</label>
                            <input type='text' placeholder='Firstname' value={regFName} onChange={(e) => setRegFName(e.target.value)} />
                            <label>Lastname</label>
                            <input type='text' placeholder='Lastname' value={regLName} onChange={(e) => setRegLName(e.target.value)} />
                            <label>Phone</label>
                            <input type='number' placeholder='Phone' value={regPhone} onChange={(e) => setRegPhone(e.target.value)} />
                            <label>Email</label>
                            <input type='email' placeholder='Email' value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
                            <label>Password</label>
                            <input type='password' placeholder='Password' value={regPass} onChange={(e) => setRegPass(e.target.value)} />
                            <label>Confirm Password</label>
                            <input type='password' placeholder='Confirm Password' value={cRegPass} onChange={(e) => setCRegPass(e.target.value)} />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className={addclass ? 'col-md-6 col-sm-12  welcome-div slide3' : 'col-md-6 col-sm-12  welcome-div'}>
                        <h2>Welcome to Sign Up</h2>
                        <p className='text-white'>Already have account</p>
                        <span type='button' onClick={() => handleSigninButton()}>Sign In</span>
                    </div>

                </div>
                :
                <div className='login-div'>
                    <div className={addclass === true ? 'col-md-6 col-sm-12 order-1 sign-in slide1' : 'col-md-6 col-sm-12 order-1 sign-in'}>
                        <div className='top-content'>
                            <h3>Sign In</h3>
                            <span><i type='button'><FaFacebookF /></i><i type='button'><FaTwitter /></i></span>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)} className='signin-form'>
                            <label>Email</label>
                            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>Password</label>
                            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button>Login</button>
                        </form>
                        <div className='form-footer'>
                            <div>
                                <input type='checkbox' />
                                <label className='ms-2'>Remember Me</label>
                            </div>
                            <span>Forget Password</span>
                        </div>
                    </div>
                    <div className={addclass === true ? 'col-md-6 col-sm-12 order-2 wel-div slide2' : 'col-md-6 col-sm-12 order-2 wel-div'}>
                        <h2>Welcome to login</h2>
                        <p className='text-white'>Don't you have account</p>
                        <span type='button' onClick={() => handleSignUpbutton()}>Sign Up</span>
                    </div>
                </div>


            }
            <Modal show={modal} onHide={() => setModal(false)} centered aria-labelledby="example-modal-sizes-title-lg">
                <form onSubmit={(e) => handleLogin(e)}>
                    <Modal.Body scrollable='true'>
                        <div className="container ">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div class="container height-100 d-flex justify-content-center align-items-center">
                                        <div class="position-relative">
                                            <div class="card p-2 text-center">
                                                <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2">
                                                    <input value={code1} onChange={(e) => handleChange(e.target)} class="m-3 text-center shadow-none form-control rounded" type="text" id="first" maxlength="1" />
                                                    <input value={code2} onChange={(e) => handleChange(e.target)} class="m-3 text-center shadow-none form-control rounded" type="text" id="second" maxlength="1" />
                                                    <input value={code3} onChange={(e) => handleChange(e.target)} class="m-3 text-center shadow-none form-control rounded" type="text" id="third" maxlength="1" />
                                                    <input value={code4} onChange={(e) => handleChange(e.target)} class="m-3 text-center shadow-none form-control rounded" type="text" id="forth" maxlength="1" />
                                                </div>
                                                <div class="mt-4">
                                                    <button class="btn btn-danger px-4 validate">Validate</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </form>
            </Modal>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    )
}

export default Login