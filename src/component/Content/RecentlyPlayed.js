import React, { Component } from 'react';
import styled from 'styled-components';
import { getHashParams } from '../SpotifyStats/stats';
import Spotify from 'spotify-web-api-node';


// Look into the date formatter and also do some UI adjustments ofr the recently played
const SpotifyWebApi = new Spotify();

const RecentHome = styled.div`
	color: #ffff;
	min-height: 100vh;
	height: 100%;
	background-color: #18191E;
	padding: 100px;

`
const HeadTitle = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	h2 {
		padding-left: 40px; 
	}
`
const RecentList = styled.ul`
	list-style: none;
`

const RecentCards = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	margin-bottom: 30px;
`

const RecentImage = styled.div`
	display: inline-block;
	position: relative;
	padding-right: 20px;

`

const RecentInfo = styled.div`
	display: grid;
	grid-template-columns: 1fr max-content;
	gap: 10px;
	font-size: 18px;
	font-weight: bold;

`
const RecentName = styled.span`
	text-overflow: ellipsis;
	padding: right;
	overflow: hidden;

`

const RecentSpan = styled.span`
	margin-bottom: 5px;
	border-bottom: 1px solid transparent;
`

const RecentDiv = styled.div`
	text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 1px;
    color: #9b9b9b;
    font-size: 14px;
    margin-top: 3px;
    overflow: hidden;

`
const RecentTime = styled.div`
	font-size: 14px;
	color: #9b9b9b;


`


class RecentlyPlayed extends Component {
	constructor() {
		super();
		const token = getHashParams().access_token;
		if (token) {
			SpotifyWebApi.setAccessToken(token);
		}
		this.state = {
			loggedIn: token ? true : false,
			recentlyPlayed: []
		}
	}

	getRecentlyPlayed() {
		SpotifyWebApi.getMyRecentlyPlayedTracks()
		.then(response => response)
		.then(data => {
			this.setState({ recentlyPlayed: data.body.items }, console.log('dfdf', data.body.items))
		})
	}
	
	// componentDidMount() {
	// 	this.getRecentlyPlayed()
	// }

	render() {
		return(
			<RecentHome>
				<HeadTitle>
					<h2>Recently Played</h2>
				</HeadTitle>
				<RecentList>
					{
						this.state.loggedIn && this.state.recentlyPlayed.map((Played, id) => (
							<li key={id}>
								<RecentCards>
									<RecentImage>
										<img src={ Played.track.album.images[2].url } alt="Album art"/>
									</RecentImage>
									<RecentInfo>
										<RecentName>
											<RecentSpan>{Played.track.name} </RecentSpan> 
											<RecentDiv>
												{Played.track.artists.map((artist, id) =>(<span key={id}>{artist.name + " "}</span>))}
												<span>{"- " + Played.track.album.name}</span>
											</RecentDiv>
										</RecentName>
										<RecentTime> 
											{
												new Intl.DateTimeFormat('en-US',{
													year: 'numeric',
													month: 'numeric',
													day: 'numeric',
													hour: 'numeric',
													minute: 'numeric',
													second: 'numeric'
												}).format(new Date(Played.played_at))
											}
										</RecentTime>
									</RecentInfo>
								</RecentCards>
							</li>
						))

					}
				</RecentList>
			</RecentHome>


		);
	}
}

export default RecentlyPlayed;