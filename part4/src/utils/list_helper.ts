import { IBlog } from "models/blog";

const dummy = (blogs: IBlog[]) => {
  return 1;
};

const totalLikes = (blogs: IBlog[]) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs: IBlog[]) => {
  let topBlog = blogs[0];
  for (let blog of blogs) {
    if (blog.likes > topBlog.likes) {
      topBlog = blog;
    }
  }
  return topBlog;
};

const mostBlogs = (blogs: IBlog[]) => {
  const counter = Object.create(null);

  for (let blog of blogs) {
    if (counter[blog.author]) {
      counter[blog.author] += 1;
    } else {
      counter[blog.author] = 1;
    }
  }

  let maxBlog = Number.MIN_VALUE;
  let author = "";

  for (let [authorName, blog] of Object.entries(counter) as [
    string,
    number
  ][]) {
    if (blog > maxBlog) {
      maxBlog = blog;
      author = authorName;
    }
  }

  return {
    author,
    blogs: maxBlog,
  };
};

const mostLikes = (blogs: IBlog[]) => {
  const counter = Object.create(null);

  for (let blog of blogs) {
    if (counter[blog.author]) {
      counter[blog.author] += blog.likes;
    } else {
      counter[blog.author] = blog.likes;
    }
  }

  let maxLike = Number.MIN_VALUE;
  let author = "";

  for (let [authorName, blog] of Object.entries(counter) as [
    string,
    number
  ][]) {
    if (blog > maxLike) {
      maxLike = blog;
      author = authorName;
    }
  }

  return {
    author,
    likes: maxLike,
  };
};

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
