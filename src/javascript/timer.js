;define('timer',['msg','util'],function(Msg,_){
    var msg = new Msg();
    var layers = document.getElementById('layers');
    function Timer(){
        this.init();
    };
    Timer.prototype = {
        init:function(){
            this.bind();
        },
        upDateView:function(){
            var that = this;
            layers.innerHTML = '';
            _.each(that.query,function(i,key){
                var _key = key.charAt(key.length-1);
                var elm = document.createElement("li");
                elm.id = 'J_frame'+ key;
                elm.innerHTML = _key;
                layers.appendChild(elm);
            });
        },
        bind:function(){
            var that = this;
            msg.listen('timerView',function(query){
                that.query = query;
                that.upDateView();
            });
        }
    };
    return Timer;
});
