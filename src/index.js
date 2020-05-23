import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import Tracks from './component/Content/Tracks';
import Recentlyplayed from './component/Content/RecentlyPlayed';
import TopArtist from './component/Content/TopArtist';
import SideMenu from './component/Content/SideMenu';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
	// <div className="home-page">
	// 	<SideMenu></SideMenu>,
	// </div>,
	
	<Router>
		<Route exact path="/" component={Login} />
		<Route path="/tracks" component={Tracks} />
		<Route path="/recents" component={Recentlyplayed}/>
		<Route path="/top" component={TopArtist}/>
	</Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
