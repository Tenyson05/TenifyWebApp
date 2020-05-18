import React, { Component } from 'react';
import Spotify from 'spotify-web-api-node';
import styled from 'styled-components';

const timeConv = require('pretty-ms');
const SpotifyWebApi = new Spotify();

const TrackHome = styled.div`
	color: #ffff;
	min-height: 100vh;
	height: 100%;
	background-color: #18191E;
	padding: 100px;

`
const TracksList = styled.ul`
	list-style: none;
`

const TracksImage = styled.div`
	display: inline-block;
	position: relative;
	padding-right: 20px;

`

const TracksInfo = styled.div`
	display: grid;
	grid-template-columns: 1fr max-content;
	gap: 10px;
	font-size: 18px;
	font-weight: bold;

`

const TrackCards = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	margin-bottom: 30px;
`
const TracksName = styled.span`
	text-overflow: ellipsis;
	padding: right;
	overflow: hidden;

`

const TrackSpan = styled.span`
	margin-bottom: 5px;
	border-bottom: 1px solid transparent;
`

const TrackDiv = styled.div`
	text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 1px;
    color: #9b9b9b;
    font-size: 14px;
    margin-top: 3px;
    overflow: hidden;

`

const TrackTime = styled.div`
	font-size: 14px;
	color: #9b9b9b;


`

const HeadTitle = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	h2 {
		padding-left: 40px; 
	}
`


class Tracks extends Component {
	constructor() {
		super();
		const params = this.getHashParams();
		const token = params.access_token;
		if (token) {
			SpotifyWebApi.setAccessToken(token);
		}
		this.state = {
			loggedIn: token ? true : false,
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

	
	getTopTracks() {
		SpotifyWebApi.getMyTopTracks({time_range:"short_term"})
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

			<TrackHome>
				<HeadTitle>
					<h2> Recent Top Tracks </h2>
				</HeadTitle>
				<TracksList>
					{
						this.state.loggedIn && this.state.topTracks.map((Tracks, id) => (
							<li key={id}>
								<TrackCards>
									<TracksImage>
										<img src={Tracks.album.images[2].url} alt="song art" />
									</TracksImage>
									<TracksInfo>
										<TracksName>
											<TrackSpan>{Tracks.name}</TrackSpan>
											<TrackDiv>
												{Tracks.artists.map((artist) => (<span> {artist.name + " "}</span>))}
												<span>{"- " + Tracks.album.name}</span>
											</TrackDiv>
										</TracksName>
										<TrackTime>
											{timeConv(Tracks.duration_ms, { colonNotation: true })}
										</TrackTime>
									</TracksInfo>
								</TrackCards>
							</li>

						))
					}
				</TracksList>
			</TrackHome>

		);
	}
}

export default Tracks;