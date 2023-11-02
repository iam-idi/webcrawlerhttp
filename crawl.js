const {JSDOM} = require('jsdom');

function getURLsFromHTML(HTMLBody, baseURL){

    const urls = [];
    const dom = new JSDOM(HTMLBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    
    for(const linkElement of linkElements){

        if(linkElement.href.slice(0, 1) === '/'){
            //relative path
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href)
            } catch(err){
                console.log(`Error with relative path: ${err.message}`)
            }
            
        } else {
            // absolute path
            try{
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href)
            } catch(err){
                console.log(`Error with absolute path: ${err.message}`)
            }
        }
    }
    return urls;
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if( hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1);
    }

    return hostPath;
}


module.exports = {
    normalizeURL,
    getURLsFromHTML
}

// try{
//     const urlObj = new URL('linkElement.href');
//     console.log(urlObj)
// } catch(err){
//     console.log(`error:${err.message}`)
// }
