# MMM-LyricTime - MagicMirror Module
Display song Lyrics depending on whats playing
Using the GoogleCast module from FerFerga with some small modifications

Modification to te GoogleCast MMM-GoogleCast.js file to inclue a 

this.sendNotification('GoogleCast', payload);

at around row 62  
	}
		else if (payload.type == "mediaStatus")
		{	this.sendNotification('GoogleCast', payload); //<------------------------------------
			this.albumArtist = payload.albumArtist;
			this.image = payload.image;
			this.title = payload.title;
			this.state = payload.state;
			this.album = payload.album;
			this.artist = payload.artist;
			if (this.albumArtist == null && this.image == null && this.title == null && this.album == null && this.artist == null) // removed this.albumArtist == null && 
			{
				this.media = false;
        
        LyricTime will pick up this notification from the first transmission and search for lyrics from 
        
        http://www.chartlyrics.com/api.aspx
        
        Not always correct lyric and there is no specific control, this is a trial module with much work needed before publish
        
        To have;
        1. Correct lyrics - maybe use a selection of lyric sites
        2. set time code to scroll lyrics with the music
        3. format the DOM better
        4. option to disable lyrics, or perhaps set for another screen!
	5. intergrate other media player notifications
