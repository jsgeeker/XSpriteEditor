//aml config
;aml.config({
    path: (!~location.hostname.indexOf('github') ? 'src/javascript/' : 'src/javascript/')
});
;define('init',['util'],function(Util){
    var _ = new Util();
    console.log(_)
});
