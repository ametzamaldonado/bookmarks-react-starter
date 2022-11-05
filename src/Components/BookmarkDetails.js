import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// SHOW PAGE!!
const API = process.env.REACT_APP_API_URL;

function BookmarkDetails() {
  const [ bookmark, setBookmark ] = useState({});
  let { index } = useParams(); // this is whatever the value of our id in the params is

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/bookmarks/${index}`)
      .then((res) => setBookmark(res.data))
      .catch((err) => navigate(`/404`)) // this could navigate to any route that we didn't define really...but we should navigate to something appropriate we don't have like `/404` or `/error`
  }, [ index ]);
  /* 
  We need to GET the bookmark from the DB to display our user
    1. Get the INDEX it exists at in the db
    2. GET the data
    3. Display it to our user in state;
  */
  const handleDelete = () => {
    axios.delete(`${API}/bookmarks/${index}`) // deletes
      .then(res => navigate(`/bookmarks`)) // ...then returns to other bookmarks here!!!
      .catch(err => console.log(err))
  };

  /* 
  We need to send a DELETE request to our DB
    1. Get the INDEX of our bookmark
    2. Send the DELETE request to our API
    3. < what do we need to do after this works? >
  */
  return (
    <article>
      <h3>
        {bookmark.isFavorite ? <span>⭐️</span> : null} {bookmark.name}
      </h3>
      <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {bookmark.url}
      </h5>
      <h6>{bookmark.category}</h6>
      <p>{bookmark.description}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/bookmarks`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/bookmarks/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default BookmarkDetails;
