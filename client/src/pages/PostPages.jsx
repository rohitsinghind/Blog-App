import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { useEffect,useState } from 'react'
import { Button, Spinner } from 'flowbite-react'
import CommentSection from '../components/CommentSection'
import PostCard from '../components/PostCard'

export default function PostPages() {
    const {postSlug} = useParams() 
    const [loading, setloading] = useState(true)
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null)
    const [recentPosts, setRecentPosts] = useState(null)
    const [author, setAuthor] = useState("")
// console.log(post);
useEffect(() => {
//  console.log(postSlug);
const fetchPost  = async() => {
    try {
        setloading(true)
        const res =  await fetch(`/api/post/getposts?slug=${postSlug}`)
        const data= await res.json()
        if (!res.ok) {
          setError(true)
          setloading(false)
          return
        }
        else{
          setPost(data.posts[0])
          setloading(false)
          setError(false)

        }
    } catch (error) {
        setError(true)
        setloading(false)
    }
}
fetchPost()
}, [postSlug])

useEffect(() => {
 try {
  const fetchRecentPosts = async() => {
    const res =  await fetch(`/api/post/getposts?limit=3`)
    const data= await res.json()
    if (res.ok) {
      setRecentPosts(data?.posts)
    }
  }
  fetchRecentPosts()
 } catch (error) {
  console.log(error.message);
 }
}, [])

useEffect(() => {
  const fetchUser  = async() => {
    try {
        const res =  await fetch(`/api/user/${post?.userId}`)
        const data= await res.json()
        if (!res.ok) {
          setError(true)
          return
        }
        else{
          setAuthor(data?.rest)
          setError(false)
        }
    } catch (error) {
        setError(true)
    }
}
if(post)
fetchUser()
}, [post])


console.log(author)

if(loading) return (
  <div className='flex justify-center items-center min-h-screen'>
  <Spinner size='xl'/>
  </div>
)
  return (
   <main className='p-3 flex flex-col  max-w-6xl min-h-screen mx-auto'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
        <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
        <Button color='gray' pill size='xs'>{post && post.category}</Button>
        </Link>
        <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
        <div className='flex justify-between p-3 border-b  border-slate-500 mx-auto w-full max-2xl: text-xs'>
          <span>{post && new Date(post.createdAt).toLocaleDateString()} |  <span className='italic'>
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span></span>
        
                 <div className='flex items-center gap-1 text-gray-500 text-sm'>
                    <p>by:</p>
                    <img className='h-5 w-5  object-cover rounded-full' src={author?.profilePicture} alt="" />
                    <Link to={`/user/${author?._id}`} className='text-sm text-cyan-600 hover:underline'>
                     @{author?.username}
                    </Link>
                </div>
        </div>
        <div  className='p-3 max-w-2xl mx-auto w-full post-content'  dangerouslySetInnerHTML={{__html: post && post.content}}>
        </div>
        <CommentSection postId={post._id}/>

        <div className='flex flex-col justify-center items-center mb-5'>
            <h1 className='text-xl mt-5'>Recent articles</h1>
            <div className='flex flex-row flex-wrap gap-5 mt-5 justify-center'>
      {
        recentPosts &&
            recentPosts.map((post,index) => 
             ( <PostCard key={index} post={post}/>)
            )
      }
            </div>
        </div>
   </main>
  )
}
