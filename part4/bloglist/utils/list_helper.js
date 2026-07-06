function dummy(blogs) {
    return 1;
}

function totalLikes(blogs) {
    return blogs.map(blog => blog.likes).reduce((acc, cur) => acc + cur, 0);
}

module.exports = {dummy, totalLikes};
