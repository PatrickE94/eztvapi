# EZTV.ag API

Very crude and volatile parser for EZTV.ag.

## Api

### Series page
Grabs series titles and slugs.

```
var eztv = require('eztv');
eztv
  .series("a")
    .then(function(series) {
      // Series is now an array of objects with the structure:
      // { title: '', slug: '' }
    })
    .catch(function(err) {
      // Handle error
    });
```

### Grab torrents for a series
Grabs as much torrent data as possible for every torrent associated with a series.

```
var eztv = require('eztv');
eztv
  .seriesTorrents(series)
    .then(function(torrents) {
      // Torrents is now an array of objects
      // {
      //    title: 'TITLE',
      //    link: 'absolute link!',
      //    magnet: 'MAGNET URI',
      //    hash: 'HASH',
      //    size: 0/*bytes*/,
      //    seeds: 0,
      //    released: '2d 9h'
      // }
    })
    .catch(function(err) {
      // Handle error
    });
```

### Search
Uses the eztv.ag search and returns torrents.

```
var eztv = require('eztv');
eztv
  .search("blacklist")
    .then(function(torrents) {
      // Torrents is now an array of objects
      // {
      //    title: 'TITLE',
      //    link: 'absolute link!',
      //    magnet: 'MAGNET URI',
      //    hash: 'HASH',
      //    size: 0/*bytes*/,
      //    seeds: 0, /* Seeds will always be zero since the seeds are not present on the series page. */
      //    released: '2d 9h'
      // }
    })
    .catch(function(err) {
      // Handle error
    });
```

## License

The MIT License (MIT)

Copyright (c) 2015 Patrick Engström

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
