import React, { Component } from 'react';
import styled from 'styled-components';
import { getHashParams } from '../SpotifyStats/stats'
import Spotify from 'spotify-web-api-node';
import { Rewind, Music, Users } from 'react-feather';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


const SpotifyWebApi = new Spotify();


const SidemenuBar = styled.div`
	height: 100%;
	width: 300px;
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	background-color: #ff2;
`
const ProfileCard = styled.div`
	height: 41%;
	width: 300px;
	position: relative;
	background-color: #1DB954;
	text-align: center;

`

const PlayerImage = styled.img`
	object-fit: cover;
    width: 200px;
    height: 200px;
	border-radius: 100%;
	margin-bottom: 10px;
`

const PlayerBarInfo = styled.div`
	margin-top: 30px;
    position: relative;
	height: 42%;
	display: inline-block;
	font-size: 20px;
	font-weight: 500;
	word-spacing: 20px;
`

const Menusection = styled.div`
	position: fixed;
	height: 59%;
	width: 300px;
	background-color: #000000;
	text-align: center;
	color: #fff;
`

const MenuContent = styled.div`
	width: 300px;
	margin-top: 50px;
`


const NavIcon = styled.div`
	/* background-color: red; */
`

const StyledNavItems = styled.div`
	margin-top: 50px;
	align-content: center;
	height: 80px;
	width: 300px; /* width must be same size as NavBar to center */
	margin-bottom: 0;   /* Puts space between NavItems */
	a {
		text-decoration: none;
		font-size: 20px;
		color: ${(props) => props.active ? "#1DB954" : "#fff"};
		:hover {
		opacity: 0.7;
		text-decoration: none; /* Gets rid of underlining of icons */
    }  
  }
`


class NavItem extends Component {
	handleClick = () => {
		const { path, onItemClick } = this.props;
		onItemClick(path);
	}

	render() {
		const { active } = this.props;
		return (
			<StyledNavItems active={active}>
				<Link to={this.props.path}  onClick={this.handleClick}>
					<NavIcon>{ this.props.icon}</NavIcon>
					<span> {this.props.name} </span>
				</Link>
			</StyledNavItems>
		)
	}
}


class SideNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePath: '/top',
			items: [
				{
					path: '/tracks',
					name: 'Tracks',
					icon: <Music size={50}/>,
					key: 1
				},
				{
					path: '/top',
					name: 'TopArtist',
					icon: <Users size={50}/>,
					key: 1
				},
				{
					path: '/recents',
					name: 'Recent',
					icon: <Rewind size={50}/>,
					key: 1
				},
			]
		}
	}
	onItemClick = (path) => {
		this.setState({ activePath: path });
	} 

	render () {
		const{ items, activePath } = this.state;
		return (
			<Menusection>
				<MenuContent>
					{
						items.map((item) => {
							return (
								<NavItem
									path={item.path}
									name={item.name}
									icon={item.icon}
									onItemClick={this.onItemClick}
									active={item.path === activePath}
									key={item.key}
								
								/>
							);
						})
					}
				</MenuContent>	
			</Menusection>
		);
	}
}


class SideMenu extends Component {
	constructor() {
		super();
		const token = getHashParams().access_token;
		if (token) {
			SpotifyWebApi.setAccessToken(token);
		}
		this.state = {
			loggedIn: token ? true : false,
			userProfile: {
				name: null,
				image: '',
				followers: null,
				following: null,
				playlists: null
			}
		}
	}

	getUserprofile() {
		Promise.all([
			SpotifyWebApi.getMe(),
			SpotifyWebApi.getFollowedArtists(),
			SpotifyWebApi.getUserPlaylists()
		]).then(response => response.map(
			res => (
				res
			)
		)).then(data => {
				this.setState({ userProfile: {
					name: data[0].body.display_name,
					image: data[0].body.images[0].url,
					followers: data[0].body.followers.total,
					following: data[1].body.artists.total,
					playlists: data[2].body.total

				}})
				console.log("here", data)
				
				
			}).catch(error => {
				return error
			})
	}

	componentDidMount() {
		if(this.state.loggedIn) {
			this.getUserprofile();
		}
		
	}



	render() {
		return (
			<SidemenuBar>
				<ProfileCard>
					<PlayerBarInfo>
						<PlayerImage src={ this.state.userProfile.image }/><br/>
						<span> { this.state.userProfile.name } </span> 
							 <div> Followers:  <span> {this.state.userProfile.followers }</span>  </div>
							 <div> Following: <span> { this.state.userProfile.following }</span> </div>
							 <div> Playlist: <span> { this.state.userProfile.playlists }</span></div>
					</PlayerBarInfo>
					
				</ProfileCard>
				<SideNav>
					
				</SideNav>
				

			</SidemenuBar>
		);
	}
}


export default SideMenu;