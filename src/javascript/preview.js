;define('preview',['msg'],function(Msg){
    var msg = new Msg();
    var WIDTH = 300,
        HEIGHT = 300;
    var up = document.getElementById('up'),
        right = document.getElementById('right'),
        down = document.getElementById('down'),
        left = document.getElementById('left'),
        prev = document.getElementById('prev'),
        next = document.getElementById('next'),
        start = document.getElementById('start'),
        stop = document.getElementById('stop');
    function PreView(){
        this.preview = document.getElementById('preview');
        this.ctx = this.preview.getContext('2d');
        this.init();
    };
    PreView.prototype = {
        init:function(){
            this.addLine();
            this.bindEvent();
            this.query = [];
        },
        addLine:function(){
            var that = this;
            var canvas = that.ctx;
            canvas.strokeStyle = "rgba(100, 100, 100, 0.4)";
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
                that.storage(d);
                that.drawView();
                msg.send('timerView',that.query);
            });
            up.addEventListener('click',function(e){
                that.up();
                that.drawView();
            });
            down.addEventListener('click',function(e){
                that.down();
                that.drawView();
            });
            left.addEventListener('click',function(e){
                that.left();
                that.drawView();
            });
            right.addEventListener('click',function(e){
                that.right();
                that.drawView();
            });
        },
        up:function(){
            var that = this;
            that.query[that.index].rect.y--;
        },
        down:function(){
            var that = this;
            that.query[that.index].rect.y++;
        },
        left:function(){
            var that = this;
            that.query[that.index].rect.x--;
        },
        right:function(){
            var that = this;
            that.query[that.index].rect.x++;
        },
        drawView:function(){
            var that = this;
            var data = that.query[that.index];
            console.log(data)
            that.drawImg(data);
        },
        drawImg:function(d){
            var that = this;
            that.clear();
            that.data = d.data;
            that.rect = d.rect;
            that.x = (WIDTH-that.rect.width)/2;
            that.y = (HEIGHT - that.rect.height)/2;
            that.ctx.putImageData(that.data,that.x,that.y);
            that.addLine();
        },
        clear:function(){
            var that = this;
            if(!that.data){
                return;
            }
            that.ctx.clearRect(0,0,WIDTH,HEIGHT);
        },
        storage:function(d){
            var that = this;
            that.query.push(d);
            that.index = that.query.length-1;
        }
    };
    return PreView;
});
