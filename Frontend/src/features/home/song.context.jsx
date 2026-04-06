import { createContext } from "react";
import { useState } from "react";

export const songContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/subham1208/moodify/songs/Aakhir_Tumhein_Aana_Hai__From__From_Your_Humsafar____DOWNLOAD_MING__3qm1s3YHr.mp3",
    posterUrl:
      "https://ik.imagekit.io/subham1208/moodify/posters/Aakhir_Tumhein_Aana_Hai__From__From_Your_Humsafar____DOWNLOAD_MING__JwOXHgICS.jpg",
    title:
      'Aakhir Tumhein Aana Hai (From "From Your Humsafar")',
    artist: "Pradeep Sahil, Amit Mishra, Sanjeev-Darshan ",
    album:
      'Aakhir Tumhein Aana Hai (From "From Your Humsafar")',
    year: "2024",
    mood: "sad",
  });

  const [loading, setLoading] = useState(false);
  return (
    <songContext.Provider value={{ loading, setLoading, song, setSong }}>
      {children}
    </songContext.Provider>
  );
};
