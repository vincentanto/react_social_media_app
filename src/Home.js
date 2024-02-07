import React from 'react'
import Post from './Post'
import Feed from './Feed'

const Home = ({posts}) => {
  return (
    <main className='Home' >
      {Post.length ? (<Feed posts={posts} />) :(
        <p>No Post to display</p>
      )
      }
    </main>
  )
}

export default Home