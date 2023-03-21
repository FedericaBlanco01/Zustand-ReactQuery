import React from 'react'
import { Place } from '../types/Place'

const PlaceCard = ({place}:{place: Place}) => {
  return (
    <div className='text-white w-full transform transition duration-500 hover:scale-125 hover:z-10 hover:bg-zinc-600 hover:shadow-zinc-500 
    hover:shadow-lg p-4 font-medium text-lg bg-zinc-700 rounded-lg drop-shadow-xl cursor-pointer'>
        <h2 className='text-xl text-green-500 font-bold'>{place.name}</h2>
        <p className='text-sm'>Type: {place.type}</p>
        <p className='text-sm'>Dimension: {place.dimension}</p>
        <p className='text-sm'>Created at: {place.created}</p>
    </div>
  )
}

export default PlaceCard