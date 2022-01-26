import React, { useEffect, useState } from 'react'
import { fetchUserData, updateUser } from '../api/authenticationService'
import Header from '../component/Header'
import './Profile.css'

const Profile = ({ ...props }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        fetchUserData().then((res) => {
            setUser(res.data)
        }).catch(() => {

        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateUser(user).then((res) => {
            props.history.push("/")
        }).catch((err) => {

        })
    }

    const handleChange = (e) => {
        e.persist()
        setUser(u => ({
            ...u,
            [e.target.name]: e.target.value
        }))
    }

    const renderForm = () => {
        if (user) {
            return (
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group form-group'>
                            <label className='col-lg-3 control-label label'>first name:</label>
                            <div className='col-lg-8'>
                                <input className='input-group-text' value={user.firstName} type='text' id='firstName' name='firstName' onChange={handleChange} required />
                            </div>
                        </div>

                        <div className='input-group form-group'>
                            <label className='col-lg-3 control-label label'>last name:</label>
                            <div className='col-lg-8'>
                                <input className='input-group-text' value={user.lastName} type='text' id='lastName' name='lastName' onChange={handleChange} required />
                            </div>
                        </div>

                        <div className='form-group'>
                            <input className='btn float-right login_btn' type='submit' value='save changes' />
                        </div>
                    </form>
                </div>
            )
        }
    }

    return (
        <div className='body'>
            <Header />

            <div className='container'>
                <div className='d-flex justify-content-center'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3>Edit Profile</h3>
                        </div>

                        {renderForm()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile