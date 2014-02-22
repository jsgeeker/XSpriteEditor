//aml config
;aml.config({
    path: (!~location.hostname.indexOf('github') ? 'src/javascript/' : 'src/javascript/')
});
;define('init',['util'],function(Util){
    var _ = Util;
    console.log(_)
});
