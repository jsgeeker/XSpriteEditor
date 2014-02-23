//aml config
;aml.config({
    path: (!~location.hostname.indexOf('github') ? 'src/javascript/' : 'src/javascript/')
});
;define('init',['util','inputImg','preview'],function(Util,InputImg,PreView){
    var _ = Util;
    function XSpriteEditor(){
        this.init();
    }
    XSpriteEditor.prototype = {
        init:function(){
            this.status = 0;
            this.inputImg();
            this.preView();
        },
        inputImg:function(){
            new InputImg();
        },
        preView:function(){
            new PreView();
        },
        bind:function(){
            
        }
    };
    new XSpriteEditor();
});
