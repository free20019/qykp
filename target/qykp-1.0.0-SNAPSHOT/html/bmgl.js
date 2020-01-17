var currentpage=1;
var totalnum=15;
var resultdata;
var pgzs=0;
var zNodes,setting;
(function() {		//javascript模块化
	var part = {
			//查询
			search: function(){
				$.ajax({
				    type:"post",
				    url: "../common/bmgl",
				    data:{"bm": $("#bm_bm").val(),
				    		"currentpage": $("#currentpage").html()==""?currentpage:$("#currentpage").html(),
				    		"totalnum" :totalnum},
				    dataType: "json",
				    success:function(data){
				    	$("#bm_table tbody").html("");
				    	console.log(data)
				    	for(var i=0;i<data.count;i++){
				    		var html='<tr><td><input type="checkbox" value="'+data.datas[i].ID+'" bmid="'+data.datas[i].PARENT+'" title="勾选"></td><td>'+addi(currentpage,i)+'</td><td>'+data.datas[i].BM+'</td><td>'+data.datas[i].SJBM+'</td></tr>';
				    		$("#bm_table tbody").append(html);
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
					layui.use('layer', function () {
		                var $ = layui.jquery,
								layer = layui.layer;
		                //弹出框
		                layer.open({
		        			title : '添加岗位',
		        			type : 1,
		        			area : [ '350px', '400px' ], // 宽高
		        			content: $('#aaa').html(),
		        			btn: ['保存', '关闭'], //可以无限个按钮
		        			yes: function(index){
	      				  		part.add.save();
	      				  		layer.close(index);
	      				  	},
	      				  	btn2:function(index){
	      				  		layer.close(index);
	      				  	}
	    				});
		                 setting = {
							    view: {
							        dblClickExpand: false,
							        showLine: true,
							        selectedMulti: false
							    },
							    data: {
							        simpleData: {
							            enable:true,
							            idKey: "id",
							            pIdKey: "pId",
							            rootPId: ""
							        }
							    },
							    callback: {
							        onDblClick: function(event, treeId, treeNode) {
							            console.info(treeNode,treeNode.getParentNode())
							            if(treeNode.isParent){
							            	$('#sjbmid').val(treeNode.id);
							            	$('#sjbm').val(treeNode.name);
							            	$('#sectionBox').hide();
							            }else{
							            	$('#sjbmid').val(treeNode.getParentNode().id);
							            	$('#sjbm').val(treeNode.getParentNode().name);
							            	$('#sectionBox').hide();
							            }
							        }
							    }
							};
							part.tree();
					});
				},
				save:function(){
					$.ajax({
					    type:"post",
					    url: "../common/bmgladdsave",
					    data:{"bm": $("#bmmc").val(),
					    	"parent":$('#sjbmid').val()},
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
	                if($('#bm_table tbody input:checked').length==0){
						layer.msg("请选择要删除项");
					}else{
						var sj="";
						$('#bm_table tbody input:checked').each(function(index,element){
							sj+=element.value+",";
						});
						console.log(sj)
						$.ajax({
							type:"post",
							url: "../common/bmgldel",
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
						});
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
						if($('#bm_table tbody input:checked').length>1){
							layer.msg("只能修改一选中项");
						}else if($('#bm_table tbody input:checked').length==0){
							layer.msg("请选择一项才能进行修改");
						}else{
							//弹出框
			                layer.open({
			        			title : '修改岗位',
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
			                $("#bmmc").val($('#bm_table tbody input:checked').parent().next().next().html());
			                $("#sjbm").val($('#bm_table tbody input:checked').parent().next().next().next().html());
			                $("#sjbmid").val($('#bm_table tbody input:checked').attr("bmid"));
			                 setting = {
								    view: {
								        dblClickExpand: false,
								        showLine: true,
								        selectedMulti: false
								    },
								    data: {
								        simpleData: {
								            enable:true,
								            idKey: "id",
								            pIdKey: "pId",
								            rootPId: ""
								        }
								    },
								    callback: {
								        onDblClick: function(event, treeId, treeNode) {
								            console.info(treeNode,treeNode.tId,treeNode.name)
								            if(treeNode.isParent){
								            	$('#sjbmid').val(treeNode.id);
								            	$('#sjbm').val(treeNode.name);
								            	$('#sectionBox').hide();
								            }else{
								            	$('#sjbmid').val(treeNode.getParentNode().id);
								            	$('#sjbm').val(treeNode.getParentNode().name);
								            	$('#sectionBox').hide();
								            }
								        }
								    }
								};
								part.tree();
						}
					});
				},
				save:function(){
					$.ajax({
					    type:"post",
					    url: "../common/bmgleditsave",
					    data:{"bm": $("#bmmc").val(),
					    	"id":$('#bm_table tbody input:checked').val(),
					    	"sjid":$('#sjbmid').val()},
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
			},
			//权限tree
			tree:function(){
				$.ajax({
				    type:"post",
				    url: "../common/tree",
				    dataType: "json",
				    success:function(data){
				    	zNodes=data;
				    	$.fn.zTree.init($('#ztree'), setting, zNodes);
				    }
				});
			}
	};
	window.part = part;
	part.search();
	$('#bm_search').click(function(){
		part.search();
	});
	function addi(e,i){
		return (e-1)*15+i+1;
	}
})();

