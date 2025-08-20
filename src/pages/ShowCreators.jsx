import React from 'react'
import CreatorComponent from '../components/creatorComponent'

const ShowCreators = ({creators}) => {
  return (
    <div>
        <h1>Creators</h1>
        {creators.length > 0 ? (
          creators.map((creator) => (
            <CreatorComponent key={creator.name} {...creator} />
          ))
        ) : (
          <p>No creators found.</p>
        )}
    </div>
  )
}

export default ShowCreators