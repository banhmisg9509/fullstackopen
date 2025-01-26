import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import localStore, { USER } from "./services/store";
import CreateBlogForm from "./components/CreateBlogForm";
import LoginForm from "./components/LoginForm";
import UserStatus from "./components/UserStatus";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    content: "",
    type: "",
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        if (error.response.status === 401) {
          localStore.remove(USER);
          setUser(null);
        }
      }
    };

    if (!user) return;
    fetchBlogs();
  }, [user]);

  useEffect(() => {
    const loggedUser = localStore.get(USER);
    if (!loggedUser) {
      localStore.remove(USER);
      setUser(null);
      return;
    }

    setUser(JSON.parse(loggedUser));
  }, []);

  const showNotification = (content, type = "") => {
    setMessage({
      content,
      type,
    });

    setTimeout(() => setMessage({ content: "", type: "" }), 3500);
  };

  if (!user) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-4">Log in to application</h2>
        <Notification message={message} />
        <LoginForm setUser={setUser} showNotification={showNotification} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">blogs</h2>
      <Notification message={message} />
      <UserStatus user={user} setUser={setUser} />
      <CreateBlogForm setBlogs={setBlogs} showNotification={showNotification} />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
