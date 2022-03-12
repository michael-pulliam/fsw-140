import React, { useContext } from 'react'
import CommentForm from './CommentForm.js'
import CommentList from './CommentList.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(){
  const { user: { username } } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add A Comment</h3>
      <CommentForm />
      <h3>Your Comment's</h3>
      <CommentList />
    </div>
  )
}