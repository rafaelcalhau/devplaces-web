import React, { SFC, useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/material/Spinner'
import { useLoadSpots } from '../modules/customHooks'
import { remoteImagesUrl } from '../config/settings.json'
import { AppState } from '../store'
import { Spot } from '../store/types/spots'

const Dashboard: SFC = () => {
  const [loaderMounted, setLoaderStatus] = useState(true)
  const spots = useSelector((state: AppState) => state.spots)

  useLoadSpots()

  if (loaderMounted || !spots.verified) {
    let loaderClasses = 'pageloader'

    if (spots.verified) {
      loaderClasses += ' fadeOut'
      setTimeout(() => setLoaderStatus(false), 1000)
    }

    return (
      <div className={loaderClasses}>
        <Spinner color='#6300B1' />
        <div className="loadertext">Loading available spots...</div>
      </div>
    )
  }

  return (
    <>
      <h1>Dashboard</h1>
      <ul className='spot-list'>
        {
          spots.data.map((spot: Spot) => (
            <li key={spot._id}>
              <div className="image">
                <img src={`${remoteImagesUrl}/${spot.thumbnail}`} />
              </div>
              <div className='title'>{spot.company}</div>
              <div className='price'>{spot.price === 0 ? 'Free' : `$ ${spot.price}/day`}</div>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default Dashboard
