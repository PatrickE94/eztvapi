var got = require('got');
var cheerio = require('cheerio');
var Q = require('q');
var magnet = require('magnet-uri');

var base = "http://eztv.ag";

function strToBytes(str) {
  if (!str) return 0;
  var scale = 0;
  if (str.substr(-2) == 'KB') scale = 1000;
  else if (str.substr(-2) == 'MB') scale = 1000*1000;
  else if (str.substr(-2) == 'GB') scale = 1000*1000*1000;
  else if (str.substr(-2) == 'Kb') scale = 1024;
  else if (str.substr(-2) == 'Mb') scale = 1024*1024;
  else if (str.substr(-2) == 'Gb') scale = 1024*1024*1024;
  var num = str.substr(0,str.length-2).trim();
  return num*scale;
}

module.exports = {};

//----------------------------------------------------------------------------//
// Getting Series
//----------------------------------------------------------------------------//
module.exports.series = function getSeries() {
  return got(base + '/showlist/')
    .then(function(data){
      var $ = cheerio.load(data.body);
      var series = [];

      $('.forum_header_border .thread_link').each(function(i, elem) {
        var slug = $(this).attr('href');
        var title = $(this).text();
        series.push({title: title, slug: slug});
      });

      return series;
    });
};

//----------------------------------------------------------------------------//
// Getting Torrents
//----------------------------------------------------------------------------//

function grabTorrents(data) {
  var $ = cheerio.load(data.body);
  var torrents = [];
  $('table tr.forum_header_border').each(function(i, elem) {
    var el = cheerio.load(elem);
    var mag = magnet.decode(el(".magnet").attr('href'));
    var epinfo = el(".epinfo");
    var size = epinfo.attr("title").replace(epinfo.text(), '').match(/\(([^\)]*)\)/)[1];
    var seeds = el(".forum_thread_post:nth-last-child(2)");
    var released = el(".forum_thread_post:nth-last-child(3)");
    size = strToBytes(size);
    torrents.push({
      title: el(".epinfo").text(),
      link: base + el(".epinfo").attr('href'),
      magnet: el(".magnet").attr('href'),
      hash: mag.infoHash,
      size: size,
      seeds: Number(seeds.text().replace(/\D/, '')),
      released: released.text()
    });
  });
  return torrents;
}

module.exports.seriesTorrents = function getTorrents(show) {
  return got(base + show.slug).then(grabTorrents);
};

module.exports.search = function search(query) {
  return got(base + '/search/' + encodeURIComponent(query)).then(grabTorrents);
};
