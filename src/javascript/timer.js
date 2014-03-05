;define('timer',['msg'],function(Msg){
    var msg = new Msg();
    function Timer(){
        this.init();
    };
    Timer.prototype = {
        init:function(){
        }
    };
    return Timer;
});
