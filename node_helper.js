/* Magic Mirror
 * Node Helper: MMM-LyricTime
 *
 * By upgrade_script
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const request = require('request');
const cheerio = require('cheerio');

module.exports = NodeHelper.create({

    start: function() {
      console.log("Starting node helper for: " + this.name);
   
    },
    
   
    //example format should be http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=X-press%202&song=lazy

    // When notification recieved get lyrics from web

    socketNotificationReceived: function(notification, payload) {
	if(notification === "GETLYRICS") {
	    this.url = payload.url;
	    this.artist = payload.artist;
	    this.title = payload.title;
	    // get Lyric 
	    var requestURL = `${this.url}?artist=${this.artist}&song=${this.title}`
	    console.log(requestURL);
	    request({
            url: requestURL,
            method: 'GET'}, (error, response, body) => {
		if (!error && response.statusCode == 200) {
		    console.log(body.Lyric);
		    var result = body; 
		    this.sendSocketNotification('LYRIC-TEXT', result);
		}
	    })
        }
    },
    
		    
});
