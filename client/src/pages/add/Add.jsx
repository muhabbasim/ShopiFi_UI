import React, { useContext, useEffect, useReducer, useState } from 'react'
import './Add.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { gigReducer, INITIAL_STATE } from '../../reducers/gigReducer'
import newRequest from '../../context/newRequest'
import upload from '../../upload/upload'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'



function Add() {

  const { currentUser } = useContext(AuthContext)

  const [ files, setFiles ] = useState([])
  const [ singleFile, setSingleFile ] = useState()
  const [ uploading, setUploading ] = useState(false)

  const [ state, dispatch ] = useReducer(gigReducer, INITIAL_STATE);

  // Access the client
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gig/addgig", gig)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usergig'] })
    },
  })

  // console.log(state)

  // handling inputs
  const handleInputChange = (e) => {

    dispatch({ 
      type: "CHANGE_INPUTS", 
      payload: { name: e.target.name, value: e.target.value },
    })
  }

  // handling upload images
  const handleImage = async (e) => {
    e.preventDefault()
    setUploading(true)
    
    try {

      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map( async (file) => {
          const url = await upload(file)
          return url
        })
      );

      setUploading(false)
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });

    } catch (error) {
      console.log(error)
    } 
  }

  // handling add features
  const handleFeatures = (e) => {
    e.preventDefault()

    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value
    })

    e.target[0].value = ""
  }

  const navigate = useNavigate()
  // handle submit gig
  const handleCreateGig = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate(`/mygigs/${currentUser._id}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='add'>
      <h2>Add New Gig</h2>
      
      <div className="add-container">
        <div className="left flex-column">
          <div className="item flex-column">
            <span>Title</span>
            <input type="text" placeholder='e.g i will do something im really good at'
              name='title' 
              onChange={handleInputChange} 
            />
          </div>

          <div className="item flex-column">
            <span>Categoy</span>
            <select name="cat" id="cat" onChange={handleInputChange}>
              <option value="">-- Select Category --</option>
              <option value="tech">Tech & programming</option>
              <option value="animation">Video & Animation</option>
              <option value="design">Graphics & Design</option>
              <option value="sport">Fitness & Sport</option>
              <option value="photography">Photography</option>
            </select>
          </div>
        
          <form action="" className='add-images flex-column'>
            <div className="input-item flex-column">
              <span>Cover Image</span>
              <input type="file" onChange={(e) => setSingleFile(e.target.files[0])}/>
            </div>
            <div className="input-item flex-column">
              <span>Upload Images</span>
              <input type="file" multiple onChange={(e) => setFiles(e.target.files)}/>
            </div>
            <button type='submit'
              onClick={handleImage}
              >
                { uploading ? "Uploading..." : "Upload"}
              </button>
          </form>

          <div className="item flex-column">
            <span>Description</span>
            <textarea id="" cols="30" rows="10" placeholder='Brief description to introduce your service to customer'
              name='desc' 
              onChange={handleInputChange} 
            ></textarea>
          </div>

          <button onClick={handleCreateGig}>Create</button>
        </div>

        <div className="right flex-column">
          <div className="item flex-column">
            <span>Service Title</span>
            <input type="text" placeholder='e.g i will do something im really good at'
              name='shortTitle' 
              onChange={handleInputChange} 
            />
          </div>

          <div className="item flex-column">
            <span>Short Description</span>
            <textarea id="" cols="30" rows="10" placeholder='Short description fo your service'
              name='shortDesc' 
              onChange={handleInputChange} 
            ></textarea>
          </div>

          <div className="item flex-column">
            <span>Delivery Time (e.g 3 days) </span>
            <input type="text" placeholder=''
              name='delivaryTime' 
              onChange={handleInputChange} 
            />
          </div>

          <div className="item flex-column">
            <span>Revision Number</span>
            <input type="text" placeholder=''
              name='revisionTime' 
              onChange={handleInputChange} 
            />
          </div>

          <div className="item flex-column">
            <span>Add Features</span>
            <form onSubmit={handleFeatures} className='add-features flex'>
              <input type="text" placeholder='e.g page design'
                name='features' 
              />
              <button className='add-feature' type='submit'>Add</button>
            </form>
          </div>

          <div className="feature-list flex">
            { state?.features?.map((f,i) => {
              return (
                <div className="feature flex" key={i}>
                  <span>{f}</span>
                  <span className='close' onClick={() => dispatch({type: "REMOVE_INPUT", payload: f})}>x</span>
                </div>
              )
            })}
          </div>

          <div className="item flex-column">
            <span>Price</span>
            <input type="text" placeholder='$ 0.00'
            name='price' 
            onChange={handleInputChange}/>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Add