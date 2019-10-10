import React, { SFC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '../components/material/Dialog'
import IconButton from '../components/material/IconButton'
import Spinner from '../components/material/Spinner'
import { useLoadSpots } from '../modules/customHooks'
import { remoteImagesUrl } from '../config/settings.json'
import { AppState } from '../store'
import { Spot } from '../store/types/spots'
import '../assets/styles/dashboard.css'

const Dashboard: SFC = () => {
  const [loaderMounted, setLoaderStatus] = useState(true)
  const [dialog, setDialogProps] = useState({ spotId: '', open: false, title: '', description: '' })
  const history = useHistory()
  const spots = useSelector((state: AppState) => state.spots)

  useLoadSpots()

  const deleteSpot = (spot: Spot): void => {
    setDialogProps({
      ...dialog,
      spotId: spot._id,
      open: true,
      title: 'Confirmation',
      description: `Do you really want delete the spot <strong>${spot.company}?</strong>`
    })
  }

  const handleDeleteSpot = (): void => {
    console.log(dialog.spotId)
  }

  const handleDialogClose = (): void => setDialogProps({ ...dialog, open: false })
  const handleDialogCancel = (): void => handleDialogClose()
  const handleDialogSuccess = (): void => handleDeleteSpot()

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
    <div id="dashboard">
      <h1>
        Dashboard
        <Link to='/new-spot'>
          <button className='btn compact icon'>
            <AddIcon />
          </button>
        </Link>
      </h1>
      <ul className='spot-list'>
        {
          spots.data.map((spot: Spot) => (
            <li key={spot._id}>
              <div className="action-buttons">
                <IconButton
                  className='edit icon'
                  label='edit'
                  onClick={(): void => history.push('/edit-spot', { data: spot })}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  className='delete icon'
                  label='delete'
                  onClick={(): void => deleteSpot(spot)}>
                  <DeleteIcon />
                </IconButton>
              </div>
              <div
                className="image"
                style={{ backgroundImage: `url(${remoteImagesUrl}/${spot.thumbnail})` }}
              />
              <div className='title'>{spot.company}</div>
              <div className='price'>{spot.price === 0 ? 'Free' : `$${spot.price}/day`}</div>
            </li>
          ))
        }
      </ul>

      <Dialog
        {...dialog}
        handleCancel={handleDialogCancel}
        handleClose={handleDialogClose}
        handleSuccess={handleDialogSuccess}
      />
    </div>
  )
}

export default Dashboard
