(function(){
    function AlbumCtrl(Fixtures){
        this.songs=Fixtures.getAlbum().songs;
        this.album=Fixtures.getAlbum();
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl',['Fixtures', AlbumCtrl]);
    
})();