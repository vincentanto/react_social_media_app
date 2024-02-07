import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
const EditPost = ({editTitle,editBody, posts,handleEdit,setEditBody,setEditTitle,editDate,setEditDate}) => {
    const {id}= useParams();
    const post = posts.find(post => (post.id).toString()=== id);
    const handleSubmit = (e) => {
        e.preventDefault();
        handleEdit(id);
      };
    useEffect(()=>{
        setEditBody(post.body)
        setEditTitle(post.title)
        setEditDate(post.datetime);
    },[])  
    
  return (
    <main className='NewPost'>
    <form className='newPostForm'    onSubmit={handleSubmit}>
     <label htmlFor="postTitle">Title</label>
     <input 
       id="postTitle"
       type="text"
       required
       value={editTitle}
       onChange={(e) => {setEditTitle(e.target.value)}}
       />
       <label htmlFor="postBody">Body</label>
         <textarea 
           id='postBody'
           required
           value={editBody}
           onChange={(e)=>setEditBody(e.target.value)}
           />
       <button type="submit">Submit </button>
     </form></main>
  )
}

export default EditPost