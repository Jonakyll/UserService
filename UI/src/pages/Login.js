import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';
import './Login.css';
import { userLogin } from '../api/authenticationService';
import { Container, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap'

const LoginPage = ({ loading, error, ...props }) => {

    const [values, setValues] = useState({
        userName: '',
        password: ''
    });

    const [failed, setFailed] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        props.authenticate();
        userLogin(values).then((res) => {
            if (res.status === 200) {
                props.setUser(res.data);
                props.history.push('/');
            }
            else {
                props.loginFailure('Something Wrong!Please Try Again');
            }
        }).catch((err) => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 401:
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        setFailed(true)
                        break;
                    default:
                        props.loginFailure('Something Wrong!Please Try Again');
                }
            }
            else {
                props.loginFailure('Something Wrong!Please Try Again');
            }
        });
    }

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    const handleSignUp = () => {
        props.history.push("/signup")
    }

    return (
        <div className='body'>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <NavbarBrand>Navbar</NavbarBrand>
                    <Nav className='me-auto'>
                        <NavLink href='/'>Home</NavLink>
                    </Nav>
                </Container>
            </Navbar>

            <div className='container'>
                <div className='d-flex justify-content-center'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3>Sign in</h3>
                            <p hidden={!failed}>your username or password must be wrong, try again</p>
                        </div>

                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='input-group form-group'>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text'><i className='fas fa-user'></i></span>
                                    </div>
                                    <input placeholder="username" className="form-control" id="userName" type="text" onChange={handleChange} value={values.userName} name='userName' required />
                                </div>

                                <div className='input-group form-group'>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text'><i className='fas fa-key'></i></span>
                                    </div>
                                    <input placeholder="password" className="form-control" id="password" type="password" onChange={handleChange} value={values.password} name='password' required />
                                </div>

                                <div className='form-group'>
                                    <input className="btn float-right login_btn" type="submit" value="login" />
                                </div>

                                <div className='form-group'>
                                    <button className="btn login_btn" onClick={handleSignUp}>sign up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        loading: auth.loading,
        error: auth.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);