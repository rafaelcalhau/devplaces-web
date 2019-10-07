import React, { MouseEvent, SFC, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import TextField from '@material-ui/core/TextField'
import { AppState } from '../store'
import { submitSpot } from '../store/actions/spots'
import Camera from '../assets/images/camera.svg'
import '../assets/styles/new.css'

const Spot: SFC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [error, setError] = useState('')
  const [thumbnail, setThumbnail] = useState()
  const [company, setCompany] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [price, setPrice] = useState('')

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
  const { error: requestError, submitted } = useSelector((state: AppState) => state.spots)
  const user = useSelector((state: AppState) => state.user.data)

  const handleFile = (file: Array<any> | FileList | null): void => {
    if (!file) {
      setThumbnail(null)
    } else {
      setThumbnail(file[0])
    }
  }

  const register = (e: MouseEvent) => {
    e.preventDefault()

    if (!company.length) {
      setError('Please enter your company\'s name')
    } else if (!technologies.length) {
      setError('Please enter atleast 1 technology')
    } else {
      const data = new FormData()

      data.append('thumbnail', thumbnail)
      data.append('company', company)
      data.append('technologies', technologies)
      data.append('price', price)

      dispatch(submitSpot(data, user.id, user.token))
    }
  }

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail])

  useEffect(() => {
    if (!requestError && submitted) {
      setCompany('')
      setPrice('')
      setTechnologies('')
      setThumbnail(null)
    }
  }, [requestError, submitted])

  return (
    <>
      <h1>Create a Spot</h1>
      {
        error.length > 0 &&
        <p className="error">{error}</p>
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
            onClick={register}>
              Create Spot
          </button>
        </div>
      </form>
    </>
  )
}

export default Spot
