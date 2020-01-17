var currentpage=1;
var totalnum=15;
var resultdata;
var pgzs=0;

(function() {		//javascript模块化
	var part = {
			//查询
			search: function(){
				if($("#qdtj_stime").val()==""||$("#qdtj_etime").val()==""){
					alert("请选择查询的日期时间段！");
					return;
				}
				
				$.ajax({
				    type:"post",
				    url: "../common/qdtj",
				    data:{
				    	"name": $("#qdtj_name").val(),
				    	"bm": $("#qdtj_bm").val(),
				    	"stime": $("#qdtj_stime").val(),
				    	"etime": $("#qdtj_etime").val(),
				    	"currentpage": currentpage,
				    	"totalnum" :totalnum
				    	},
				    dataType: "json",
				    success:function(data){
				    	$("#qdtj_table tbody").html("");
				    	for(var i=0;i<data.datas.length;i++){
				    		var time1=formatYYYYMMDDHHMISS(data.datas[i].QDTIME);
				    		var h1=time1.substring(11,13);//时
				    		var m1=time1.substring(14,16);//分
				    		
				    		var time2=formatYYYYMMDDHHMISS(data.datas[i].QTTIME);
				    		var h2=time2.substring(11,13);//时
				    		var m2=time2.substring(14,16);//分
				    		function redcd(hh,mm){
				    			if(hh>8){
				    				return "<font color ='red'>"+formatYYYYMMDDHH(data.datas[i].QDTIME)+" </font>";
				    			}else if(hh==8&&mm>30){
				    				return "<font color ='red'>"+formatYYYYMMDDHH(data.datas[i].QDTIME)+" </font>";
				    			}else{
				    				return formatYYYYMMDDHH(data.datas[i].QDTIME);
				    			}
				    		}
				    		function redzt(hh,mm){
				    			if(hh<17){
				    				return "<font color ='red'>"+formatYYYYMMDDHH(data.datas[i].QTTIME)+" </font>";
				    			}else if(hh==17&&mm<30){
				    				return "<font color ='red'>"+formatYYYYMMDDHH(data.datas[i].QTTIME)+" </font>";
				    			}else{
				    				return formatYYYYMMDDHH(data.datas[i].QTTIME);
				    			}
				    		}
				    		var html='<tr><td>'+(i+1)+'</td>'+
				    		'<td>'+data.datas[i].USERNAME+'</td>'+
				    		'<td>'+data.datas[i].BM+'</td>'+
				    		'<td>'+redcd(parseInt(h1),parseInt(m1))+'</td>'+
				    		'<td>'+data.datas[i].QDDZ+'</td>'+
				    		'<td>'+data.datas[i].CDYY+'</td>'+
				    		'<td>'+redzt(parseInt(h2),parseInt(m2))+'</td>'+
				    		'<td>'+data.datas[i].QTDZ+'</td>'+
				    		'<td>'+data.datas[i].ZTYY+'</td></tr>';
				    		$("#qdtj_table tbody").append(html);
				    	}
				    	if(data.count>0){
							pgzs = parseInt((data.count-1)/totalnum)+1;
							$("#totalpage").html(pgzs);
							$("#totalnum").html(data.count);
						}else{
							$("#totalpage").html("0");
							$("#totalnum").html("0");
						}
						$("#currentpage").html(currentpage);
						totalnum=15;
						
						var ry=[];
						var qdcs=[],qjcs=[],wqcs=[];
						for (var i = 0; i < data.tsj.length; i++) {
							ry.push(data.tsj[i].USERNAME);
							qdcs.push(data.tsj[i].qdcs);
							qjcs.push(data.tsj[i].qjcs);
							wqcs.push(data.tsj[i].wqcs);
						}
						
						 var myChart = echarts.init(document.getElementById('qdtb'));
			                myChart.setOption({
			                	 tooltip : {
			                	        trigger: 'axis',
			                	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			                	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			                	        }
			                	    },
			                	    legend: {
			                	        data:['签到次数','请假次数','外勤次数']
			                	    },
			                	    grid: {
			                	        left: '3%',
			                	        right: '4%',
			                	        bottom: '3%',
			                	        containLabel: true
			                	    },
			                	    xAxis : [
			                	        {
			                	            type : 'category',
			                	            data : ry
			                	        }
			                	    ],
			                	    yAxis : [
			                	        {
			                	            type : 'value'
			                	        }
			                	    ],
			                	    series : [
			                	        {
			                	            name:'签到次数',
			                	            type:'bar',
			                	            stack: 'aa',
			                	            data:qdcs
			                	        },
			                	        {
			                	            name:'请假次数',
			                	            type:'bar',
			                	            stack: 'aa',
			                	            data:qjcs
			                	        },
			                	        {
			                	            name:'外勤次数',
			                	            type:'bar',
			                	            stack: 'aa',
			                	            data:wqcs
			                	        }
			                	    ]
			                });
				    }
				});
			},
			//分页
			click:{
				gopage:function(){
					currentpage=1;
					part.search();
				},
				goxyy:function(){
					currentpage++;
					if(currentpage>pgzs){
						layui.use('layer', function () {
			                var $ = layui.jquery,
									layer = layui.layer;
						layer.msg("已到末页");
						currentpage=currentpage-1;
						return;
						});
					}
					console.log(currentpage);
					part.search();
				},
				gosyy:function(){
					currentpage--;
					if(currentpage<=0){
						layui.use('layer', function () {
			                var $ = layui.jquery,
									layer = layui.layer;
						layer.msg("已到首页");
						currentpage=currentpage+1;
						return;
						});
					}
					part.search();
				},
				goend:function(){
					currentpage = pgzs;
					part.search();
				}
			}
	};
	window.part = part;
	 $("#qdtj_stime").val(setformat4(new Date()));
     $("#qdtj_etime").val(setformat3(new Date()));
	//part.search();
	$('#qdtj_search').click(function(){
		part.search();
	});
	$('#qdtj_dc').click(function(){
		url = "../common/qdtjexcle?name="+$("#qdtj_name").val()+"&&bm="+$("#qdtj_bm").val()+"&&stime="+$("#qdtj_stime").val()+"&&etime="+$("#qdtj_etime").val()+"&&currentpage=1&&totalnum=999999999999", window.open(url)
	});
})();

