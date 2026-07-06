const {test, describe} = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper.js");

test("dummy returns one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
});

describe("total likes", () => {
    const listWithNoBlogs = [];

    const listWithOneBlog = [{
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0
    }];

    const listWithMultipleBlogs = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
            likes: 5,
            __v: 0
        }
    ];

    test("empty list", () => {
        const result = listHelper.totalLikes(listWithNoBlogs);
        assert.strictEqual(result, 0);
    });

    test("one blog", () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        assert.strictEqual(result, 5);
    });

    test("multiple blogs", () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs);
        assert.strictEqual(result, 10);
    });
});

describe("most liked", () => {
    const listWithNoBlogs = [];

    const listWithOneBlog = [{
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0
    }];

    const listWithMultipleBlogs = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
            likes: 5,
            __v: 0
        },
        {
            _id: "7a422aa71b54a676234d17f8",
            title: "Go To Statement",
            author: "Edsger W. Dijkstra",
            url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
            likes: 7,
            __v: 0
        },
        {
            _id: "6a422aa71b54a676234d17f8",
            title: "Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
            likes: 6,
            __v: 0
        }
    ];

    test("empty list", () => {
        const result = listHelper.favoriteBlog(listWithNoBlogs);
        assert.deepStrictEqual(result, undefined);
    })

    test("one blog", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        assert.deepStrictEqual(result, listWithOneBlog[0]);
    })

    test("multiple blogs", () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs);
        assert.deepStrictEqual(result, listWithMultipleBlogs[1]);
    })
})
