var currentpage=1;
var totalnum=15;
var resultdata;
var pgzs=0;
(function() {		//javascript模块化
	var part = {
			//查询
			search: function(){
				if($("#wqcx_stime").val()==""||$("#wqcx_etime").val()==""){
					alert("请选择查询的日期时间段！");
					return;
				}
				
				$.ajax({
				    type:"post",
				    url: "../common/wqcx",
				    data:{
				    	"name": $("#wqcx_name").val(),
				    	"bm": $("#wqcx_bm").val(),
				    	"stime": $("#wqcx_stime").val(),
				    	"etime": $("#wqcx_etime").val(),
				    	"currentpage": $("#currentpage").html()==""?currentpage:$("#currentpage").html(),
				    	"totalnum" :totalnum
				    	},
				    dataType: "json",
				    success:function(data){
				    	$("#wqcx_table tbody").html("");
//				    	console.log(data);
				    	for(var i=0;i<data.datas.length;i++){
				    		var html='<tr><td><input type="checkbox"  value="'+data.datas[i].ID+'" title="勾选"></td><td>'+(i+1)+'</td>'+
				    		'<td>'+data.datas[i].USERNAME+'</td>'+
				    		'<td>'+data.datas[i].BM+'</td>'+
				    		'<td>'+formatYYYYMMDDHHMISS(data.datas[i].BGTIME)+'</td>'+
				    		'<td>'+data.datas[i].BGDZ+'</td>'+
				    		'<td>'+data.datas[i].BGNR+'</td>'+
				    		'<td>'+data.datas[i].SPUSER+'</td>'+
//				    		'<td>'+data.datas[i].SPUSERTWO+'</td>'+
				    		'<td>'+formatSQJG(data.datas[i].SQJG,data.datas[i].SQJGTWO,data.datas[i].SPUSERTWO)+'</td>'+
				    		'<td>'+getTpone((data.datas[i].TPONE).substring(49))+'</td></tr>';
//				    		'<td>'+'<a href="http://115.236.61.150:6039/qykp/imgs/201711/2017113017494203261605669419.jpeg" target="_blank">http://115.236.61.150:6039/qykp/imgs/201711/2017113017494203261605669419.jpeg</a>'+'</td></tr>';
				    		$("#wqcx_table tbody").append(html);
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
				    }
				});
			},
			//添加
			add:{
				show:function(){
					//引入layer弹出框
					layui.use('layer', function(){
						var $ =layui.jquery,
						    layer=layui.layer;
						layer.open({
						title : '添加外勤项目',
						type : 1,
						area : [ '350px', '360px' ], // 宽高
						content: $('#aaa').html(),
						btn: ['保存', '关闭'], //按钮
						yes: function(index){
							part.add.save();
      				  		layer.close(index);
      				  	},
      				    btn2:function(index){
    				  		layer.close(index);
    				  	}
						});
						$.ajax({
							type:"post",
							url: "../common/selectname",
							dataType: "json",
							success:function(data){
							 $("#wqcx_username").empty();
							 for(var i=0;i<data.datas.length;i++){
							 var html='<option value='+data.datas[i].USERID+'>'+data.datas[i].USERNAME+'</option>'
							 $("#wqcx_username").append(html);
							 }
							}
						});
					});
				
			},
			save:function(){
				$.ajax({
				    type:"post",
				    url: "../common/wqcxadd",
				    data:{
				    	"username": $("#wqcx_username").find("option:selected").text(),
				    	"spuser": $("#wqcx_spuser").find("option:selected").text(),
				    	"userid":$("#wqcx_username").val(),
				    	"time":$("#wqcx_time").val(),
				    	"address": $("#wqcx_address").val(),
				    	"content": $("#wqcx_content").val(),
				    	"spjg": $("#wqcx_spjg").val()
				    	},
				    dataType: "json",
				    success:function(data){
				    	layui.use('layer', function () {
			                var $ = layui.jquery,
									layer = layui.layer;
			                layer.msg(data.msg);
			                part.search();
						});
				    }
				});
			}
			
			},
			//删除
			del:function(){
				layui.use('layer', function () {
	                var $ = layui.jquery,
							layer = layui.layer;
	                if($('#wqcx_table tbody input:checked').length==0){
						layer.msg("请选择要删除项");
					}else{
						var sj="";
						$('#wqcx_table tbody input:checked').each(function(index,element){
							sj+=element.value+",";
						});
						console.log(sj)
						var submitval=window.confirm("是否要删除该条记录")
						if(!submitval){
							return ;
						}else{
						$.ajax({
							type:"post",
							url: "../common/wqcxdel",
							data:{"sj": sj.substring(0,sj.length-1)},
							dataType: "json",
							success:function(data){
								layui.use('layer', function () {
									
									var $ = layui.jquery,
									layer = layui.layer;
									layer.msg(data.msg);
									part.search();
								});
							}
						});}
					}
				});
				},
			//修改
			edit:{
				show:function(){
					//引入layer弹出框
					layui.use('layer', function () {
		                var $ = layui.jquery,
								layer = layui.layer;
		                //判断选中项
						if($('#wqcx_table tbody input:checked').length>1){
							layer.msg("只能修改一选中项");
						}else if($('#wqcx_table tbody input:checked').length==0){
							layer.msg("请选择一项才能进行修改");
						}else{
							//弹出框
			                layer.open({
			        			title : '修改外勤信息',
			        			type : 1,
			        			area : [ '350px', '360px' ], // 宽高
			        			content: $('#aaa').html(),
			        			btn: ['保存', '关闭'], //可以无限个按钮
			        			yes: function(index){
		      				  		part.edit.save();
		      				  		layer.close(index);
		      				  	},
		      				  	btn2:function(index){
		      				  		layer.close(index);
		      				  	}
		    				});
			                $.ajax({
								type:"post",
								url: "../common/selectname",
								dataType: "json",
								success:function(data){
								 $("#wqcx_username").empty();
								 for(var i=0;i<data.datas.length;i++){
								 var html='<option value='+data.datas[i].USERID+'>'+data.datas[i].USERNAME+'</option>'
								 $("#wqcx_username").append(html);
								 }
								}
							});
			                $.ajax({
								type:"post",
								url: "../common/querywq",
								data:{"id": $("#wqcx_table tbody input:checked").val()
									},
								dataType: "json",
								success:function(data){
									$("#wqcx_username").val(data.datas[0].USERID);
									$("#wqcx_spuser").val(data.datas[0].SPUSER);
									$("#wqcx_time").val(formatYYYYMMDDHHMISS(data.datas[0].BGTIME));
									 $("#wqcx_content").val(data.datas[0].BGNR);
									 $("#wqcx_address").val(data.datas[0].BGDZ);
									 $("#wqcx_spjg").val(data.datas[0].SQJG);
								}
							});
						}
					});
				},
				save:function(){
					$.ajax({
					    type:"post",
					    url: "../common/wqcxeditsave",
					    data:{
					    	"username":$("#wqcx_username").find("option:selected").text(),
					    	"spuser":$("#wqcx_spuser").find("option:selected").text(),
					    	"userid":$("#wqcx_username").val(),
					    	"time":$("#wqcx_time").val(),
					    	"address": $("#wqcx_address").val(),
					    	"content": $("#wqcx_content").val(),
					    	"spjg": $("#wqcx_spjg").val(),
					    	"id": $("#wqcx_table tbody input:checked").val()
					    	},
					    dataType: "json",
					    success:function(data){
					    	layui.use('layer', function () {
				                var $ = layui.jquery,
										layer = layui.layer;
				                layer.msg(data.msg);
				                part.search();
							});
					    }
					});
				}
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
	 $("#wqcx_stime").val(setformat4(new Date()));
     $("#wqcx_etime").val(setformat3(new Date()));
	//part.search();
	$('#wqcx_search').click(function(){
		part.search();
	});
	$('#wqcx_dc').click(function(){
		url = "../common/wqcxexcle?name="+$("#wqcx_name").val()+"&&bm="+$("#wqcx_bm").val()+"&&stime="+$("#wqcx_stime").val()+"&&etime="+$("#wqcx_etime").val()+"&&currentpage=1&&totalnum=999999999999", window.open(url)
	});
})();

