import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login.js"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlogName, setNewBlogName] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

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
      blogService.setToken(user.token)
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

  const handleNewBlog = async e => {
    e.preventDefault();

    await blogService.addBlog({
      title: newBlogName,
      author: newBlogAuthor,
      url: newBlogUrl
    });
  };

  const handleLogout = e => {
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
  
  const newBlogForm = () => (
    <div>
    <h2>Create New</h2>
    <form onSubmit={handleNewBlog}>
      <label>
        Name: 
        <input
          type="text"
          value={newBlogName}
          onChange={({target}) => setNewBlogName(target.value)}
        />
      </label> <br/>
      <label>
        Author: 
        <input
          type="text"
          value={newBlogAuthor}
          onChange={({target}) => setNewBlogAuthor(target.value)}
        />
      </label> <br/>
      <label>
        Url: 
        <input
          type="text"
          value={newBlogUrl}
          onChange={({target}) => setNewBlogUrl(target.value)}
        />
      </label> <br/>
      <button type="submit">submit</button>
    </form>
    </div>
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
      {user && newBlogForm()}
      {user && blogsList()}
    </div>
  )
}

export default App