import React from 'react'

const Newpost = ({handleSummit,setPostBody,postBody,setPostTitle,postTitle}) => {
  return (
    <main className='NewPost'>
     <form className='newPostForm' onSubmit={handleSummit}>
      <label htmlFor="postTitle">Title</label>
      <input 
        id="postTitle"
        type="text"
        required
        value={postTitle}
        onChange={(e) => {setPostTitle(e.target.value)}}
        />
        <label htmlFor="postBody">Body</label>
          <textarea 
            id='postBody'
            required
            value={postBody}
            onChange={(e)=>setPostBody(e.target.value)}
            />
        <button type='submit'>Submit </button>
      </form></main>
  )
}

export default Newpost