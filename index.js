var fs = require('fs');
var ytdl = require('ytdl-core');

ytdl('https://www.youtube.com/watch?v=6fozur9Hbw8',
// ytdl('https://www.youtube.com/watch?v=QLHbiQ8Q57M',
// ytdl('https://www.youtube.com/watch?v=GPNU3UlJros',
{ filter: function(format) { return format.container === 'mp4'; } })
  .pipe(fs.createWriteStream('public/vid/video3.mp4'));
