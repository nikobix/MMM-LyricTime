/* global Module */

/* Magic Mirror
 * Module: MMM-LyricTime
 *
 * By upgrade_script
 * MIT Licensed.
 * 
 * *******************************************************************
 * If you have MMM-GoogleCast installed ---->
 * To get notifictions from GoogleCast on whats playing via ChromeCast
 * modify MMM-GoogleCast.js to include 
 * 'this.sendNotification('GoogleCast', payload);'
 * after 
 * else if (payload.type == "mediaStatus") 
 * {  
 * around row 60-65
 * *******************************************************************
 * 
 */
 
 /*
  * things to add
  * 1/ get lyrics from ChartLyrics Lyric API using chromecast as source song
  * 2/ http://www.chartlyrics.com/api.aspx
  * 3/ display Lyrics
*/
Module.register("MMM-LyricTime", {
	
		// Default module config.
	defaults: {
		updateInterval:   1000, //refresh every 6 hour
		retryDelay: 5000,
		text: "Hello",
		//example format should be http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=X-press%202&song=lazy
		url: "http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect", 
	},
	
	getStyles: function () {
		return [
			"MMM-LyricTime.css",
		];
	},
	
	// Define required scripts.
	getScripts: function() {
		return [];
	},
		// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},
	
	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		this.lyric = "";
		this.lyricArtist = "";
		this.lyricSong = "";
		this.albumArtist = "";
		this.image  = "";
		this.title  = "";
		this.state  = "";
		this.album  = "";
		this.artist = "";
		var self = this;
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
		
	},
	
	sendRequest: function() {
		//this.sendSocketNotification('Lyric', "Send");
	},

	//Listen for notifiaction from GoogleCast
	
	notificationReceived: function(notification, payload, sender) {
		if(sender) {
			if (sender.name === "MMM-GoogleCast") {
				if (payload.type == "mediaStatus"){
					if(payload.title != this.title){
						this.albumArtist = payload.albumArtist;
						this.image = payload.image;
						this.title = payload.title;
						this.state = payload.state;
						this.album = payload.album;
						this.artist = payload.artist;
						//console.log(this.artist);
						//console.log(this.title);
						this.sendSocketNotification('GETLYRICS', {url: this.config.url , artist: this.artist , title: this.title});
					}
				}
			}
		}
			//this.updateDom();
	},
	socketNotificationReceived: function(notification, payload){
		if(notification === "LYRIC-TEXT") {
			this.lyric = this.getLyrics(payload);
			this.lyricArtist = this.getLyricArtist(payload);
			this.lyricSong = this.getLyricSong(payload);
			//console.log(this.lyricArtist);
			//console.log(this.lyricSong);
			//console.log(payload);
		}
	},	
	// create HTML DOM 

	getDom: function() {
			var wrapper = document.createElement("div");
			wrapper.className = "Lyrics";
			var artist = document.createElement("h1");
			artist.innerHTML = this.lyricArtist;
			var song = document.createElement("h2");
			song.innerHTML = this.lyricSong;
			var lyric = document.createElement("p");
			lyric.innerHTML = this.lyric;
			wrapper.appendChild(artist);
			wrapper.appendChild(song);
			wrapper.appendChild(lyric);
			
			return wrapper;
	},
	
	getLyrics: function(payload){
		var start = payload.search("<Lyric>")+7;
		var end = payload.search("</Lyric>");
		//console.log(start + "  " + end);
		return payload.slice(start, end);
		
	},
	getLyricArtist: function(payload){
		var start = payload.search("<LyricArtist>")+13;
		var end = payload.search("</LyricArtist>");
		//console.log(start + "  " + end);
		return payload.slice(start, end);
	},
	getLyricSong: function(payload){
		var start = payload.search("<LyricSong>")+11;
		var end = payload.search("</LyricSong>");
		//console.log(start + "  " + end);
		return payload.slice(start, end);		
	},
});
