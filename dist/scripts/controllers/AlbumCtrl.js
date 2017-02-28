(function(){
    function AlbumCtrl(){
        this.songs=albumPicasso.songs;
        this.album=albumPicasso;
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
    
})();