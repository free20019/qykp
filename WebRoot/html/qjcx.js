var currentpage=1;
var totalnum=15;
var resultdata;
var pgzs=0;
(function() {		//javascript模块化
	var part = {
			//查询
			search: function(){
				if($("#qjcx_stime").val()==""||$("#qjcx_etime").val()==""){
					alert("请选择查询的日期时间段");
					return;
				}

				$.ajax({
					type:"post",
					url: "../common/qjcx",
					data:{
						"name": $("#qjcx_name").val(),
						"bm": $("#qjcx_bm").val(),
						"stime": $("#qjcx_stime").val(),
						"etime": $("#qjcx_etime").val(),
						"currentpage": $("#currentpage").html()==""?currentpage:$("#currentpage").html(),
								"totalnum" :totalnum
					},
					dataType: "json",
					success:function(data){
						$("#qjcx_table tbody").html("");
//						console.log(data);
						
						for(var i=0;i<data.datas.length;i++){
							
							var html='<tr><td><input type="checkbox"  value="'+data.datas[i].ID+'"title="勾选"></td>'+
							'<td>'+(i+1)+'</td>'+
							'<td>'+data.datas[i].USERNAME+'</td>'+
							'<td>'+data.datas[i].BM+'</td>'+
							'<td>'+formatYYYYMMDDHHMISS(data.datas[i].QJKSTIME)+'—'+formatYYYYMMDDHHMISS(data.datas[i].QJJSTIME)+'</td>'+
							'<td>'+qjsctime(data.datas[i].QJTS,data.datas[i].QJSC) +'</td>'+
							'<td>'+data.datas[i].QJTYPE+'</td>'+
							'<td>'+data.datas[i].QJNR+'</td>'+
							'<td>'+data.datas[i].SPUSER+'</td>'+
//							'<td>'+data.datas[i].SPUSERTWO+'</td>'+
							'<td>'+formatSQJG(data.datas[i].SQJG,data.datas[i].SQJGTWO,data.datas[i].SPUSERTWO)+'</td>'+
							'<td>'+getTpone((data.datas[i].TPONE).substring(49))+'</td></tr>';
							$("#qjcx_table tbody").append(html);
							
							function qjsctime(time1,time2){
								if(parseInt(time1)==1){
									return data.datas[i].QJSC+"小时";
								}else{
									return data.datas[i].QJTS+"天";
								}
							}
							}
						if(data.count>0){
							pgzs = parseInt((data.count-1)/totalnum)+1;
							$("#totalpage").html(pgzs);
							$("#totalnum").html(data.count);
						}else{
							$("#totalpage").html("0");
							$("#totalnum").html("0");
						}
						}
				});
				$("#currentpage").html(currentpage);
				totalnum=15;
			},
			
			//添加
			add:{
				show:function(){
					//引入layer弹出框
					layui.use('layer', function(){
						var $ =layui.jquery,
						layer=layui.layer;
						layer.open({
							title : '添加请假',
							type : 1,
							area : [ '350px', '400px' ], // 宽高
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
							 $("#qjcx_username").empty();
							 for(var i=0;i<data.datas.length;i++){
							 var html='<option value='+data.datas[i].USERID+'>'+data.datas[i].USERNAME+'</option>'
							 $("#qjcx_username").append(html);
							 }
							}
						});
					});
					
				},
				save:function(){
					$.ajax({
						type:"post",
						url: "../common/qjcxadd",
						data:{
							"name": $("#qjcx_username").find("option:selected").text(),
							"spuser": $("#qjcx_spuser").find("option:selected").text(),
							"userid":$("#qjcx_username").val(),
							"kstime": $("#qjcx_kstime").val(),
							"jstime": $("#qjcx_jstime").val(),
							"qjly": $("#qjcx_qjly").val(),
							"qjlx": $("#qjcx_qjlx").find("option:selected").text(),
							"qjjg": $("#qjcx_sqjg").val(),
							"qjsc": $("#qjcx_qjsc").val()
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
					if($('#qjcx_table tbody input:checked').length==0){
						layer.msg("请选择要删除项");
					}else{
						var sj="";
						$('#qjcx_table tbody input:checked').each(function(index,element){
							sj+=element.value+",";
						});
						console.log(sj)
						var submitval=window.confirm("是否要删除该条记录")
						if(!submitval){
							return ;
						}else{
							$.ajax({
								type:"post",
								url: "../common/qjcxdel",
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
						if($('#qjcx_table tbody input:checked').length>1){
							layer.msg("只能修改一选中项");
						}else if($('#qjcx_table tbody input:checked').length==0){
							layer.msg("请选择一项才能进行修改");
						}else{
							//弹出框
							layer.open({
								title : '修改请假信息',
								type : 1,
								area : [ '350px', '400px' ], // 宽高
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
								 $("#qjcx_username").empty();
								 for(var i=0;i<data.datas.length;i++){
								 var html='<option value='+data.datas[i].USERID+'>'+data.datas[i].USERNAME+'</option>'
								 $("#qjcx_username").append(html);
								 }
								 $("qjcx_username").empty();
								}
							});
							$.ajax({
								type:"post",
								url: "../common/queryqj",
								data:{"id": $("#qjcx_table tbody input:checked").val()
									},
								dataType: "json",
								success:function(data){
									$("#qjcx_username").val(data.datas[0].USERID);
									$("#qjcx_spuser").val(data.datas[0].SPUSER);
									$("#qjcx_kstime").val(formatYYYYMMDDHHMISS(data.datas[0].QJKSTIME));
									 $("#qjcx_jstime").val(formatYYYYMMDDHHMISS(data.datas[0].QJJSTIME));
									 $("#qjcx_qjly").val(data.datas[0].QJNR);
									 $("#qjcx_qjlx").attr("option",data.datas[0].QJTYPE);
									 $("#qjcx_qjsc").val(data.datas[0].QJSC);
									 $("#qjcx_qjjg").val(data.datas[0].SQJG);
								}
							});
//							$("#qjcx_username").val($('#qjcx_table tbody input:checked').parent().next().next().html());
//							$("#qjcx_spuser").val($('#qjcx_table tbody input:checked').parent().next().next().next().next().next().next().next().html());
////						    $("#qjcx_kstime").val($('#qjcx_table tbody input:checked').parent().next().next().next().next().html());
////						    $("#qjcx_jstime").val($('#qjcx_table tbody input:checked').parent().next().next().next().next().html());
//							$("#qjcx_qjly").val($('#qjcx_table tbody input:checked').parent().next().next().next().next().next().next().html());
//							$("#qjcx_qjlx").val($('#qjcx_table tbody input:checked').parent().next().next().next().next().next().html());
//							$("#qjcx_qjjg").val($('#qjcx_table tbody input:checked').parent().next().next().next().next().next().next().next().next().html());
						}
					});
				},
				save:function(){
					$.ajax({
						type:"post",
						url: "../common/qjcxeditsave",
						data:{
							"name": $("#qjcx_username").find("option:selected").text(),
							"spuser": $("#qjcx_spuser").find("option:selected").text(),
							"userid": $("#qjcx_username").val(),
							"kstime": $("#qjcx_kstime").val(),
							"jstime": $("#qjcx_jstime").val(),
							"qjly": $("#qjcx_qjly").val(),
							"qjlx": $("#qjcx_qjlx").find("option:selected").text(),
							"qjjg": $("#qjcx_sqjg").val(),
							"qjsc": $("#qjcx_qjsc").val(),
							"id": $("#qjcx_table tbody input:checked").val()
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
//				search1:function(){
//				$ajax({
//				type:"post",
//				url: "../common/search1",
//				data:{
//				"id":$("#qjcx_table tbody input:checked").val()
//				},
//				dataType: "json",
//				success:function(data){
//				$("#qjcx_username").html("");
//				$("#qjcx_spuser").html("");
//				console.log(data);
//				for(var i=0;i<data.datas.length;i++){
//				$("#qjcx_username").html('<option>'+data.datas[i].USERNAME+'<option/>');
//				}
//				for(var i=0;i<data.datas.length;i++){
//				$("#qjcx_spuser").html('<option>'+data.datas[i].SPUSER+'<option/>');
//				}
//				});

//				}
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
	//part.search();
	$("#qjcx_stime").val(setformat4(new Date()));
	$("#qjcx_etime").val(setformat3(new Date()));
	//part.search();
	$('#qjcx_search').click(function(){
		part.search();
	});
	$('#qjcx_dc').click(function(){
		url = "../common/qjcxexcle?name="+$("#qjcx_name").val()+"&&bm="+$("#qjcx_bm").val()+"&&stime="+$("#qjcx_stime").val()+"&&etime="+$("#qjcx_etime").val()+"&&currentpage=1&&totalnum=999999999999", window.open(url)
	});
})();

