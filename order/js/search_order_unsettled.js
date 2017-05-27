/**
 * Created by dell on 2017/4/21.
 */

// 从上一个网页接收传递来的id

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var thisId = GetQueryString("id");
console.log(thisId);

var tbody = $("#search_tbody");

//  读取订单的详细信息

function pageLoad(curr,searchCon) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/order/store_wait_order",
        dataType:"json",
        data:{"page":1,
            "rows":2,
            "id":thisId,
            "search":searchCon
        },
        timeout:5000,
        success:function (arr) {
            var status = arr.status;  // 返回状态值
            var data = arr.data.order;   //  数据

            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    $("#storeName").text(arr.data.storeinfo[0].storeName);
                    $("#storePhone").text(arr.data.storeinfo[0].tel);

                    for(var i in data){

                        var payWay;     // 分类
                        if(data[i].pay == 1){     // 1 微信 2 支付宝
                            payWay = "微信";
                        }else if(data[i].type == 2){
                            payWay = "支付宝";
                        }


                        var order_status;     // 运营状态
                        if(data[i].settlemen == 1){
                            order_status = "已结算"
                        }else{
                            order_status = "未结算"
                        }

                        var buyer_status;
                        if(data[i].settlemen == 1){
                            buyer_status = "已收货"
                        }else{
                            buyer_status = "未收货"
                        }

                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td class="wideTd">'+ data[i].id +'</td> ' +   //订单号
                            '<td class="wideTd">'+ data[i].oid +'</td> ' +   //交易号
                            '<td>'+ data[i].title +'</td> ' +  // 商品名称
                            '<td><img src="' + data[i].images + '" class="" alt="图片加载失败"></td> ' +  // 商品图片
                            '<td>'+ data[i].userName +'</td> ' +  // 用户昵称
                            '<td>'+ data[i].userCode +'</td> ' +  // 用户账号
                            '<td>'+ data[i].counts +'</td> ' +  // 数量
                            '<td class="redMark">￥'+ data[i].money +'</td> ' +  // 金额
                            '<td>'+ ge_time_format(data[i].createTime) +'</td> ' +  // 下单时间
                            '<td>'+ buyer_status +'</td> ' +  // 状态
                            '<td>'+ ge_time_format(data[i].receivingTime) +'</td> ' +  // 收获时间
                            '<td><input type="button" value="结算" class="goSettled"></td> ' +  // 结算状态
                            '<td>'+ ge_time_format(data[i].settlemenTime) +'</td> ' +  // 结算时间
                            '<td>'+ payWay +'</td> ' +  // 支付方式

                            '<td> - </td> ' +


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
    pageLoad(1,"")
});



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


//  点击去结算

// 点击 “已查看” 当前反馈信息状态改为了已处理

tbody.delegate(".goSettled","click",function () {
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
                url:"http://192.168.1.111:8081/manager/order/settlement",
                dataType:"json",
                data:{"id":id},
                success:function (arr) {
                    var backStatus = arr.status;
                    if(backStatus == 200){
                        _this.parents("tr").remove();
                        notie.alert(1, '结算成功!', 2);
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
        title: '结算',
        content: '结算之后不可恢复，确定要删除么'
    });
});
