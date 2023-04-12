import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.scss'

import axios from 'axios'
import upload from '../../upload/upload'

import { FcAddImage } from 'react-icons/fc'

export default function Register() {

  const navigate = useNavigate()

  // inputs trigger
  const initialData = {
    username: "",
    email: "",
    password: "",
    country: "",
    isSeller: false,
    phone: "",
    desc: "",
  }

  const [ err, setErr ] = useState()
  const [ formData, setFormData ] = useState(initialData)
  const [ file, setFile ] = useState()
  const { username, email, password, country, desc, phone } = formData
  
  const [ switchPoint, setSwitchPoint ] = useState(false)

  // console.log(formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const handleCheckBox = (e) => {
    setFormData({...formData, isSeller: e.target.checked})
  }

  const registerUser = async (e) => {
    e.preventDefault()

    const url = await upload(file)
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {...formData, img: url})
      console.log(res)
      navigate("/registerdone")
    } catch (error) {
      setErr(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <section className="register-auth">
      <h2>Register</h2>
      
      <div className="add-container">
        <div className="left flex-column">
          <div className="item flex-column">
            <span>Username</span>
            <input required 
              className='inputs'
              type="text" 
              placeholder='Username' 
              name='username' 
              value={username} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="item flex-column">
            <span>Email</span>
            <input required 
              className='inputs'
              type="text" 
              placeholder='Example@gmail.com' 
              name='email' 
              value={email} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="item flex-column">
            <span>password</span>
            <input required 
              className='inputs'
              type="password" 
              placeholder='****' 
              name='password' 
              value={password} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="input-item flex-column">
            <span>Profile Image</span>
            <div className="image-input-container flex">
              <label htmlFor="set-image"><FcAddImage size={40} style={{cursor: "pointer"}}/></label>
              {file && <img src={URL.createObjectURL(file)} alt="" />}
              <input type="file"
                id='set-image'
                style={{display: "none"}}
                name='img'
                onChange={(e)=> setFile(e.target.files[0])}
              />

            </div>
          </div>

          <div className="item flex-column">
            <span>Country</span>
            <input required 
              className='inputs'
              type="text" 
              placeholder='Username' 
              name='country' 
              value={country} 
              onChange={handleInputChange} 
            />
          </div>
          
          <button type='submit' 
            onClick={registerUser}
            >
            Register
          </button>
        </div>

        <div className="right flex-column">
          <h3>I want to become a seller</h3>
          <div className="item flex" >
            <label htmlFor="">Activate the seller account</label>
            <label className={`switch ${switchPoint && "active-bg"}`} 
              id='checked-input'
              onChange={()=> setSwitchPoint(!switchPoint)}
              >
                
              <input id='checked-input' 
                style={{display: "none"}} 
                type="checkbox" 
                onChange={handleCheckBox}
                />
              <div className={`slide_point ${switchPoint && "active_point"}`}
               >
              </div>
            </label>
          </div>
          
          <div className="item flex-column">
            <span>Phone Number</span>
            <input type="text" placeholder='+966 53 4777 2840'
              name="phone" 
              value={phone}
              onChange={handleInputChange} 
            />
          </div>
          <div className="item flex-column">
            <span>Description</span>
            <textarea 
              cols="30" rows="8" 
              placeholder='introduce your service to customer'
              name="desc" 
              value={desc}
              onChange={handleInputChange} 
            />
          </div>
        </div>

      </div>
    </section>
  )
}
