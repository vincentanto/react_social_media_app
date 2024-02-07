import React from "react";
import { Link, useParams } from "react-router-dom";
const Postpage = ({posts,handleDelete})=>{
    const {id}= useParams();
    const post = posts.find(post => (post.id).toString()=== id);
    return (
<main className="PostPage">
    <article className="post">
    {post &&
    <>
    <h2>{post.title}</h2>
    <p className="postDate">{post.datetime}</p>
    {post.editted && <p className="postDat"> Last Edited On {post.lastEdittedTime}</p>}
    <p className="postBody">{post.body}</p>
    <button onClick={() => handleDelete(post.id)} style={{color:'black', backgroundColor:'red'}}>Delete Post</button>
    <Link to={`/${post.id}/editPost`} ><button style={{color:'black',backgroundColor:'yellow'}}>Edit Post</button></Link>

    </>}
    {
        !post &&
        <>
        <h2>Post not Found</h2>
        <p>Well thats disappointing</p>
        <p>visit home !!</p>
        </>
    }   
    </article>
    
</main>
    )
    }

    export default Postpage;