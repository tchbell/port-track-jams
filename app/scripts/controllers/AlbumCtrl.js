(function(){
    function AlbumCtrl(Fixtures, SongPlayer){
        this.songs=Fixtures.getAlbum().songs;
        this.album=Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl',['Fixtures', 'SongPlayer', AlbumCtrl]);
    
})();