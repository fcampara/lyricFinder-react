import React, { Component } from 'react'
import { AxiosInstance } from '../../config/axios'
import { Consumer } from '../../context'

export class Search extends Component {
    state = {
        trackTitle: ''
    }

    onChange = (e) => {
      // {target: {value: trackTitle}}
      this.setState({ [e.target.name]: e.target.value })
    }

     findTrack = async (dispatch, e) => {
      e.preventDefault()
      const {data: { message: { body: { track_list } } }} = await AxiosInstance.get(`track.search?q_track=${this.state.trackTitle}$page_size=10`)
      dispatch({
        type: 'SEARCH_TRACKS',
        payload: track_list
      })
    }

  render () {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value

          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search For A Song
              </h1>
              <p className="lead text-center"> Get the lyrics for any song </p>
              <form onSubmit={ this.findTrack.bind(this, dispatch) }>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Song title..." 
                    name="trackTitle" value={ this.state.trackTitle } onChange={ this.onChange }
                  />
                </div>
                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Track List</button>
              </form>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
