// import logo from './logo.svg';
import '../App.css';
import { useState , useEffect } from 'react'
import { Button, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const CLIEND_ID ="1d216c83fada42baa22c9948b537feed"
  const REDIRECT_URL = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const navigate = useNavigate()

  const [token, setToken] = useState("")

 

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if(!token && hash){
      token = hash.substring(1).split('&').find(e => e.startsWith('access_token')).split('=')[1]
      window.location.hash = ""
      window.localStorage.setItem('token' , token)
    }

    if(token === "" || token === null){
        navigate('/')
    }else{
        navigate('/home')
    }

    setToken(token)
  }, [])

  return (
    <div className='App'>
  
    <header className='App-header'>
    <h1>Stress Relief Player</h1>
   
    <Button variant='contained' color="primary" onClick={() => {window.location.replace(`${AUTH_ENDPOINT}?client_id=${CLIEND_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}`)} }>Login to Stress Relief Player</Button>
    
    </header>

    </div>
  );
}

export default LoginPage;
