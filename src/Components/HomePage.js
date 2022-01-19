import { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Paper,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function HomePage() {
  const navigate = useNavigate();
  
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [myList, setMyList] = useState([])

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

    const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
        searchKey
      )}&type=album,playlist,artist`;

    const {data} = await axios.get(API_URL, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  var temp = data["playlists"]["items"]

  const {albums ,  artists , playlists} = data



  setMyList(temp)
  console.log(data);
    console.log( albums );
    console.log( artists );
    console.log( playlists );
  };

  const handleTabChange = (e ,v) => {
    console.log(v);
  }

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
      <AppBar position="static">
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

{/* search line */}
      <div
        style={{ marginTop: "1%", display: "flex", justifyContent: "center" }}
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


{/* tabs */}

<div>
   
  <AppBar position="static">
  <Tabs value={0} onChange={handleTabChange}>
     <Tab label="Albums"/>
     <Tab label="Artists"/>
     <Tab label="Playlist"/>
   </Tabs>
  </AppBar>

</div>


    </div>
  );
}

export default HomePage;
