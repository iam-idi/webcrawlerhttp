const { normalizeURL,  getURLsFromHTML} = require('./crawl.js');
const { test, expect } = require('@jest/globals')

test( 'normalizeURL strip protocol', () => {
    let input = 'https://blog.boot.dev/path';
    let actual = normalizeURL(input);
    let expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test( 'normalizeURL trailing slashes', () => {
    let input = 'https://blog.boot.dev/path/';
    let actual = normalizeURL(input);
    let expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})
test( 'normalizeURL No capitals', () => {
    let input = 'https://BLOG.boot.dev/path/';
    let actual = normalizeURL(input);
    let expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})
test( 'normalizeURL strip http', () => {
    let input = 'http://blog.boot.dev/path/';
    let actual = normalizeURL(input);
    let expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test( 'getURLsFromHTML', () => {
    let inputHTMLBody = `
    <html>
        <body>
            <a href='https://blog.boot.dev/'> 
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    let baseURL = 'https://blog.boot.dev';

    let actual = getURLsFromHTML(inputHTMLBody, baseURL);
    let expected = [ 'https://blog.boot.dev/' ];
    expect(actual).toEqual(expected);
})