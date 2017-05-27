/**
 * Created by dell on 2017/4/5.
 */

//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

//  点击用户名，下拉出来二级菜单

$("#userName").click(function () {
    $("ul.subnav").toggleClass("hide");
});

function load() {

    //    商户端头部文字line-height 非固定，此处设置他的动态line-height
    var logoH = $(".storeHead .headInner .logo img").height();
    var winW = $(window).width();
    var winH = $(window).height();
    var headH = $(".storeHead").height();
    var  mainW;
    var leftMenuW = $(".main-sidebar").width();
    if(winW>1280){
        mainW = winW - leftMenuW;
    }else{
        mainW = 1280- leftMenuW;
    }


    // $(".storeMain").css({"width":mainW,"top":headH,"left":leftMenuW});
    var squareBoxW = $(".squareBox").width();
    $(".squareBox").css("height",squareBoxW);
    var mainH = $(".storeMain").height();

    $("aside.main-sidebar").css({"height":mainH,"min-height":(winH-headH)});

    //    左侧导航栏要等于右侧的高度

    console.log("主体内容高度:"+ mainH);
    console.log("屏幕高度:"+winH);
    console.log("头部高度:"+headH);
    console.log( "可视高度:"+ (winH-headH));

//    上传文件
    var imgW = $(".uploadImg").width();
    var imgH = $(".uploadImg").height();

    $("input[type=file]").css({"width":imgW,"height":imgH})

}

$.extend({'headLoad':function (src) {
    var publicHead = '<div class="headInner clearfix"> ' +
        '<div class="logo fl"> ' +
        '<a href="#"><i class="iconfont">&#xe609;</i></a>' +
        '</div> ' +
        '<div class="fr"> ' +
        '<div class="col-lg-4 col-md-4 col-sm-4 text-left">' +
        ' <a href="#">帮助中心</a> ' +
        '</div> ' +
        '<div class="col-lg-4 col-md-4 col-sm-4 userImg text-center"> <img src="' + src +'public/images/userAvatar.png" alt=""> ' +
        '</div>' +
        ' <div class="col-lg-4 col-md-4 col-sm-4 text-right"> ' +
        '<a href="javascript:void (0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span id="userName" >的吗西亚</span>  <i class="iconfont">&#xe62d;</i></a> <ul class="dropdown-menu"> <li><a href="' + src+'login/retrievePwd.html">更改密码</a></li> </ul> </div> </div> </div>'

    $(".storeHead").html(publicHead);
}});

// $("body").ajaxStop(function () {
//     load();
// })

$(function () {
    load();
})



$(window).resize(function () {
    load();
});

//　　左侧导航栏　

$.sidebarMenu = function(menu) {
    var animationSpeed = 300;

    $(menu).on('click', 'li a', function(e) {
        var $this = $(this);
        var checkElement = $this.next();

        if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function() {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");
        }

        //If the menu is not visible
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $this.parents('ul').first();
            //Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $this.parent("li");

            //Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function() {
                //Add the class active to the parent li
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');
            });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
        }
    });
};

$.sidebarMenu($('.sidebar-menu'));

//  点击左侧菜单栏一级菜单时， 向右的箭头要向下显示

$(".treeview>a").click(function () {

        $(this).find("i").toggleClass("active");

});


//  点击用户名 ，弹出更改子菜单

$(".dropdown-toggle").click(function () {
    $(this).siblings("ul.dropdown-menu").toggleClass("hide")
});

//  时间戳转成时间

function ge_time_format(timestamp){
    if(timestamp){
        var date = new Date(timestamp);
    }else{
        var date = new Date();
    }
    Y = date.getFullYear(),
        m = date.getMonth()+1,
        d = date.getDate(),
        H = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
    if(m<10){
        m = '0'+m;
    }
    if(d<10){
        d = '0'+d;
    }
    if(H<10){
        H = '0'+H;
    }
    if(i<10){
        i = '0'+i;
    }
    if(s<10){
        s = '0'+s;
    }
    var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
    return t;
}

//  点击伪下拉菜单

$(function(){
    // 默认显示

    $(".pubList").find($(".dropdown-toggle")).dropdown();

    $(".pubList").find($(".dropdown-menu li")).click(function () {
        $(this).parents(".dropdown-menu").addClass("hide");
    });
});


//  自动给整数加上.00  的函数

function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x*100)/100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}



//  商品价格输入焦点消失时，自动补上 .00

$(".float_price").blur(function () {
    var price = $(this).val();
    $(this).val(toDecimal2(price));
});
