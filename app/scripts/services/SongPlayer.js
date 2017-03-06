(function(){
    function SongPlayer($rootScope,Fixtures){
        var SongPlayer={};
        
        /**@desc gets current album from Fixtures
        *@type Method
        */
        var currentAlbum =
        Fixtures.getAlbum();
        
      
        
        
        /**function getSongIndex
        *@desc returns index of song from current album
        *@param {Object} song
        */
        
        
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        *@desc active song object audio file
        *@type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        *@function setSong
        *@desc Stops currently playing song and loads new audio file and currentBuzzObject
        *@param {Object} song
        */
        
       var setSong = function(song) {
           currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
           });
           SongPlayer.currentSong = song;

           if (currentBuzzObject) {
               currentBuzzObject.stop();
               SongPlayer.currentSong.playing = null;
            }

       };
        
        /**
        *@function playSong
        *@desc plays currentBuzzObject and sets song.playing to true
        *@param {Object} song
        */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
            
            
        };
        
        SongPlayer.currentSong=null;
        
        SongPlayer.play = function(song){
            song=song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song){
                setSong(song);
                playSong(song);
                
            }else if(SongPlayer.currentSong === song){
                if(currentBuzzObject.isPaused()){
                    playSong(song);
                }
            }
        };
        
        SongPlayer.pause = function(song){
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
            
        };
        
        /**@function SongPlayer.previous
        *changes the index of currently playing song back by 1. If index of song is less than zero stop song
        *@param {Object}
        */
        SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;

     if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
     }else {
         currentBuzzObject.stop();
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };

        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
    
    
})();