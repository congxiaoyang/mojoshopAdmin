/**
 * Created by dell on 2017/4/26.
 */


var tbody = $("#search_body");


// 分页 加载数据函数
function pageLoad(curr,putawayStatus) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/column/search",
        dataType:"json",
        data:{
            "page":curr || 1,
            "rows":20,    //显示的行数
            "type":4,
            "status":putawayStatus
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            // var status = arr.status;  // 返回状态值
            var data = arr.data.aboradVos;   //  数据

            var str;
            tbody.html("");
            if(arr.status == 200){

                if(data == ""||arr.data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){


                        var dataStatus;     // 状态
                        if(data[i].status == 1){
                            dataStatus = "上架"
                        }else{
                            dataStatus = "下架"
                        }

                        var startDateAndTime = ge_time_format(data[i].startTime).split(" ");
                        var startDate = startDateAndTime[0];
                        var startTime = startDateAndTime[1];

                        var endDateAndTime = ge_time_format(data[i].endTime).split(" ");
                        var endDate = endDateAndTime[0];
                        var endTime = endDateAndTime[1];

                        str += '<tr data-id = "' + data[i].aboradId+'">' +
                            '<td class="wideTd">'+ data[i].aboradId +'</td> ' +   //编号
                            '<td><img src="' + data[i].storeImage + '" class="img-largen" alt="图片加载失败"></td> ' +   // 商家图片
                            '<td class="name" title="'+data[i].storeUrl+'"><a href="'+data[i].storeUrl+'">'+data[i].storeUrl+'</a></td> ' +  // 商家链接
                            '<td class="name" title="'+data[i].context+'">'+ data[i].context +'</td> ' +  // 商家简介
                            '<td class="redMark">￥'+ toDecimal2(data[i].price) +'</td> ' +  // 广告价格
                            '<td>'+ dataStatus +'</td> ' +  // 状态
                            '<td>新店首发</td> ' +  // 分类
                            '<td class="wideTd date"><p>'+startDate+'</p><p>'+startTime+'</p></td> ' +  // 开始时间
                            '<td class="wideTd date"><p>'+endDate+'</p><p>'+endTime+'</p></td> ' +  // 结束时间
                            '<td class="">'+ data[i].adminName +'</td> ' +  // 管理员
                            '<td class="operateIcon">' +
                            '<p><a href="javascript:void (0)" style="margin-left: 0" class="deleteBtn"><i class="iconfont">&#xe601;</i></a></p>'+
                            '<p><a href="#" class="changeBtn"><i class="iconfont">&#xe630;</i></a></p>'+
                            '</td>'+  // 操作

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
    pageLoad(1,"");
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
                url:"http://192.168.1.111:8081/manager/column/remove",
                dataType:"json",
                data:{"id":id,"type":4},
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

//  点击 修改icon
tbody.delegate(".changeBtn","click",function () {
    var id = $(this).parents("tr").attr("data-id");
    window.location.href="change.html?id="+id;
});

