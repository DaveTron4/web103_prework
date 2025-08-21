import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2>Welcome to CreatorVerse!</h2>
      <p>
        Discover, add, and manage your favorite creators all in one place.<br />
        <strong>Browse</strong> the list of creators, <strong>add</strong> new ones, or <strong>edit</strong> and <strong>delete</strong> existing entries.<br />
        Click on a creator to view more details or visit their page.
      </p>
      <div className="home-actions">
        <button onClick={() => navigate('/creators')}>Show All Creators</button>
        <button onClick={() => navigate('/addCreator')}>Add a Creator</button>
      </div>
    </div>
  )
}

export default Home