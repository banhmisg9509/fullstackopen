import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlogForm = ({ setBlogs, showNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const resetCreateBlogForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };


  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const payload = { title, author, url };
    const newBlog = await blogService.createBlog(payload);
    setBlogs((oldBlogs) => oldBlogs.concat(newBlog));
    resetCreateBlogForm();
    showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
  };

  return (
    <form onSubmit={handleCreateBlog} className="flex flex-col gap-1 max-w-64">
      <div>
        <label className="flex">
          <span>title:</span>
          <input
            type="text"
            className="border border-black ml-auto px-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label className="flex">
          <span>author:</span>
          <input
            type="text"
            className="border border-black ml-auto px-1"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label className="flex">
          <span>url: </span>
          <input
            type="text"
            className="border border-black ml-auto px-1"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="border border-black px-2 active:bg-gray-100"
        >
          create
        </button>
      </div>
    </form>
  );
};

export default CreateBlogForm;
