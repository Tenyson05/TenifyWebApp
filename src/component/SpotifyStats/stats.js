// import Spotify from 'spotify-web-api-node';
// const SpotifyWebApi = new Spotify();


export const getHashParams = () => {
	var hashParams = {};
	var e, r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	e = r.exec(q)
	while (e) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
		e = r.exec(q);
	}
	return hashParams;
};


// const token = getHashParams().access_token;
// if (token) {
// 	SpotifyWebApi.setAccessToken(token)
// }
// export const eee = window.localStorage.getItem('spotify_access_token');

// You can import the token by using the above statement.
// How ever we need to find away to set the access token just once. Potentially going
// to have to refeactor a lot of code