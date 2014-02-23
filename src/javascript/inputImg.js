;define('inputImg',['util'],function(_){
    var MAX_HEIGHT = 600;
    function InputImg(){
        this.playground = document.getElementById('playground');
        this.ctx = this.playground.getContext("2d");
        this.input = document.getElementById('input');
        this.status = 0;
        this.init();
    };
    InputImg.prototype = {
        init:function(){
            this.bind();
        },
        fillPlayGround:function(s){
            var that = this;
            that.readFile(s);
        },
        readFile:function(s){
            var that = this;
            var detector = window.File && window.FileReader && window.FileList && window.Blob;
            if (!detector) {
                alert('The File APIs are not fully supported in this browser.');
                return;
            }
            that.reader = new FileReader();
            that.reader.readAsDataURL(s);
	        that.reader.onload = function(e){
                that.fillImg(this.result);
	        }
        },
        fillImg:function(s){
            var that = this;
            that.image = new Image(); 
            that.image.onload = function(){ 
                if(that.image.height > MAX_HEIGHT) {
                    that.zoom = MAX_HEIGHT / that.image.height;
                }else{
                    that.zoom = 1;
                }
                that.playground.style.zoom = that.zoom;
                that.ctx.clearRect(0, 0, that.ctx.width, that.ctx.height);
                that.playground.width = that.image.width;
                that.playground.height = that.image.height;
                that.ctx.drawImage(that.image, 0, 0, that.image.width, that.image.height);
                that.status = 1;
            }
            that.image.src = s;
        },
        bind:function(){
            var that = this;
            that.playground.addEventListener('click', function(e) {
                if(that.status == 0){
                    return that.input.click();
                }
                console.log(e)
            }, false);
            that.playground.addEventListener('mousemove', function(e) {
                if(that.status == 0){
                    return;
                }
                that.detectMouse(e.offsetX/that.zoom,e.offsetY/that.zoom);
            }, false);
            that.input.addEventListener('change', function(e) {
                that.fillPlayGround(e.target.files[0]);
            }, false);
        },
        detectMouse:function(x,y){
            var that = this;
            var pixel = that.ctx.getImageData(x,y,1,1).data;
            var pixcolor = "rgba(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + "," + pixel[3] + ")";
            if(pixcolor == 'rgba(0,0,0,0)'){
                that.playground.style.cursor = 'default';
                that.playground.title = '此区域不可点';
            }else{
                that.playground.style.cursor = 'pointer';
                that.playground.title = '请点击选中';
            }
        }
    };
    return InputImg;
});
