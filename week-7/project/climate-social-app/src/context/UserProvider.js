import React, { useState } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

const userAxios = axios.create()
    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    })


export default function UserProvider(props) {
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {},
         token: localStorage.getItem('token') || "",
         comment: [],
         errMsg: ''
        }
    const [userState, setuserState] = useState(initState)

    function handleAuthErr(errMsg){
        setuserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setuserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
        .then (res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setuserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
            .catch (err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post('/auth/login', credentials)
        .then (res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            getUserComment()
            setuserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
            .catch (err => handleAuthErr(err.response.data.errMsg))
    }
    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setuserState({user: {}, token: "", comment: []})

    }
    function addComment(newComment){
        userAxios.post("/api/comment", newComment)
          .then(res => {
            setuserState(prevState => ({
              ...prevState,
              comment: [...prevState.comment, res.data]
            }))
          })
          .catch(err => console.log(err.response.data.errMsg))
      }

      function getUserComment(){
        userAxios.get("/api/comment/user")
          .then(res => {
            setuserState(prevState => ({
              ...prevState,
              comment: res.data
            }))
          })
          .catch(err => console.log(err.response.data.errMsg))
      }

      function deleteComment(itemId){
          userAxios.delete(`/api/comment/user/${itemId}`)
          .then(res => {
              console.log(res)
            setuserState(prevState => ({
              ...prevState,
              comment: prevState.comment.filter(item => item._id !== itemId)
            }))
          })
          .catch(err => console.log(err.response.data.errMsg))

      }

    return (
        <UserContext.Provider value={ { ...userState, signup, login, logout, addComment, deleteComment, resetAuthErr} }>
            { props.children }
        </UserContext.Provider>
    )
}