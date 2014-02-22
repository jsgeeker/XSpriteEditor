//aml config
;aml.config({
    path: (!~location.hostname.indexOf('github') ? 'src/javascript/' : 'src/javascript/')
});
;define('init',['util','inputImg'],function(Util,InputImg){
    var _ = Util;
    function XSpriteEditor(){
        this.init();
    }
    XSpriteEditor.prototype = {
        init:function(){
            this.status = 0;
            this.inputImg();
        },
        inputImg:function(){
            new InputImg();
        },
        bind:function(){
            
        }
    };
    new XSpriteEditor();
});
