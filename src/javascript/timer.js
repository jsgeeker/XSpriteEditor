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
            _.each(that.query,function(i,key){
                var elm = document.createElement("li");
                elm.innerHTML = key;
                layers.appendChild(elm);
            });
        },
        bind:function(){
            var that = this;
            msg.listen('timerView',function(query){
                that.query = [1,2,3,4,5,6]||query;
                that.upDateView();
            });
        }
    };
    return Timer;
});
