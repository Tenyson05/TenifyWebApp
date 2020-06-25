import React, { Component } from 'react';
import styled from 'styled-components';
import { getHashParams } from '../SpotifyStats/stats';
import Spotify from 'spotify-web-api-node';
import Sidebar from '../Content/SideMenu';

const SpotifyWebApi = new Spotify();

const TopartisttHome = styled.div`
	color: #ffff;
	min-height: 100vh;
	height: 100%;
	background-color: #18191E;
	padding: 100px;

`
const TopartistTitle = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	h2 {
		padding-left: 40px; 
	}
`

const ArtistCards = styled.div`
	display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin-top: 50px;
    gap: 20px;

`

const ArtistInfo = styled.div`
	display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

`
const ArtistImage = styled.img`
	object-fit: cover;
    width: 200px;
    height: 200px;
    border-radius: 100%;

`

const ArtistName = styled.span`
	font-size: 18px;
	font-weight: bold;
	margin-top: 10px;
	text-decoration: none;
	color: #ffff;
	:hover {
		text-decoration: underline;
	}

`


class TopArtist extends Component {
	constructor() {
		super();
		const token = getHashParams().access_token;
		if (token) {
			SpotifyWebApi.setAccessToken(token);
		}
		this.state = {
			loggedIn: token ? true : false,
			topArtist: []
		}
	}

	getTopArtist() {
		SpotifyWebApi.getMyTopArtists({time_range: "short_term"})
			.then(response => response)
			.then(data => {
				this.setState({ topArtist: data.body.items }, console.log('dddd', data.body.items))
			})
	}

	componentDidMount() {
		this.getTopArtist()
	}

	render() {
		return (
			
			<TopartisttHome>
				<TopartistTitle>
					<h2> Most Recent Top Artist </h2>
				</TopartistTitle>
				<ArtistCards>
					{
						this.state.loggedIn && this.state.topArtist.map((Artist, id) => (
							<ArtistInfo key={id}>
								<ArtistImage src={Artist.images[1].url} alt="Artist icon" />
								<ArtistName as="a" href={ Artist.external_urls.spotify } target="_blank" rel="noopener noreferrer" > { Artist.name } </ArtistName> 
								 <ArtistName> { Artist.followers.total } </ArtistName>
							 </ArtistInfo>
						))
					}
				</ArtistCards>
			</TopartisttHome>
		);
	}
}

export default TopArtist;

