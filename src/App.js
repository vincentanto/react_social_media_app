
import './App.css';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import Newpost from './Newpost';
import Postpage from './Postpage';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import {Link,Routes ,Route, useNavigate} from 'react-router-dom'
import Post from './Post';
import PostLayout from './PostLayout';
import React, { useState,useEffect } from "react";
import {format} from 'date-fns';
import api from './api/posts';
import EditPost from './EditPost';

function App() {
  const [posts,setPost] = useState([])
  const navigate = useNavigate();
  const [search,setSearch]=useState('');
  const [searchPost,setSearhPost]=useState(posts);
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const [editTitle,setEditTitle]=useState('');
  const [editBody,setEditBody]=useState('');
  const [editDate,setEditDate]=useState('');
  const handleSummit = async(e) =>{
    e.preventDefault();
    const id = posts.length ? parseInt(posts[posts.length-1].id)+1 :1;
    const datetime= format(new Date(),'MMMM dd, yyyy pp');
    const newPost ={
      id:id.toString(),
      title:postTitle,
      editted:false,
      lastEdittedTime:"",
      datetime,
      body:postBody
    };
    const response = await api.post('/posts',newPost);
    const allPosts = [...posts,response.data];
    setPost(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
    
  }
  useEffect(()=>{
   const fetchResult = async() =>{
    try{
      const response  = await api.get("/posts");
      setPost( response.data);
      
      setSearhPost(posts.reverse());
   
    
    }
    catch(err){
      if(err.response){
        console.log(err.response.status)
        console.log(err.response.Header)
        
      }
      else{
        console.log(err.message);
      }
    }
   
   }
  fetchResult()
 
  
  },[posts,search])
  const handleDelete =async (id)=>{
    const newArray=posts.filter((post)=> post.id !==id)
    await api.delete(`/posts/${id}`);
    
    setPost(newArray);
    navigate('/');

  }
  const handleEdit = async(id)=>{
  
    
   
   const lastEdittedTime =format(new Date(),'MMMM dd, yyyy pp');
   
    const newPost ={
      id:id.toString(),
      title:editTitle,
      editted:true,
      lastEdittedTime:lastEdittedTime,
      datetime:editDate,
      body:editBody
    };
    const response = await api.put(`/posts/${id}`,newPost);
    setEditBody('');
    setEditTitle('');
    setEditDate('');
    navigate('/');
  }
  return (
    <div className="App">
   
    
      <Header 
      title="AntoVerse"/>
      <Nav
      search={search}
      setSearch={setSearch} />
      <Routes>
      <Route path='/' element={<Home posts={searchPost}/>} />
      <Route path='post'>
      <Route index element={<Newpost 
      handleSummit={handleSummit}
      setPostBody={setPostBody}
      postBody={postBody}
      setPostTitle={setPostTitle}
      postTitle={postTitle}
      
      
       />} />
       <Route path=":id" element={<Postpage posts={posts}
       handleDelete={handleDelete}/>} />
       
      </Route>
      <Route path=':id/editPost' element={<EditPost posts={posts}
       handleEdit={handleEdit} 
       setEditBody={setEditBody}
       setEditTitle={setEditTitle}
       editBody={editBody}
       editTitle={editTitle}
       editDate={editDate}
       setEditDate={setEditDate}
       />}  />
      <Route path='about' element={<About />} />
      <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
