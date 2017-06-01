/**
 * Created by dell on 2017/4/22.
 */

// ========================================  用户管理  ===========================================

//  这个页面的tbody变量 ，便于后面使用

var tbody = $("#user_basicInfo_tbody");

// 分页 加载数据函数
function pageLoad(curr,putawayStatus) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/user/list",
        dataType:"json",
        data:{
            "page":curr || 1,
            "rows":20,    //显示的行数
            "status":putawayStatus
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var status = arr.status;  // 返回状态值
            var data = arr.data.user;   //  数据

            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){

                        var dataStatus;     // 签收状态
                        var color= "";
                        if(data[i].status == 1){
                            dataStatus = "停用";
                            color = "redMark";
                        }else{
                            dataStatus = "正常";
                        }


                        var sex;     // 性别
                        if(data[i].sex == 1){
                            sex = "男"
                        }else{
                            sex = "女"
                        }

                        var city;
                        if(data[i].city==null){
                            city = "-";
                        }else{
                            city = data[i].city;
                        }

                        var createDateAndTime = ge_time_format(data[i].createTime).split(" ");
                        var createDate = createDateAndTime[0];
                        var createTime = createDateAndTime[1];

                        var loginDateAndTime = ge_time_format(data[i].loginTime).split(" ");
                        var loginDate = loginDateAndTime[0];
                        var loginTime = loginDateAndTime[1];

                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td class="wideTd">'+ data[i].id +'</td> ' +   //编号
                            '<td>'+ data[i].niceName +'</td> ' +   //昵称
                            '<td><img src="' + data[i].avatar + '" class="img-circle img-largen" alt="图片加载失败"></td> ' +  //  头像
                            '<td class="wideTd">'+ data[i].email +'</td> ' +  // 邮箱
                            '<td>'+ sex +'</td> ' +  // 性别
                            '<td>'+ data[i].grades +'</td> ' +  // 等级
                            '<td>'+ city +'</td> ' +  // 城市

                            '<td class="wideTd date"> <p>'+ loginDate +'</p><p>'+ loginTime +'</p></td> ' +   //登录时间
                            '<td class="wideTd date"> <p>'+ createDate +'</p><p>'+ createTime +'</p></td> ' +   //创建时间
                            '<td class="'+color+'">'+ dataStatus +'</td>'+  // 状态
                            '<td> ' +
                            '<a href="javascript:void (0)" class="operateIcon deleteBtn"><i class="iconfont">&#xe601;</i></a>' +
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
                        pageLoad(obj.curr,putawayStatus);
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
    pageLoad(1,0);
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
                url:"http://192.168.1.111:8081/manager/user/delete",
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



//  点击 "状态" 下拉框，选择上架和下架 渲染在页面上

$(".status_search").click(function () {

    var status = $(this).attr("data-value");

    pageLoad(1,status)

});

//  ===========================================================  搜索  ============================================

//  搜索函数
function searchPageLoad(curr,putawayStatus,searchCon) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/user/list",
        dataType:"json",
        data:{
            "page":curr || 1,
            "rows":20,    //显示的行数
            "status":putawayStatus,
            "search":searchCon    // 搜索内容
        },
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var status = arr.status;  // 返回状态值
            var data = arr.data.user;   //  数据
            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){

                        var dataStatus;     // 签收状态
                        var color="";
                        if(data[i].status == 1){
                            dataStatus = "正常";
                        }else{
                            dataStatus = "异常";
                            color = "redMark";
                        }


                        var sex;     // 性别
                        if(data[i].sex == 1){
                            sex = "正常"
                        }else{
                            sex = "异常"
                        }

                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td>'+ data[i].id +'</td> ' +   //编号
                            '<td>'+ data[i].niceName +'</td> ' +   //编号
                            '<td><img src="' + data[i].avatar + '" class="img-circle" alt="图片加载失败"></td> ' +  //  头像
                            '<td>'+ data[i].email +'</td> ' +  // 邮箱
                            '<td>'+ sex +'</td> ' +  // 性别
                            '<td>'+ data[i].grades +'</td> ' +  // 等级
                            '<td>'+ data[i].city +'</td> ' +  // 城市

                            '<td> <p>'+ge_time_format(data[i].loginTime)+'</p></td> ' +   //登录时间
                            '<td> <p>'+ge_time_format(data[i].createTime)+'</p></td> ' +   //创建时间
                            '<td class="'+color+'">'+ dataStatus +'</td>'+  // 状态
                            '<td> ' +
                            '<a href="javascript:void (0)" class="operateIcon deleteBtn"><i class="iconfont">&#xe601;</i></a>' +
                            '<a href="#" class="changeBtn"><i class="iconfont">&#xe630;</i></a>' +
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
                        pageLoad(obj.curr,putawayStatus,searchCon);
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
    searchPageLoad(1,0,searchCon);
});


$("#search").keyup(function(event){
    if(event.keyCode == 13){
        var searchCon = $("#search").val();
        searchPageLoad(1,0,searchCon);
    }
});

//  监听搜索框中的值，如果值为空，重新请求

$('#search').bind('input propertychange', function() {
    if($(this).val()==""){
        pageLoad(1,0);
    }
});


//  点击修改去修改页面
tbody.delegate(".changeBtn","click",function () {
    var id = $(this).parents("tr").attr("data-id");
    window.location.href="change.html?id="+id;
});