import React, { Component } from 'react'
import { AxiosInstance } from '../../config/axios'
import { Spinner } from '../layout/Spinner'
import { Link } from 'react-router-dom'

export class Lyrics extends Component {
  state = {
      track: {},
      lyrics: {}
  }

  async componentDidMount() {
    const {data: { message: { body: { lyrics } } }} = await AxiosInstance.get(`track.lyrics.get?track_id=${this.props.match.params.id}`)
    const {data: { message: { body: { track } } }} = await AxiosInstance.get(`track.get?track_id=${this.props.match.params.id}`)
    this.setState({ track, lyrics })
  }

  render() {
    const { track, lyrics } = this.state

    if (!Object.keys(track).length || !Object.keys(lyrics).length) {
      return <Spinner />
    } else {
      const album_id = track.album_id || 'No album ID'
      const genere = (track.primary_genres.music_genre_list[0] && track.primary_genres.music_genre_list[0].music_genre.music_genre_name) || 'No Genre'
      const explicit = track.explicit === 0 ? 'No' : 'Yes'
      const release_date = track.first_release_date || 'No release date'

      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
          <div className="card">
            <h5 className="card-header">
              { track.track_name } by <span className="text-secondary">{ track.artist_name }</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{ lyrics.lyrics_body }</p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item"><strong>Album ID</strong>: { album_id }</li>
            <li className="list-group-item"><strong>Song Genre</strong>: { genere }</li>
            <li className="list-group-item"><strong>Explicit Words</strong>: { explicit }</li>
            <li className="list-group-item"><strong>Release Date</strong>: { release_date } </li>
          </ul>
        </React.Fragment>
      )
    }
  }
}
