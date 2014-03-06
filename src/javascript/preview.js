;define('preview',['msg'],function(Msg){
    var msg = new Msg();
    var WIDTH = 300,
        HEIGHT = 300;
    var SPEED = 20;
    window.requestAnimFrame = (function(){
        return window.requestAnimationFrame||
            window.webkitRequestAnimationFrame||
            window.mozRequestAnimationFrame||
            window.oRequestAnimationFrame||
            window.msRequestAnimationFrame||
            function(callback,element){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    var up = document.getElementById('up'),
        right = document.getElementById('right'),
        down = document.getElementById('down'),
        left = document.getElementById('left'),
        prev = document.getElementById('prev'),
        next = document.getElementById('next'),
        run = document.getElementById('run'),
        stop = document.getElementById('stop'),
        big = document.getElementById('big'),
        small = document.getElementById('small');
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
                msg.send('timerView',{
                    query:that.query,
                    current:that.index
                });
            });
            up.addEventListener('click',function(e){
                that.stop();
                that.up();
                that.drawView();
            });
            down.addEventListener('click',function(e){
                that.stop();
                that.down();
                that.drawView();
            });
            left.addEventListener('click',function(e){
                that.stop();
                that.left();
                that.drawView();
            });
            right.addEventListener('click',function(e){
                that.stop();
                that.right();
                that.drawView();
            });
            run.addEventListener('click',function(e){
                that.run();
            });
            stop.addEventListener('click',function(e){
                that.stop();
            });
            small.addEventListener('click',function(e){
                SPEED++;
            });
            big.addEventListener('click',function(e){
                if(SPEED == 1){
                    return;
                }
                SPEED--;
            });
            next.addEventListener('click',function(){
                that.stop();
                that.next();
            });
            prev.addEventListener('click',function(){
                that.stop();
                that.prev();
            });
            msg.listen('timerClick',function(d){
                var i = parseInt(d);
                that.stop();
                that.index = i;
                that.drawView();
                msg.send('timerView',{
                    query:that.query,
                    current:that.index
                });
            });
        },
        up:function(){
            var that = this;
            that.query[that.index].offset.y--;
        },
        down:function(){
            var that = this;
            that.query[that.index].offset.y++;
        },
        left:function(){
            var that = this;
            that.query[that.index].offset.x--;
        },
        right:function(){
            var that = this;
            that.query[that.index].offset.x++;
        },
        run:function(num){
            var that = this;
            var loop = 0;
            that.loop = function(){
              loop ++;
              if(loop >= SPEED){
                loop = 0;
                that.animation();
              }
              if(!that.loop){
                return;
              }
              requestAnimFrame(that.loop);
            };
            that.loop();
        },
        stop:function(){
            var that = this;
            that.loop = null;
        },
        next:function(){
            var that = this;
            if(that.index == that.query.length-1){
                return;
            }
            that.index ++;
            that.drawView();
            msg.send('timerView',{
                query:that.query,
                current:that.index
            });

        },
        prev:function(){
            var that = this;
            if(that.index ==0){
                return;
            }
            that.index --;
            that.drawView();
            msg.send('timerView',{
                query:that.query,
                current:that.index
            });
        },
        drawView:function(){
            var that = this;
            var data = that.query[that.index];
            that.drawImg(data);
        },
        drawImg:function(d){
            var that = this;
            that.clear();
            that.data = d.data;
            that.rect = d.rect;
            that.offset = d.offset;
            that.x = (WIDTH - that.rect.width)/2 + that.offset.x;
            that.y = (HEIGHT - that.rect.height)/2 + that.offset.y;
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
            that.index = that.query.length - 1;
        },
        export:function(){
            var that = this;
        },
        animation:function(){
            var that = this;
            if(that.index == that.query.length - 1){
                that.index = 0;
            }else{
                that.index ++;
            }
            that.drawView();
            msg.send('timerView',{
                query:that.query,
                current:that.index
            });
        }
    };
    return PreView;
});
