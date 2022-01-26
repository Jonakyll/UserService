import React from 'react'
import { ListGroup } from 'react-bootstrap'
import User from './User'
import './UsersList.css'

const UsersList = ({ users, user }) => {

    return (
        <div>
            <ListGroup className='list-group'>
                {users.length > 0 && users.map((u) => {
                    return (
                        <User
                            key={u.id}
                            userData={u}
                            principalData={user ?
                                user.roles.filter((role) => role.roleCode === 'ADMIN').length > 0 ?
                                    user
                                    : null
                                : null} />
                    )
                })}
            </ListGroup>
        </div>
    )
}

export default UsersList