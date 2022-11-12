import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import io from 'socket.io-client'
import moment from 'moment'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import Dialog from '../components/material/Dialog'
import IconButton from '../components/material/IconButton'
import Spinner from '../components/material/Spinner'

import { useLoadBookings, useLoadSpots } from '../modules/customHooks'
import settings from '../core/config/settings.json'
import { approvalRequest, newBookingRequest } from 'src/core/store/containers/bookings/actions'
import { Booking } from 'src/core/store/containers/bookings/types'
import { RootState } from 'src/core/store/store'
import { deleteRequest as deleteSpot } from 'src/core/store/containers/spot/actions'
import { Spot } from 'src/core/store/containers/spot/types'
import '../assets/styles/dashboard.css'

const { remoteImagesUrl, socketUrl } = settings
const Dashboard: FC = () => {
  const dispatch = useDispatch()
  const [spotHover, setSpotHover] = useState('')
  const [loaderMounted, setLoaderStatus] = useState(true)
  const [dialog, setDialogProps] = useState({ spotId: '', open: false, title: '', description: '' })
  const history = useHistory()
  const [deletedId, setDeletedId] = useState<string>('')
  const bookings = useSelector((state: RootState) => state.bookings.data)
  const spots = useSelector((state: RootState) => state.spots)
  const user = useSelector((state: RootState) => state.user.data)
  const socket = useRef(
    io(
      socketUrl,
      {
        autoConnect: false,
        query: { userId: user.id, type: 'web' },
        transports: ['websocket', 'polling']
      }
    )
  ).current

  const acceptanceRequest = (approved: boolean, bookingId: string, spotId: string): void => {
    dispatch(approvalRequest(approved, bookingId, spotId, user.id, user.token))
  }

  const askDeleteSpot = (spot: Spot): void => {
    setDialogProps({
      ...dialog,
      spotId: spot._id,
      open: true,
      title: 'Confirmation',
      description: `Do you really want delete the spot <strong>${spot.company}?</strong>`
    })
  }

  const handleDialogClose = (): void => setDialogProps({ ...dialog, open: false })

  const handleDialogCancel = (): void => handleDialogClose()

  const handleDeleteSpot = (): void => {
    const payload = {
      id: dialog.spotId,
      userid: user.id,
      token: user.token
    }

    setDeletedId(dialog.spotId)
    handleDialogClose()

    setTimeout(() => dispatch(deleteSpot(payload)), 300)
  }

  const handleDialogSuccess = (): void => handleDeleteSpot()

  const hideActionButtons = (): void => setSpotHover('')

  const showActionButtons = (spotId: string): void => setSpotHover(spotId)

  useLoadBookings(null)
  useLoadSpots()

  // onUpdate
  useEffect(() => {
    if (deletedId.length > 0 && !spots.error && !spots.loading) {
      setDeletedId('')
    }
  }, [deletedId, spots.error, spots.loading])

  // socket connection
  useEffect(() => {
    if (user?.id === undefined) return
    socket.connect()
    socket.on('booking_request', (data: Booking) => dispatch(newBookingRequest(data)))
    socket.on('connect_error', () => {
      // revert to classic upgrade
      socket.io.opts.transports = ['polling', 'websocket']
    })

    return () => {
      socket.disconnect()
    }
  }, [user?.id])

  useEffect(() => {
    if (loaderMounted || spots.verified) {
      setLoaderStatus(false)
    }
  }, [loaderMounted, spots?.verified])

  if (loaderMounted || !spots.verified) {
    return (
      <div className='pageloader'>
        <Spinner color='#6300B1' />
        <div className='loadertext'>Loading available spots...</div>
      </div>
    )
  }

  return (
    <div id='dashboard'>
      <h1>
        Dashboard
        <Link to='/new-spot'>
          <button className='btn compact icon'>
            <AddIcon />
          </button>
        </Link>
      </h1>

      <ul className='notifications'>
        {
          bookings.map((request: Booking) => {
            const { _id, spot } = request
            return (
              <li key={request._id}>
                <p>
                  <strong>{request.user.name}</strong> is requesting a spot in
                   <strong>{request.spot.company}</strong> on <strong>{moment(new Date(request.date)).format('dddd, LL')}</strong>
                </p>
                <button
                  className='accept'
                  onClick={() => acceptanceRequest(true, _id, spot._id)}
                >
                  Accept
                </button>
                <button
                  className='deny'
                  onClick={() => acceptanceRequest(false, _id, spot._id)}
                >
                  Deny
                </button>
              </li>
            )
          })
        }
      </ul>

      <ul className='spot-list'>
        {
          spots.data.map((spot: Spot) => (
            <li
              key={spot._id}
              onMouseEnter={(): void => showActionButtons(spot._id)}
              onMouseLeave={(): void => hideActionButtons()}
            >
              {
                deletedId === spot._id &&
                  <div className='pageloader absoluted bg-white'>
                    <Spinner color='#fff' />
                  </div>
              }
              <div className='action-buttons' style={{ display: spotHover === spot._id ? 'flex' : 'none' }}>
                <IconButton
                  className='edit icon'
                  label='edit'
                  onClick={() => { history.push('/edit-spot', { data: spot }) }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  className='delete icon'
                  label='delete'
                  onClick={() => { askDeleteSpot(spot) }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <div
                className='image'
                style={{ backgroundImage: `url(${remoteImagesUrl}/${spot.thumbnail})` }}
              />
              <div className='title'>{spot.company}</div>
              <div className='price'>{(spot.price === 0 || spot.price === null) ? 'Free' : `$${spot.price}/day`}</div>
            </li>
          ))
        }
      </ul>

      <Dialog
        {...dialog}
        handleCancel={handleDialogCancel}
        handleClose={handleDialogClose}
        handleSuccess={handleDialogSuccess}
        labelCancel='Cancel'
      />
    </div>
  )
}

export default Dashboard
