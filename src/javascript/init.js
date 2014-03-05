//aml config
;aml.config({
    path: (!~location.hostname.indexOf('github') ? 'src/javascript/' : 'src/javascript/')
});
;define('init',['util','inputImg','preview','timer','status'],function(Util,InputImg,PreView,Timer,Status){
    var _ = Util;
    function XSpriteEditor(){
        this.init();
    }
    XSpriteEditor.prototype = {
        init:function(){
            this.status = 0;
            this.inputImg();
            this.preView();
            this.timer();
            this.sta();
        },
        inputImg:function(){
            new InputImg();
        },
        preView:function(){
            new PreView();
        },
        timer:function(){
            new Timer();
        },
        sta:function(){
            new Status();
        },
        bind:function(){
            
        }
    };
    new XSpriteEditor();
});
