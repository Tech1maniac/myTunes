import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/sideBar";
import Header from "./components/Header";
import { motion } from "framer-motion";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
  Modal,
} from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";


const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:5375/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES =
  "user-read-private user-read-email user-library-modify user-library-read playlist-modify-public playlist-modify-private";

function App() {
  const [token, setToken] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [tracks, setTracks] = useState([]);
  const [likedTracks, setLikedTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playingPreviewUrl, setPlayingPreviewUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLikedModal, setShowLikedModal] = useState(false);
  const [showPlaylistsModal, setShowPlaylistsModal] = useState(false);
  const [showPlaylistSongsModal, setShowPlaylistSongsModal] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [showHeading, setShowHeading] = useState(true);
  const zoomVariants = {
  hidden: {
    scale: 3, // Start with zoomed-out size
    opacity: 0,
  },
  visible: {
    scale: 1, // Zoom in to normal size
    opacity: 1,
    transition: {
      duration: 1.5, // Animation duration
      ease: "easeInOut",
    },
  },
};

  const authenticateSpotify = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
  };

  const fetchLikedSongs = useCallback(async () => {
    if (!token) return;
    const likedParameters = {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    };
    try {
      const likedData = await fetch(
        `https://api.spotify.com/v1/me/tracks`,
        likedParameters
      ).then((response) => response.json());
      setLikedTracks(likedData.items.map((item) => item.track));
    } catch (error) {
      console.error("Error fetching liked songs:", error);
    }
  }, [token]);

  const fetchPlaylists = useCallback(async () => {
    if (!token) return;
    const playlistParameters = {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    };
    try {
      const playlistData = await fetch(
        `https://api.spotify.com/v1/me/playlists`,
        playlistParameters
      ).then((response) => response.json());
      setPlaylists(playlistData.items);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  }, [token]);

  const fetchPlaylistSongs = async (playlistId) => {
    if (!token) return;
    const playlistTracksParams = {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    };
    try {
      const playlistTracksData = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        playlistTracksParams
      ).then((response) => response.json());
      setPlaylistTracks(playlistTracksData.items.map((item) => item.track));
      setCurrentPlaylist(playlistId);
      setShowPlaylistSongsModal(true);
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) fetchPlaylists();
    if (token) fetchLikedSongs();
  }, [token, fetchPlaylists, fetchLikedSongs]);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setLikedTracks([]);
    setPlaylists([]);
  };

  async function search() {
    if (!token) return;
    setShowHeading(false); // Hide the heading
    const searchParameters = {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    };
    try {
      const trackData = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track`,
        searchParameters
      ).then((response) => response.json());
      setTracks(trackData.tracks.items);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleTrackClick = (track) => {
    const previewUrl = track.preview_url;
    if (previewUrl) {
      setPlayingPreviewUrl(previewUrl);
      setCurrentTrack(track);
      setShowModal(true);
    } else {
      alert("No preview available for this track.");
    }
  };

  const addToLikedSongs = async (trackId) => {
    if (!token) return;
    const requestOptions = {
      method: "PUT",
      headers: { Authorization: "Bearer " + token },
    };
    try {
      await fetch(
        `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
        requestOptions
      );
      alert("Track added to Liked Songs!");
      setTimeout(() => fetchLikedSongs(), 1000);
    } catch (error) {
      console.error("Error adding to Liked Songs:", error);
    }
  };
  const dislikeTrack = async (trackId) => {
    if (!token) return; // Make sure the user is authenticated

    // Check if the track is already in the liked songs
    if (!likedTracks.some((track) => track.id === trackId)) {
      alert("Track is not in your Liked Songs!");
      return;
    }

    const dislikeParameters = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    };
    try {
      // Make the DELETE request to remove the track from Liked Songs
      await fetch(
        `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
        dislikeParameters
      );
      alert("Track removed from Liked Songs!"); // Notify the user
      setTimeout(() => fetchLikedSongs(), 1000); // Refresh the liked songs list
    } catch (error) {
      console.error("Error removing from Liked Songs:", error);
    }
  };

  const addToPlaylist = async () => {
    if (!token || !currentTrack) return;

    // Ask for the playlist name
    const playlistName = prompt(
      "Enter the playlist name where you want to add the song:"
    );
    if (!playlistName) {
      alert("No playlist name entered. Operation canceled.");
      return;
    }

    // Check if the playlist name exists in the current playlists
    const existingPlaylist = playlists.find(
      (playlist) => playlist.name.toLowerCase() === playlistName.toLowerCase()
    );

    let playlistId;

    if (existingPlaylist) {
      // If playlist exists, use its ID
      playlistId = existingPlaylist.id;
    } else {
      // If playlist doesn't exist, create a new one
      const createPlaylistParameters = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: playlistName }),
      };

      try {
        const newPlaylist = await fetch(
          `https://api.spotify.com/v1/me/playlists`,
          createPlaylistParameters
        ).then((response) => response.json());
        playlistId = newPlaylist.id;
        alert(`Created new playlist: ${playlistName}`);
      } catch (error) {
        console.error("Error creating new playlist:", error);
        return;
      }
    }

    // Add the track to the selected or newly created playlist
    const addTrackParameters = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [currentTrack.uri] }),
    };

    try {
      await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        addTrackParameters
      );
      alert(`Track added to playlist: ${playlistName}`);
      fetchPlaylists(); // Refresh playlists
    } catch (error) {
      console.error("Error adding to playlist:", error);
    }
  };
  const removeFromPlaylist = async (playlistId, trackId) => {
    if (!token) return;

    const removeTrackParameters = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tracks: [{ uri: `spotify:track:${trackId}` }] }),
    };

    try {
      await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        removeTrackParameters
      );
      alert("Track removed from playlist!");
      fetchPlaylistSongs(playlistId); // Refresh the playlist tracks
    } catch (error) {
      console.error("Error removing track from playlist:", error);
    }
  };
  const removePlaylist = async (playlistId) => {
    if (!token) return;

    const removePlaylistParams = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
        removePlaylistParams
      );
      // Update the UI to reflect the removal
      setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
      alert("Playlist removed successfully!");
    } catch (error) {
      console.error("Error removing playlist:", error);
      alert("Failed to remove the playlist.");
    }
  };

  return (
    <div className="App">
      <Sidebar
        token={token}
        setShowLikedModal={setShowLikedModal}
        setShowPlaylistsModal={setShowPlaylistsModal}
        fetchPlaylists={fetchPlaylists}
        logout={logout}
        authenticateSpotify={authenticateSpotify}
      />
      <div className="header">
        <Header
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          search={search}
        />
      </div>

      <div className="main-content">
        {showHeading && (
          <div className="center-heading">
            <h1>Welcome to myTunes</h1>
          </div>
        )}
        <Container>
          <Row className="mx-2">
            {tracks.map((track, i) => (
              <div key={i} className="col-md-4 mb-4">
                <Card
                  className="track-card h-100"
                  onClick={() => handleTrackClick(track)}
                >
                  <Card.Img variant="top" src={track.album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{track.name}</Card.Title>
                    <p>{track.artists[0].name}</p>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Row>
        </Container>
        {showModal && currentTrack && (
          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{currentTrack.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {currentTrack.album && (
                  <img
                    src={currentTrack.album.images[0].url}
                    alt={currentTrack.name}
                    style={{ width: "100%" }}
                  />
                )}
                {playingPreviewUrl ? (
                  <audio controls autoPlay src={playingPreviewUrl}></audio>
                ) : (
                  <p>No preview available for this track.</p>
                )}
                <div>
                  <Button
                    variant="primary"
                    onClick={() => addToLikedSongs(currentTrack.id)}
                  >
                    Like
                  </Button>
                  {/* Conditionally show the "Dislike" button if the track is in the liked songs list */}
                  {likedTracks.some(
                    (track) => track.id === currentTrack.id
                  ) && (
                    <Button
                      variant="danger"
                      onClick={() => dislikeTrack(currentTrack.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Dislike
                    </Button>
                  )}
                  <Button
                    variant="success"
                    onClick={addToPlaylist}
                    style={{ marginLeft: "10px" }}
                  >
                    Add to Playlist
                  </Button>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {showLikedModal && (
          <Modal
            show={showLikedModal}
            onHide={() => setShowLikedModal(false)}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Liked Songs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="song-grid">
                {likedTracks.map((track, i) => (
                  <div key={i} className="song-item">
                    <img
                      src={track.album.images[0].url}
                      alt={track.name}
                      className="song-image"
                      onClick={() => handleTrackClick(track)}
                    />
                    <h5 className="song-name">{track.name}</h5>
                    <p className="song-artist">{track.artists[0].name}</p>
                    {/* Add the Dislike button for each liked song */}
                    <Button
                      variant="danger"
                      onClick={() => dislikeTrack(track.id)} // Removes the track from Liked Songs
                    >
                      Dislike
                    </Button>
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal>
        )}

        {showPlaylistsModal && (
          <Modal
            show={showPlaylistsModal}
            onHide={() => setShowPlaylistsModal(false)}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Your Playlists</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="playlist-grid">
                {playlists.map((playlist, i) => (
                  <div key={i} className="playlist-item">
                    <h1
                      className="playlist-name"
                      onClick={() => fetchPlaylistSongs(playlist.id)}
                    >
                      {playlist.name}
                    </h1>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        // e.stopPropagation(); // Prevent triggering `fetchPlaylistSongs`
                        removePlaylist(playlist.id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal>
        )}

        {showPlaylistSongsModal && (
          <Modal
            show={showPlaylistSongsModal}
            onHide={() => setShowPlaylistSongsModal(false)}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Playlist Songs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="song-grid">
                {playlistTracks.map((track, i) => (
                  <div key={i} className="song-item">
                    <img
                      src={track.album.images[0].url}
                      alt={track.name}
                      className="song-image"
                      onClick={() => handleTrackClick(track)}
                    />
                    <h5 className="song-name">{track.name}</h5>
                    <p className="song-artist">{track.artists[0].name}</p>
                    <Button
                      variant="danger"
                      onClick={() =>
                        removeFromPlaylist(currentPlaylist, track.id)
                      }
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default App;
