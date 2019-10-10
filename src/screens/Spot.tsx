import React, { MouseEvent, SFC, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import TextField from '@material-ui/core/TextField'
import { remoteImagesUrl } from '../config/settings.json'
import { AppState } from '../store'
import { saveSpot, submitSpot } from '../store/actions/spots'
import Camera from '../assets/images/camera.svg'
import '../assets/styles/new.css'

const Spot: SFC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [spotId, setSpotId] = useState('')
  const [thumbnail, setThumbnail] = useState()
  const [company, setCompany] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [price, setPrice] = useState('')

  const isEdit = (props.location.state && props.location.state.data)

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      textField: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(1)
      }
    })
  )

  const classes = useStyles()
  const dispatch = useDispatch()
  const { error: requestError, submitted, updated } = useSelector((state: AppState) => state.spots)
  const user = useSelector((state: AppState) => state.user.data)

  const handleFile = (file: FileList | null): void => {
    if (!file) {
      setThumbnail(null)
    } else {
      setThumbnail(file[0])
    }
  }

  const register = (e: MouseEvent): void => {
    e.preventDefault()

    if (!thumbnail) {
      setError('Please choose an image for your spot')
    } else if (!company.length) {
      setError('Please enter your company\'s name')
    } else if (!technologies.length) {
      setError('Please enter atleast 1 technology')
    } else {
      const data = new FormData()

      if (typeof thumbnail === 'object') {
        data.append('thumbnail', thumbnail)
      }

      data.append('company', company)
      data.append('technologies', technologies)
      data.append('price', price)

      setError('')

      if (!isEdit) {
        dispatch(submitSpot(data, user.id, user.token))
      } else {
        dispatch(saveSpot(spotId, data, user.id, user.token))
      }
    }
  }

  const preview = useMemo(() => {
    if (typeof thumbnail === 'object') {
      return thumbnail ? URL.createObjectURL(thumbnail) : null
    }

    return thumbnail
  }, [thumbnail])

  // onMount
  useEffect(
    () => {
      if (isEdit) {
        const { _id, company, price, technologies, thumbnail } = props.location.state.data

        setSpotId(_id)
        setCompany(company)
        setPrice(price)
        setTechnologies(technologies.join(', '))

        if (thumbnail && thumbnail.length) {
          setThumbnail(`${remoteImagesUrl}/${thumbnail}`)
        }
      }
    },
    // eslint-disable-next-line
    []
  )

  useEffect(() => {
    if (!requestError && (submitted || updated)) {
      if (submitted) {
        setCompany('')
        setPrice('')
        setTechnologies('')
        setThumbnail(null)
        setSuccess('Spot registered successfully!')
      } else if (updated) {
        setSuccess('Spot saved successfully!')
      }

      setTimeout(() => setSuccess(''), 4000)
    } else if (requestError) {
      setError('Sorry, something is wrong. Please try again later.')
      setTimeout(() => setError(''), 4000)
    }
  }, [requestError, submitted, updated])

  return (
    <>
      <h1>
        {
          !isEdit
            ? 'Create a Spot'
            : 'Edit your Spot'
        }
      </h1>
      {
        error.length > 0 &&
        <p className="error">{error}</p>
      }
      {
        (error.length === 0 && success.length > 0) &&
        <p className="success">{success}</p>
      }
      <form id="new">
        <label
          id="thumbnail"
          className={thumbnail ? 'hasThumbnail' : ''}
          style={{ backgroundImage: `url(${preview})` }}
        >
          <input type="file" onChange={(e): void => handleFile(e.target.files)} />
          <img src={Camera} alt="Upload" />
        </label>

        <TextField
          id="company"
          autoComplete="off"
          label="COMPANY"
          placeholder="Your amazing company's name"
          className={classes.textField}
          margin="normal"
          type="text"
          value={company}
          variant="outlined"
          onChange={(e): void => setCompany(e.target.value)}
        />
        <TextField
          id="technologies"
          autoComplete="off"
          label="TECH (divided by comma)"
          placeholder="What technologies does your company use?"
          className={classes.textField}
          margin="normal"
          type="text"
          value={technologies}
          variant="outlined"
          onChange={(e): void => setTechnologies(e.target.value)}
        />
        <TextField
          id="price"
          autoComplete="off"
          label="PRICE"
          placeholder="Blank if it's Free"
          className={classes.textField}
          margin="normal"
          type="text"
          value={price}
          variant="outlined"
          onChange={(e): void => setPrice(e.target.value)}
        />

        <div className="buttons">
          <button
            className="btn back"
            onClick={(e): void => {
              e.preventDefault()
              props.history.goBack()
            }}
          >
            <ArrowBackIcon />
          </button>
          <button
            className="btn fluid"
            type="submit"
            onClick={register}
          >
            {
              !isEdit
                ? 'Create Spot'
                : 'Save Spot'
            }
          </button>
        </div>
      </form>
    </>
  )
}

export default Spot
