import "./App.css";
import { Auth } from "./components/auth";
import { db, auth } from "./config/firebase";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

//There will be an issue in updating title, cause we create this in one component if we used separate button it will be update in another title, it is always better to use new tittles

function App() {
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "movies");

  //New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [isNewMovieOscar, setisNewMovieOscar] = useState(false);

  //Update Title State
  const [updateTitle, setUpdateTitle] = useState("");

  const getMovieList = async () => {
    //GET DATA
    //GET MOVIE LIST
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        recievedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updateTitle });
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          placeholder="Movie name..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release date"
          onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setisNewMovieOscar(e.target.checked)}
        />
        <label>Recieved an oscar?</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>{movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              placeholder="New Title..."
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
