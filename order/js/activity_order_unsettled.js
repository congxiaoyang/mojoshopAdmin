/**
 * Created by dell on 2017/5/28.
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

function pageLoad(curr) {
    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8081/manager/organizer/pending_order",
        dataType:"json",
        data:{"page":1,
            "rows":20,
            "id":thisId
        },
        timeout:5000,
        success:function (arr) {
            var status = arr.status;  // 返回状态值
            var data = arr.data.eventUser;   //  数据

            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{

                    for(var i in data){

                        var payWay;     // 分类
                        if(data[i].pay == 1){     // 1 微信 2 支付宝
                            payWay = "微信";
                        }else if(data[i].type == 2){
                            payWay = "支付宝";
                        }

                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td class="wideTd">'+ data[i].tradeNo +'</td> ' +   //交易号
                            '<td>'+ payWay +'</td> ' +  // 支付方式
                            '<td class="redMark">￥'+ data[i].money +'</td> ' +  // 金额
                            '<td>'+ data[i].niceName +'</td> ' +  // 用户昵称
                            '<td>'+ data[i].activityTheme +'</td> ' +  // 活动主题
                            '<td>'+ ge_time_format(data[i].createTime) +'</td> ' +  // 下单时间


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
    pageLoad(1)
});