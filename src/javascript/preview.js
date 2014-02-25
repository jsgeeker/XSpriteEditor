;define('preview',['msg'],function(Msg){
    var msg = new Msg();
    var WIDTH = 300,
        HEIGHT = 300;
    function PreView(){
        this.preview = document.getElementById('preview');
        this.ctx = this.preview.getContext('2d');
        this.init();
    };
    PreView.prototype = {
        init:function(){
            this.addLine();
            this.bindEvent();
        },
        addLine:function(){
            var that = this;
            var canvas = that.ctx;
            canvas.strokeStyle = "#999";
            canvas.lineWidth = 1;
            canvas.beginPath();
            canvas.moveTo(WIDTH/2, WIDTH/3);
            canvas.lineTo(WIDTH/2, WIDTH*2/3);
            canvas.moveTo(WIDTH/3, WIDTH/2);
            canvas.lineTo(WIDTH*2/3, WIDTH/2);
            canvas.closePath();
            canvas.stroke();
        },
        bindEvent:function(){
            var that = this;
            msg.listen('selected',function(d){
                that.clear();
                that.drawImg(d);
            });
        },
        drawImg:function(d){
            var that = this;
            that.data = d.data;
            that.rect = d.rect;
            that.x = (WIDTH-that.rect.width)/2;
            that.y = (HEIGHT - that.rect.height)/2;
            that.ctx.putImageData(that.data,that.x,that.y);
        },
        clear:function(){
            var that = this;
            if(!that.data){
                return;
            }
            that.ctx.clearRect(that.x,that.y,that.rect.width,that.rect.height);
        },
        storage:function(){
            
        }
    };
    return PreView;
});
