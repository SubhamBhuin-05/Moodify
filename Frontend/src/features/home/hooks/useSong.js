import { fetchSong } from "../services/song.api";
import { useContext } from "react";
import { songContext } from "../song.context";

export const useSong = () => {
    const context = useContext(songContext);
    if (!context) {
        throw new Error("useSong must be used within a SongContextProvider");
    }
    const { loading, setLoading, song, setSong } = context;

    async function handleFetchSong({ mood }) {
        try {
            setLoading(true);
            const data = await fetchSong({ mood });
            setSong(data.song);
        } catch (err) {
            console.error("Error fetching song:", err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }
    return { song, loading, handleFetchSong };
}