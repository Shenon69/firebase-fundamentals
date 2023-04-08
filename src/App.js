import "./App.css";
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
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

    getMovieList();
  }, []);

  return (
    <div className="App">
      <Auth />
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>{movie.releaseDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
