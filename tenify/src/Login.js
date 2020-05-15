import React, { Component } from 'react';
import styled from 'styled-components';



const URI = "http://localhost:8888/login";

const Welcome = styled.div`
	width: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    margin: 0px auto;
	background-color: #1DB954;
	
`
const Button = styled.button`
	position: absolute;
	display: inline-block;
	width: 260px;
	font-weight: 700;
	text-transform: uppercase;
	text-align: center;
	background-color: #191414;
	border-radius: 30px;
	color: #ffff;
	padding: 30px;	
`
const CenterScreen = styled.div`
	position: absolute;
`

class Login extends Component {
	render() {
		return (
			<Welcome>
				<CenterScreen>
					<h1 style={{fontWeight: 900, margin: '0px 0px 10px', color: '#ffff'}}>Welcome to Tenify!</h1>
					<Button as="a" href={URI}>Login to Spotify</Button>
				</CenterScreen>
			</Welcome>
		);
	}
}

export default Login;
