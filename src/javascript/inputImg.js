;define('inputImg',function(){
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
                    that.playground.style.zoom = MAX_HEIGHT / that.image.height;
                }
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
            that.playground.addEventListener('click', function() {
                if(that.status != 0){
                    return;
                }
                return that.input.click();
            }, false);
            that.input.addEventListener('change', function(e) {
                that.fillPlayGround(e.target.files[0]);
            }, false);
        }
    };
    return InputImg;
});
