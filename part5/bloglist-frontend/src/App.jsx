import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login.js"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService
      .getAll().
      then(blogs => setBlogs(blogs))
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    if(userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const user = await loginService.login({username, password});
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("user", JSON.stringify(user));
    }
    catch {
      console.log("incorrect credentials");
      //setErrorMessage("wrong credentials");
      //setTimeout(() => {
      //  setErrorMessage(null);
      //}, 5000);
    }
  };

  const handleLogout = async e => {
    e.preventDefault();

    setUser(null);
    window.localStorage.setItem("user", null);
  }

  const loginForm = () => (
    <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
    </>
  );

  const greeting = () => (
    <p>Hello, {user.name}<button type="button" onClick={handleLogout}>Log Out</button></p>
  )

  const blogsList = () => (
    <>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </>
  )


  return (
    <div>
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && greeting()}
      {user && blogsList()}
    </div>
  )
}

export default App