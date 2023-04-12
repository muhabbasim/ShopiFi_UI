import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import {SlLogin} from 'react-icons/sl'
import PasswordInput from '../../components/password_Input/PasswordInput'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import newRequest from '../../context/newRequest'

function Login() {

  const navigate = useNavigate()

  const initialData = {
    email: "",
    password: "",
  }

  const { login } = useContext(AuthContext)

  const [ formData, setFormData ] = useState(initialData)
  const { email, password } = formData

  const [ error, setError ] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }
  
  const loginUser = async e => {
    e.preventDefault()
    try {
      await login(formData)
      navigate('/')

    } catch (err) {
      setError(err.response.data.message)
      console.log(err)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    
  }, [])

  return (
    <section className='login-auth'>
      <div className='login-page'>
        <div className='center-all' >
          <SlLogin size={25} color="gray"/>
        </div>
        <h1>Login</h1>
        <div className='center-all' style={{marginBottom: 10}}>
          <Link className='link' to="">
            <button className='btn' style={{marginBottom: 10, backgroundColor: "var(--fail)"}}>Login With Google</button>
          </Link>
          <span>or</span>
        </div>

        <form>
          <input required 
            className='email-input'
            type="email" 
            placeholder='Email' 
            name='email' 
            value={email} 
            onChange={handleInputChange}
          />
          <PasswordInput 
            placeholder='Password' 
            name='password' 
            value={password}  
            onChange={handleInputChange}
          />

          <span className='msg'>{error}</span>
          
          <button className='btn login-btn'  
            onClick={loginUser}
          >
            Login
          </button>

          <span>You don't have an account? <Link className='--link' to='/register'>Register</Link></span>
          <Link className='link' to='/'>
            <small>Home</small>
          </Link>
        </form>
      </div>
    </section>
  )
}

export default Login