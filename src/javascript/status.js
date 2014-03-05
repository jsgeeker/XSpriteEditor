;define('status',['msg'],function(Msg){
    var msg = new Msg();
    var scene = document.getElementById('scene');
    function Status(){
        this.init();
    };
    Status.prototype = {
        init:function(){
            this.bind();
        },
        filter:function(d){
            var that = this;
            that.data = d;
        },
        bind:function(){
            var that = this;
            msg.listen('updateName',function(d){
                scene.getElementsByClassName('title')[0].innerHTML = 'scene - ' + d;
            });
            msg.listen('fileRead',function(d){
                that.filter(d);
                msg.send('updateName',that.data.name);
            });
        }
    };
    return Status;
});
