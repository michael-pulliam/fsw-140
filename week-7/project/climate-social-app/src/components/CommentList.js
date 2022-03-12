import React, {useContext} from 'react'
import Comment from './Comment.js'
import { UserContext } from '../context/UserProvider.js'
export default function CommentList(){
  const { comment } = useContext(UserContext)
  return (
    <div className="comment-list">
      { comment.map(comment => <Comment {...comment} key={comment._id}/>) }
    </div>
  )
}