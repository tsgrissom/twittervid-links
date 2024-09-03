import * as fs from 'fs';
import * as process from 'process';
import open from 'open';

const newDomain = 'twittervid.com';

function isValidUrl(url) {
    if (typeof url !== 'string') {
        console.log(`Non-string found, will be skipped: ${url}`);
        return false;
    }

    if (!url.includes('twitter.com') && !url.includes('x.com')) {
        console.log(`Non-Twitter URL found, will be skipped: ${url}`);
        return false;
    }
    
    return true;
}

function transformUrl(url) {
    if (!isValidUrl(url)) {
        return null;
    }

    let transformed = url.replace('twitter.com', newDomain);
    transformed = transformed.replace('x.com', newDomain);
    return transformed;
}

fs.readFile(`./links.txt`, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const replace = '- \\[ \\]  ';
    const noPrefix = data.replace(new RegExp(replace, 'g'), '');
    const split = noPrefix.split('\n');

    let skipCount = 0;
    let succCount = 0;

    for (const value of split) {
        const newUrl = transformUrl(value);
        
        if (newUrl==null) {
            skipCount++;
            continue;
        }

        succCount++;
        console.log(newUrl);
        open(newUrl);
    }

    console.log('=====');
    console.log(`All ${split.length} links processed`);
    console.log(` - Success: ${succCount}`);
    console.log(` - Skipped: ${skipCount}`);
});