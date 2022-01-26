import React, { useEffect, useState } from 'react'
import { fetchUserData, getAllUsers } from '../api/authenticationService'
import Header from '../component/Header'
import UsersList from '../component/UsersList'
// import { connect } from 'react-redux'
import './Home.css'

const Home = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        getAllUsers().then((res) => {
            if (res.status === 200) {
                setUsers(res.data)
            }
        }).catch(() => {

        })

        fetchUserData().then((res) => {
            setUser(res.data)
        }).catch(() => {

        })
    }, [])

    return (
        <div className='body'>
            <Header />
            {users.length > 0 && (
                <div className='users_list'>
                    <h1 className='display-4'>List of users</h1>
                    <UsersList users={users} user={user} />
                </div>
            )}
        </div>
    )
}

// const mapStateToProps = ({ auth }) => {
//     return {
//         token: auth.token
//     }
// }

// export default connect(mapStateToProps)(Home)
export default Home