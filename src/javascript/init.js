//aml config
;aml.config({
    path: (!!~location.hostname.indexOf('demo.taobao.net') ? 'http://rawgithub.com/xudafeng/XSpriteEditor/master/src/javascript/' : 'src/javascript/')
});
;define('init',['stage','preview','timer','status'],function(Stage,PreView,Timer,Status){
    var classQuery = arguments;
    function XSpriteEditor(){
        this.init();
        this.cnzz();
    }
    XSpriteEditor.prototype = {
        init:function(){
            for(var i=0;i<classQuery.length;i++){
                new classQuery[i];
            }
        },
        cnzz:function(){
            require("http://s4.cnzz.com/stat.php?id=1642323&web_id=1642323&.js");
        }
    };
    new XSpriteEditor();
});
