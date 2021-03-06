var currentpage=1;
var totalnum=13;
var resultdata;
var pgzs=0;
(function() {		//javascript模块化
	var part = {
			//查询
			search: function(){
				if($("#jbcx_stime").val()==""||$("#jbcx_etime").val()==""){
					alert("请选择查询的日期时间段！");
					return;
				}
				
				$.ajax({
				    type:"post",
				    url: "../common/jbcx",
				    data:{
				    	"name": $("#jbcx_name").val(),
				    	"bm": $("#jbcx_bm").val(),
				    	"kstime": $("#jbcx_stime").val(),
				    	"jstime": $("#jbcx_etime").val(),
				    	"currentpage": $("#currentpage").html()==""?currentpage:$("#currentpage").html(),
				    	"totalnum" :totalnum
				    	},
				    dataType: "json",
				    success:function(data){
				    	$("#jbcx_table tbody").html("");
//				    	console.log(data);
				    	for(var i=0;i<data.datas.length;i++){
				    		var html='<tr><td><input type="checkbox" value="'+data.datas[i].ID+'" title="勾选"></td><td>'+(i+1)+'</td>'+
				    		'<td>'+data.datas[i].USERNAME+'</td>'+
				    		'<td>'+data.datas[i].BM+'</td>'+
				    		'<td>'+formatYYYYMMDDHHMISS(data.datas[i].JBKSTIME)+'</td>'+
				    		'<td>'+formatYYYYMMDDHHMISS(data.datas[i].JBJSTIME)+'</td>'+
				    		'<td>'+data.datas[i].JBNR+'</td>'+
				    		'<td>'+data.datas[i].SPUSER+'</td>'+
				    		'<td>'+formatSQJG(data.datas[i].SQJG)+'</td></tr>';
				    		$("#jbcx_table tbody").append(html);
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
						totalnum=13;
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
						title : '添加加班信息',
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
							 $("#jbcx_username").empty();
							 for(var i=0;i<data.datas.length;i++){
							 var html='<option value='+data.datas[i].USERID+'>'+data.datas[i].USERNAME+'</option>'
							 $("#jbcx_username").append(html);
							 }
							}
						});
					});
				
			},
			save:function(){
				$.ajax({
				    type:"post",
				    url: "../common/jbcxadd",
				    data:{
				    	"username":$("#jbcx_username").find("option:selected").text(),
				    	"spuser":$("#jbcx_spuser").find("option:selected").text(),
				    	"userid":$("#jbcx_username").val(),
				    	"bm":$("#jbcx_spuser").val(),
				    	"stime":$("#jbcx_kstime").val(),
				    	"etime":$("#jbcx_jstime").val(),
				    	"content": $("#jbcx_content").val(),
				    	"sqjg": $("#jbcx_sqjg").val(),
				    	"jbsc":$("#jbcx_jbsc").val()
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
	                if($('#jbcx_table tbody input:checked').length==0){
						layer.msg("请选择要删除项");
					}else{
						var sj="";
						$('#jbcx_table tbody input:checked').each(function(index,element){
							sj+=element.value+",";
						});
						console.log(sj)
						var submitval=window.confirm("是否要删除该条记录")
						if(!submitval){
							return ;
						}else{
						$.ajax({
							type:"post",
							url: "../common/jbcxdel",
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
						if($('#jbcx_table tbody input:checked').length>1){
							layer.msg("只能修改一选中项");
						}else if($('#jbcx_table tbody input:checked').length==0){
							layer.msg("请选择一项才能进行修改");
						}else{
							//弹出框
			                layer.open({
			        			title : '修改加班信息',
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
								 $("#jbcx_username").empty();
								 for(var i=0;i<data.datas.length;i++){
								 var html='<option value='+data.datas[i].USERID+'>'+data.datas[i].USERNAME+'</option>'
								 $("#jbcx_username").append(html);
								 }
								}
							});
			                $.ajax({
								type:"post",
								url: "../common/queryjb",
								data:{"id": $("#jbcx_table tbody input:checked").val()
									},
								dataType: "json",
								success:function(data){
									$("#jbcx_username").val(data.datas[0].USERID);
									$("#jbcx_spuser").attr("option",data.datas[0].SPUSER);
									$("#jbcx_kstime").val(formatYYYYMMDDHHMISS(data.datas[0].JBKSTIME));
									$("#jbcx_jstime").val(formatYYYYMMDDHHMISS(data.datas[0].JBJSTIME));
									 $("#jbcx_content").val(data.datas[0].JBNR);
									 $("#jbcx_sqjg").val(data.datas[0].SQJG);
									 $("#jbcx_jbsc").val(data.datas[0].JBSC);
								}
							});
						}
					});
				},
				save:function(){
					$.ajax({
					    type:"post",
					    url: "../common/jbcxeditsave",
					    data:{
					    	"username":$("#jbcx_username").find("option:selected").text(),
					    	"spuser":$("#jbcx_spuser").find("option:selected").text(),
					    	"userid":$("#jbcx_username").val(),
					    	"stime":$("#jbcx_kstime").val(),
					    	"etime":$("#jbcx_jstime").val(),
					    	"content": $("#jbcx_content").val(),
					    	"sqjg": $("#jbcx_sqjg").val(),
					    	"jbsc":$("#jbcx_jbsc").val(),
					    	"id": $("#jbcx_table tbody input:checked").val()
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
	 $("#jbcx_stime").val(setformat4(new Date()));
     $("#jbcx_etime").val(setformat3(new Date()));
	//part.search();
	$('#jbcx_search').click(function(){
		part.search();
	});
})();

