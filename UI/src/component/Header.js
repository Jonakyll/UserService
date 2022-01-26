import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap'
import { fetchUserData } from '../api/authenticationService'

const Header = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        fetchUserData().then((res) => {
            setUser(res.data)
        }).catch(() => {

        })
    }, [])

    const handleLogout = () => {
        localStorage.clear();
        setUser(null)

    }

    const userIsLogged = () => {
        if (user) {
            return (
                <Nav>
                    <NavLink href='/' onClick={handleLogout}>logout</NavLink>
                    <NavLink href='/profile'>{user.userName}</NavLink>
                </Nav>
            )
        } else {
            return (
                <NavLink href='/login'>login</NavLink>
            )
        }
    }

    return (
        <Navbar bg='dark' variant='dark'>
            <Container>
                <NavbarBrand>Navbar</NavbarBrand>
                <Nav className='me-auto'>
                    <NavLink href='/'>Home</NavLink>
                    {userIsLogged()}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header