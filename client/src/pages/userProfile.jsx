import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { useEffect,useState } from 'react'
import { Spinner } from 'flowbite-react'
import PostCard from '../components/PostCard'

export default function UserProfile() {

    const {id} = useParams() 
    const [loading, setloading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchUser  = async() => {
          try {
            setloading(true)
              const res =  await fetch(`/api/user/${id}`)
              const data= await res.json()
              if (!res.ok) {
                setError(true)
                return
              }
              else{
                setUser(data?.rest)
                setError(false)
                setloading(false)
              }
          } catch (error) {
              setError(true)
              setloading(false)
          }
      }
      const fetchPosts = async() => {
        try {
          const res = await fetch(`/api/post/getposts?userId=${id}`);
          const data = await res.json();
          if (res.ok) {
            setPosts(data.posts);
          }
        } catch (error) {
          console.log(error.message);
        }
       }
      fetchUser()
      fetchPosts()
      }, [id])

      console.log(user)

      if(loading) return (
        <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl'/>
        </div>
      )

  return (
    <div className='p-3 flex flex-col  max-w-6xl min-h-screen mx-auto'>
    <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
    <div className='flex flex-col gap-4'>
      <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
      <img src={user?.profilePicture} alt="user"
       className={`rounded-full w-full h-full object-cover  border-8 border-[lightgray]` } />
      </div>
      <h2 className='font-semibold text-lg text-center'>Username: {user?.username}</h2>
      <h2 className='font-semibold text-lg text-center'>Email: {user?.email}</h2>
    </div>
    <div className='flex flex-col justify-center items-center mb-5'>
            <h1 className='text-xl mt-5'>Recent articles</h1>
            <div className='flex flex-row flex-wrap gap-5 mt-5 justify-center'>
      {
        posts &&
            posts.map((post,index) => 
             ( <PostCard key={index} post={post}/>)
            )
      }
            </div>
        </div>
  </div>
  )
}
