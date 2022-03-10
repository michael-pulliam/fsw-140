import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'

const initInputs = {
  title: "",
  comment: ""
}

export default function CommentForm(){
  const [inputs, setInputs] = useState(initInputs)
  const  {addComment}  = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addComment(inputs)
    setInputs(initInputs)
  }

  const { title, comment } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"/>
      <input 
        type="text" 
        name="comment" 
        value={comment} 
        onChange={handleChange} 
        placeholder="Comment"/>
      <button>Add Comment</button>
    </form>
  )
}