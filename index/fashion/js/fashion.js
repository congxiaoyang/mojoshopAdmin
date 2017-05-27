/**
 * Created by dell on 2017/4/19.
 */


// 默认显示的是大图，点击小图选项时，图片上穿的高度变小，并且图片是正方形

$("input[name=picture_size]").click(function () {
    var size = $(this).val();
    if(size == 1){
        $("#storePicBox").removeClass("storePicBig").addClass("storePicSmall")
    }else{
        $("#storePicBox").removeClass("storePicSmall").addClass("storePicBig")
    }
});