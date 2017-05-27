/**
 * Created by dell on 2017/4/22.
 */


// ========================================  商户信息列表  ===========================================

//  这个页面的tbody变量 ，便于后面使用

var tbody = $("#mer_infoList");

// 分页 加载数据函数
function pageLoad(curr,searchCon) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/store/search",
        dataType:"json",
        data:{
            "page":curr || 1,
            "rows":2,    //显示的行数
            "search":searchCon
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var status = arr.status;  // 返回状态值
            var data = arr.data.store;   //  数据

            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){

                        var type;     // 分类
                        if(data[i].type == 1){
                            type = "留学/出境";
                        }else if(data[i].type == 2){
                            type = "生活服务";
                        }else if(data[i].type == 3){
                            type = "时尚购物";
                        }


                        var store_status;     // 运营状态
                        if(data[i].status == 0){
                            store_status = "正常"
                        }else{
                            store_status = "停用"
                        }

                        str += '<tr data-id = "' + data[i].storeId+'">' +
                            '<td class="wideTd">'+ data[i].storeId +'</td> ' +   //编号
                            '<td>'+ type +'</td> ' +   //分类
                            '<td><img src="' + data[i].logo + '" class="img-circle" alt="图片加载失败"></td> ' +  //  logo
                            '<td>'+ data[i].storeName +'</td> ' +  // 名称
                            '<td>'+ data[i].name +'</td> ' +  // 姓名
                            '<td>'+ data[i].tel +'</td> ' +  // phone

                            '<td class="wideTd" title="'+ ge_time_format(data[i].loginTime)+'"> <p>'+ge_time_format(data[i].loginTime)+'</p></td> ' +   //登录时间
                            '<td>'+ store_status +'</td>'+  // 状态
                            '<td> ' +
                            '<a href="#" class="changeBtn ml-10"><i class="iconfont">&#xe630;</i></a>' +
                            '</td> ' +

                            '</tr>';
                    }

                    tbody.html(str);
                }

            }else{
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
            //显示分页
            laypage({
                cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: arr.data.pages, //通过后台拿到的总页数
                curr: curr || 1, //当前页
                jump: function(obj, first){ //触发分页后的回调
                    if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                        pageLoad(obj.curr,searchCon);
                    }
                },
                first:false,
                last:false
            });

        },
        error:function () {
            notie.alert(3, '服务器繁忙，请稍后重试', 2);
        }
    })
}

$(function () {
    pageLoad(1,"");
});


//  ===========================================================  搜索  ============================================

//  点击搜索  按条件搜索
$(".searchIcon a").click(function () {
    var searchCon = $("#search").val();
    pageLoad(1,searchCon);
});


$("#search").keyup(function(event){
    if(event.keyCode == 13){
        var searchCon = $("#search").val();
        pageLoad(1,searchCon);
    }
});

//  监听搜索框中的值，如果值为空，重新请求

$('#search').bind('input propertychange', function() {
    if($(this).val()==""){
        pageLoad(1,"");
    }
});


//  点击修改去修改页面
tbody.delegate(".changeBtn","click",function () {
    var id = $(this).parents("tr").attr("data-id");
    window.location.href="details.html?id="+id;
});