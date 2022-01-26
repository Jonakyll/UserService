import React, { useState } from 'react'
import { saveUser } from '../api/authenticationService'
import Header from '../component/Header'
import './SignUp.css'

const SignUp = (props) => {
    const [values, setValues] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        password: ''
    })

    const handleChange = (e) => {
        e.persist()
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        saveUser(values).then((res) => {
            props.history.goBack()
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='body'>
            <Header />

            <div className='container'>
                <div className='d-flex justify-content-center'>

                    <div className='card'>
                        <div className='card-header'>
                            <h3>Sign Up</h3>
                            <p>Please fill in this form to create an account!</p>
                        </div>

                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <div className='row'>
                                        <div className='col'>
                                            <input id="firstName" className='form-control' type="text" onChange={handleChange} value={values.firstName} name='firstName' required placeholder='first name' />
                                        </div>
                                        <div className='col'>
                                            <input id="lastName" className='form-control' type="text" onChange={handleChange} value={values.lastName} name='lastName' required placeholder='last name' />
                                        </div>
                                    </div>
                                </div>

                                <div className='input-group form-group'>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text'>
                                            <i className='fa fa-user' />
                                        </span>
                                    </div>
                                    <input id="userName" className='form-control' type="text" onChange={handleChange} value={values.userName} name='userName' required placeholder='username' />
                                </div>

                                <div className='input-group form-group'>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text'>
                                            <i className='fas fa-lock' />
                                        </span>
                                    </div>
                                    <input id="password" className='form-control' type="password" onChange={handleChange} value={values.password} name='password' required placeholder='password' />
                                </div>

                                <div className='form-group '>
                                    <button className='btn float-right login_btn' type='submit'>sign up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp