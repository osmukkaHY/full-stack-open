function dummy(blogs) {
    return 1;
}

function totalLikes(blogs) {
    return blogs.map(blog => blog.likes).reduce((acc, cur) => acc + cur, 0);
}

function favoriteBlog(blogs) {
    if(blogs.length === 0) return undefined;

    let mostLiked = blogs[0];

    for(const blog of blogs) {
        if(blog.likes > mostLiked.likes) {
            mostLiked = blog;
        }
    }

    return {...mostLiked};
}

module.exports = {dummy, totalLikes, favoriteBlog};
