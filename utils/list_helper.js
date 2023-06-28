const dummy = (blogs) => {
  return 1
};

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum,blog)=>{
        return sum + blog.likes
    },0)
  return total
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const maxBlog = blogs.reduce((maxi, blog) =>
    blog.likes > maxi.likes ? blog : maxi
  );

  return maxBlog.likes;
};

module.exports = {
  dummy,totalLikes,favoriteBlog,
};


