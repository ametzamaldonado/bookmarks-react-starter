import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios"

// UPDATE page!!! 

const API = process.env.REACT_APP_API_URL;

function BookmarkEditForm() {
  let { index } = useParams();
  const navigate = useNavigate();

  const [bookmark, setBookmark] = useState({
    name: "",
    url: "",
    category: "",
    description: "",
    isFavorite: false,
  });

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };

  useEffect(() => {
    axios.get(`${API}/bookmarks/${index}`)
      .then(res => setBookmark(res.data))
      .catch(err => console.error(error))
  }, [ index ]);
  /*
  1. Get a handle on the data from our user
  2. Send a request to the DB
  3. < What do we do if it succeeds? >
  */

  const updateBookmark = () => {
    axios.put(`${API}/bookmarks/${index}`, bookmark)
    // two arguments because the second argument (bookmark) is the data we have to send. In the backend it is our request.body
      .then(res => {
        setBookmark(res.data)
        // updating the bookmark in state to the updated bookmark from our backend
        navigate(`/bookmarks/${index}`)
        // navigating back to our bookmark showpage
      .catch(err => console.error(err))
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBookmark();

  };
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={bookmark.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={bookmark.url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={bookmark.category}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={bookmark.isFavorite}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={bookmark.description}
          onChange={handleTextChange}
          placeholder="Describe why you bookmarked this site"
        />
        <br />

        <input type="submit" />
      </form>
      <Link to={`/bookmarks/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default BookmarkEditForm;
