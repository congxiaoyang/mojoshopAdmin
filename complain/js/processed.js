/**
 * Created by dell on 2017/4/22.
 */

// ========================================  以处理投诉  ===========================================

//  这个页面的tbody变量 ，便于后面使用

var tbody = $("#processed_tbody");

// 分页 加载数据函数
function pageLoad(curr) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/complain/processed",
        dataType:"json",
        data:{
            "page":curr || 1,
            "rows":2    //显示的行数
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var status = arr.status;  // 返回状态值
            var data = arr.data.Complain;   //  数据
            // var tbody = $("#processed_tbody");  //  tbody;
            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){

                        var dataStatus;     // 签收状态
                        if(data[i].status == 1){
                            dataStatus = "已处理"
                        }else{
                            dataStatus = "未处理"
                        }

                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td>'+ data[i].id +'</td> ' +   //编号
                            '<td>'+ data[i].userName +'</td> ' +  // 用户昵称
                            '<td>'+ data[i].userCode +'</td> ' +  // 用户账号
                            '<td>'+ data[i].storeName +'</td> ' +  // 商家名称
                            '<td>'+ data[i].storeEmail +'</td> ' +  // 商品账号
                            '<td class="name">'+ data[i].content +'</td> ' +  // 投诉内容
                            '<td><img src="' + data[i].images + '" alt="图片加载失败"></td> ' +  //  投诉图片
                            '<td> <p>'+ge_time_format(data[i].createTime)+'</p></td> ' +   //创建时间
                            '<td> ' +
                            '<a href="javascript:void (0)" class="operateIcon deleteBtn"><i class="iconfont">&#xe601;</i></a>' +
                            '</td> ' +
                                '<td>'+ dataStatus +'</td>'+
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
                        pageLoad(obj.curr);
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
    pageLoad(1);
});

// 点击 删除

tbody.delegate(".deleteBtn","click",function(){
    var _this = $(this);
    var id = $(this).parents("tr").attr("data-id").trim();
    console.log(id);
    $('#btn-dialogBox').dialogBox({
        hasClose: true,
        hasBtn: true,
        confirmValue: '确定',
        confirm: function(){
            // 这里写数据传递
            $.ajax({
                type:"get",
                url:"http://192.168.1.111:8081/manager/complain/delete",
                dataType:"json",
                data:{"id":id},
                success:function (arr) {
                    var backStatus = arr.status;
                    if(backStatus == 200){
                        _this.parents("tr").remove();
                        notie.alert(1, '删除成功!', 2);
                    }else{
                        notie.alert(3, '服务器繁忙，请稍后重试', 2);
                    }

                },
                error:function () {
                    notie.alert(3, '服务器繁忙，请稍后重试', 2);
                }
            });
        },
        cancelValue: '取消',
        title: '删除',
        content: '删除之后不可恢复，确定要删除么'
    });
});


//  ===========================================================  搜索  ============================================

//  搜索函数
function searchPageLoad(curr,searchCon) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/complain/processed",
        dataType:"json",
        data:{
            "page":curr || 1,
            "rows":5,    //显示的行数
            "search":searchCon    // 搜索内容
        },
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var status = arr.status;  // 返回状态值
            var data = arr.data.Complain;   //  数据
            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){

                        var dataStatus;     // 签收状态
                        if(data[i].status == 1){
                            dataStatus = "已处理"
                        }else{
                            dataStatus = "未处理"
                        }

                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td>'+ data[i].id +'</td> ' +   //编号
                            '<td>'+ data[i].userName +'</td> ' +  // 用户昵称
                            '<td>'+ data[i].userCode +'</td> ' +  // 用户账号
                            '<td>'+ data[i].storeName +'</td> ' +  // 商家名称
                            '<td>'+ data[i].storeEmail +'</td> ' +  // 商品账号
                            '<td class="name">'+ data[i].content +'</td> ' +  // 投诉内容
                            '<td><img src="' + data[i].images + '" alt="图片加载失败"></td> ' +  //  投诉图片
                            '<td> <p>'+ge_time_format(data[i].createTime)+'</p></td> ' +   //创建时间
                            '<td> ' +
                            '<a href="javascript:void (0)" class="operateIcon deleteBtn"><i class="iconfont">&#xe601;</i></a>' +
                            '</td> ' +
                            '<td>'+ dataStatus +'</td>'+
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

//  点击搜索  按条件搜索
$(".searchIcon a").click(function () {
    var searchCon = $("#search").val();
    searchPageLoad(1,searchCon);
});


$("#search").keyup(function(event){
    if(event.keyCode == 13){
        var searchCon = $("#search").val();
        searchPageLoad(1,searchCon);
    }
});