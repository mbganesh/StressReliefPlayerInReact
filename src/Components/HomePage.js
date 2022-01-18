// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();

  //   const CLIEND_ID ="1d216c83fada42baa22c9948b537feed"
  //   const REDIRECT_URL = "http://localhost:3000/"
  //   const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  //   const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  //   const handleLogout = () => {
  //     setToken("")
  //     window.localStorage.removeItem('token')
  //   }

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    navigate("/");
  };

//   "album"
// "artist"
// "playlist"
// "track"
// "show"
// "episode"

  const handleSearch = async () => {
    console.log(token);
    const { data } = await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Barer ${token}`,
        },
        params: {
          q: searchKey,
          type: "artist",
        }
      })
      .then((result) => {
        console.log(result.data);
      });

    console.log(data);
  };

  useEffect(() => {
    var to = window.localStorage.getItem("token");

    if (to === "" || to === null) {
      console.log("Please Login");
      navigate("/");
    } else {
      setToken(to);
    }
  }, []);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography style={{ flex: 1 }}>Stress Relief Player</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <div
        style={{ marginTop: "5%", display: "flex", justifyContent: "center" }}
      >
        <TextField
          style={{ margin: "10px" }}
          label="Search"
          variant="outlined"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Button
          style={{ margin: "10px", backgroundColor: "green", color: "white" }}
          onClick={() => handleSearch()}
        >
          Search
        </Button>
      </div>

      <div>
        <h1>result</h1>
      </div>
    </div>
  );
}

export default HomePage;
