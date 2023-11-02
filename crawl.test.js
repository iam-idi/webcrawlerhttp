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

test( 'getURLsFromHTML absolute', () => {
    let inputHTMLBody = `
    <html>
        <body>
            <a href='https://blog.boot.dev/path/'> 
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    let baseURL = 'https://blog.boot.dev/path/';

    let actual = getURLsFromHTML(inputHTMLBody, baseURL);
    let expected = [ 'https://blog.boot.dev/path/' ];
    expect(actual).toEqual(expected);
})

test( 'getURLsFromHTML relative', () => {
    let inputHTMLBody = `
    <html>
        <body>
            <a href='/path/'> 
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    let baseURL = 'https://blog.boot.dev';

    let actual = getURLsFromHTML(inputHTMLBody, baseURL);
    let expected = [ 'https://blog.boot.dev/path/' ];
    expect(actual).toEqual(expected);
})
test( 'getURLsFromHTML both', () => {
    let inputHTMLBody = `
    <html>
        <body>
            <a href='https://blog.boot.dev/path1/'> 
                Boot.dev blog path one
            </a>
            <a href='/path2/'> 
                Boot.dev blog path two
            </a>
        </body>
    </html>
    `
    let baseURL = 'https://blog.boot.dev';

    let actual = getURLsFromHTML(inputHTMLBody, baseURL);
    let expected = [ 'https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/' ];
    expect(actual).toEqual(expected);
})

test( 'getURLsFromHTML invalid', () => {
    let inputHTMLBody = `
    <html>
        <body>
            <a href='invalid'> 
                invalid
            </a>
        </body>
    </html>
    `
    let baseURL = 'https://blog.boot.dev';

    let actual = getURLsFromHTML(inputHTMLBody, baseURL);
    let expected = [];
    expect(actual).toEqual(expected);
})