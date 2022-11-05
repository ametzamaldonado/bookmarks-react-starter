import { useState } from "react";
import Bookmark from "./Bookmark";
import axios from "axios";
// ^ this is our new package for making API calls

// INDEX Page??

const API = process.env.REACT_APP_API_URL;
console.log(API)
// request for data must come AFTER component is loaded to the DOM
// otherwise we have to RACE condition - page might be done before data arrives;

function Bookmarks() {
  const [ bookmarks, setBookmarks ] = useState([]);

  useEffect(() => {
    axios.get(`${API}/bookmarks`) // fetches data from API that is running as well
      .then((res) => { setBookmarks(response.data)}) // saves data to our hook
      .catch((err) => {console;log(err)})
  }, []) // <------ empty dependencies array
  // when the dependency array of a useEffect is empty the code inside will only run once: after the component mounts!
  // adding a value to our dependency array will cause our useEffect to run anytime that value changes

  return (
    <div className="Bookmarks">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this bookmark</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => {
              return <Bookmark key={index} bookmark={bookmark} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Bookmarks;
