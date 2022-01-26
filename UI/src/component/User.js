import React, { useState } from 'react'
import { Button, ListGroupItem, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { deleteUser, promoteUser } from '../api/authenticationService'
import './User.css'

const User = ({ userData, principalData }) => {
    const [user, setUser] = useState(userData)
    const [show, setShow] = useState(false)

    const handleDeleteUser = () => {
        deleteUser(user.id).then((res) => {
            setUser(null)
            setShow(false)
        }).catch((err) => {
        })
    }

    const handlePromote = () => {
        promoteUser(user.id).then((res) => {
            setUser({ ...user, authorities: [...user.authorities, res.data] })
        }).catch((err) => {

        })
    }

    const openDeleteModal = () => {
        setShow(true)
    }

    const displayButtons = () => {
        return (
            <div>
                <button className='btn btn-success' onClick={handlePromote}>promote to admin</button>
                <button className='btn btn-danger' onClick={openDeleteModal}>delete</button>
            </div>
        )
    }

    const handleClose = () => {
        setShow(false)
    }

    return (
        <div>
            {user && (
                <ListGroupItem key={user.id} className='user_item'>
                    <div>
                        <div className='username'>{user.userName} ({user.authorities.map((role) => role.roleCode).join(', ')})</div>
                        {user.firstName} {user.lastName}
                    </div>

                    {principalData
                        && principalData.userName !== user.userName
                        && user.authorities.filter((role) => role.roleCode === 'ADMIN').length === 0
                        && displayButtons()}
                </ListGroupItem>
            )}

            <Modal show={show} onHide={handleClose} centered>
                <ModalHeader>
                    <ModalTitle>Delete user</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this user?
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>cancel</Button>
                    <Button variant="primary" onClick={handleDeleteUser}>delete</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default User