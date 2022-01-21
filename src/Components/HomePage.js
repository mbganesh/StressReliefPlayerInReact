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
  const [myList, setMyList] = useState([]);
  const [tabPos, setTabPos] = useState(2);

  const [albums, setAlbums] = useState("");
  const [artists, setArtists] = useState("");
  const [playlists, setPlayLists] = useState("");

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

    const { data } = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    var temp = data["playlists"]["items"];

    const { albums, artists, playlists } = data;

    setAlbums(albums);
    setArtists(artists);
    setPlayLists(playlists);

    setMyList(temp);

    console.log(data);
    console.log(albums);
    console.log(artists);
    console.log(playlists);
  };

  const handleTabChange = (e, v) => {
    console.log(v);
    setTabPos(v);
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
          style={{ margin: "10px", width: "35%" }}
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
          <Tabs
            value={tabPos}
            onChange={handleTabChange}
            centered
            variant="fullWidth"
          >
            <Tab label="Albums" />
            <Tab label="Artists" />
            <Tab label="Playlist" />
          </Tabs>
        </AppBar>

        <div>
          {/* {
      tabPos === 0 && 
      <div>
        <h1> "{albums}" </h1>
      </div>
    } */}
        </div>

        {/* album */}
        <TabPanel value={tabPos} index={0}>
          <div>
            {albums === "" ? (
              <div>No Data</div>
            ) : (
              <div>
                <h1>{albums["href"]}</h1>
              </div>
            )}
          </div>
        </TabPanel>

        {/* artist */}
        <TabPanel value={tabPos} index={1}>
          <div>
            {artists === "" ? (
              <div>No Data</div>
            ) : (
              <div>
                <h1>{artists["href"]}</h1>
              </div>
            )}
          </div>
        </TabPanel>

        {/* playlist */}
        <TabPanel value={tabPos} index={2}>
          <div>
            {playlists === "" ? (
              <div>No Data</div>
            ) : (
              <div>
                <div>
                  {
                  playlists["items"]["images"].map( el => (
                    playlists["items"]["images"]
                  ))
                  }
                </div>
              </div>
            )}
          </div>
        </TabPanel>
      </div>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <div p={3}>{children}</div>
    </Typography>
  );
}

// function TabPanel(props) {
//   const { children, tabPos, index } = props;
//   return (
//     <div>
//       {tabPos === index && (
//           <h2> {children} </h2>
//       )}
//     </div>
//   );
// }

export default HomePage;
