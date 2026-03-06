import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    try {
      const res = await API.get("/songs");
      setSongs(res.data);
    } catch (err) {
      console.error("Fetch Songs Error:", err);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <SongContext.Provider value={{ songs, fetchSongs }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongs = () => useContext(SongContext);