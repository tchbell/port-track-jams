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
        *@desc Current playback time (in seconds) of currently playing song
        *@type (Number)
        */
        SongPlayer.currentTime = null;
        
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
               stopSong(song);
            }
           
           currentBuzzObject.bind('timeupdate', function() {
               $rootScope.$apply(function() {
                   SongPlayer.currentTime = currentBuzzObject.getTime();
               });
           });

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
        
        var stopSong = function(song){
            currentBuzzObject.stop();
            song.playing = null;
        }
        
        SongPlayer.currentSong=null;
        
        SongPlayer.play = function(song){
            song=song || SongPlayer.currentSong;
            if(SongPlayer.currentSong===null){
                setSong(song);
                playSong(song);
            }else if (SongPlayer.currentSong !== song){
                stopSong(SongPlayer.currentSong);
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
                stopSong(SongPlayer.currentSong);
            }else {
                stopSong(SongPlayer.currentSong);
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            stopSong(SongPlayer.currentSong);
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
            
        };
        
        /**
        *@function setCurrentTime
        *@desc Set current time (in seconds) of currently playing song
        *@param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject){
                currentBuzzObject.setTime(time);
            };
        };
        
        SongPlayer.volume=40;
        
        SongPlayer.setVolume = function(volume){  currentBuzzObject.setVolume(volume);
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
    
    
})();