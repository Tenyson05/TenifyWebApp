import React, { Component } from 'react';
import Spotify from 'spotify-web-api-node';
import styled from 'styled-components';

const SpotifyWebApi = new Spotify();


class Tracks extends Component {
	constructor(){
	  super();
	  const params = this.getHashParams();
	  const token = params.access_token;
	  if (token) {
		SpotifyWebApi.setAccessToken(token);
	  }
	  this.state = {
		loggedIn: token ? true : false,
		nowPlaying: { 
			name: 'Not Checked', 
			albumArt: '' 
		},
		topTracks: []
	  }
	}
	getHashParams() {
	  var hashParams = {};
	  var e, r = /([^&;=]+)=?([^&;]*)/g,
		  q = window.location.hash.substring(1);
	  e = r.exec(q)
	  while (e) {
		 hashParams[e[1]] = decodeURIComponent(e[2]);
		 e = r.exec(q);
	  }
	  return hashParams;
	}
  
	getNowPlaying(){
		SpotifyWebApi.getMyCurrentPlaybackState()
		.then((response) => {
		  this.setState({
			nowPlaying: { 
				name: response.body.item.name, 
				albumArt: response.body.item.album.images[0].url
			  }
		  }, console.log(response));
		})
	}


	getTopTracks(){
		SpotifyWebApi.getMyTopTracks()
		.then(response => response)
		.then(data => {
			this.setState({ topTracks: data.body.items }, console.log('boogie', this.state.topTracks, data.body.items))
		}).catch('catched: ', console.log) 
	}

	componentDidMount() {
		this.getTopTracks()
	}


	render() {
	  return (
		//   We are going to use nested list to generate the contents needed for the track list.
		<div>
		  <div>
			Now Playing: { this.state.nowPlaying.name }
		  </div>
		  <div>
			<img src={this.state.nowPlaying.albumArt} alt="hhmmm"/>
		  </div>
		  { this.state.loggedIn &&
			<button onClick={() => this.getNowPlaying()}>
			  Check Now Playing
			</button>
		  }

		  <div>
			  <div>
				  {
					this.state.loggedIn && this.state.topTracks.map((contact, id) => (
					<p key={id}> {contact.name} -  {contact.artists[0].name}</p>
					))
					
				  }
			  </div>
			  <div>
			  	{
					this.state.loggedIn && (this.state.topTracks.artists || []).map((contact, id) => (
						<p key={id}> {contact.name} </p>
					))
				  }
			  </div>
			

			<button onClick={() => this.getTopTracks()}>Get tracks</button>
		  </div>
		</div>

	  );
	}
  }
  
export default Tracks;