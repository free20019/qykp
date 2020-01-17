/**
 * Created by dywed on 2017/3/9.
 */
var bmcode="";
var setting = {
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
            $('#section').val(treeNode.name);
            bmcode=treeNode.id;
            $('#sectionBox').hide();
        }
    }
};

$(function () {
	$.ajax({
	    type:"post",
	    url: "../common/tree",
	    dataType: "json",
	    success:function(data){
	    	zNodes=data;
	    	$.fn.zTree.init($('#ztree'), setting, zNodes);
	    	setqdlist();
	    }
	});
	
	
});

var eventListener;
function mapclick(){
	eventListener = AMap.event.addListener(signinMap, "click", getLnglat);
	//mapObj.on( 'click', getLnglat);
}

var LONGTI="";
var LATI="";
var dwmarker=null;
function getLnglat(e) {
	LONGTI = e.lnglat.getLng();
	LATI = e.lnglat.getLat();
	$("#jd").val(LONGTI);
	$("#wd").val(LATI);
	if(dwmarker==null){
		dwmarker = new AMap.Marker({
			map:signinMap,
			position:new AMap.LngLat(LONGTI,LATI),     
			offset:new AMap.Pixel(-10,-38), //相对于基点的偏移位置
			draggable:false
		});
	}else{
		dwmarker.setPosition([LONGTI, LATI]);
	}
	signinMap.setCenter(new AMap.LngLat(LONGTI,LATI));
  }

function qdsz(){
	if(bmcode==""){alert("请选择部门");return;}
	if($("#sb").val()==""){alert("请选择上班时间");return;}
	if($("#xb").val()==""){alert("请选择下班时间");return;}
	if($("#jd").val()==""){alert("请在地图上选点");return;}
	if($("#fw").val()==""){alert("请选择范围");return;}
	$.ajax({
	    type:"post",
	    url: "../common/addsz",
	    data:{
	    	"bm": bmcode,
	    	"longi":$("#jd").val(),
	    	"lati":$("#wd").val(),
	    	"sb":$("#sb").val(),
	    	"xb":$("#xb").val(),
	    	"fw":$("#fw").val()
	    	},
	    dataType: "json",
	    success:function(data){
	    	layui.use('layer', function () {
                var $ = layui.jquery,
						layer = layui.layer;
                layer.msg(data.msg);
                setqdlist();
			});
	    }
	});
}

function setqdlist(){
	signinMap.clearMap();
	$.ajax({
	    type:"post",
	    url: "../common/findqdsz",
	    dataType: "json",
	    success:function(data){
	    	for(var i=0;i<data.length;i++){
	    		var markerContent = document.createElement("div");
	    	    markerContent.className = "markerContentStyle";
	    	    //点标记中的图标
	    	    var markerImg= document.createElement("img");
	    		markerImg.className="markerlnglat";
	    		markerImg.src="../resources/images/mark.png";  
	    		markerContent.appendChild(markerImg);
	    		 //点标记中的文本
	    		var markerSpan = document.createElement("span");
	    		
	    		markerSpan.innerHTML = data[i].BMMC+":<br/>上班时间："+data[i].SBTIME+"<br/>下班时间："+data[i].XBTIME+"<br/>签到范围："+data[i].FW+"(米)";
	    		markerContent.appendChild(markerSpan);
	    		var marker = new AMap.Marker({
	    			map:signinMap,
	    		    position:new AMap.LngLat(data[i].LONGI,data[i].LATI),     
	    		    offset:new AMap.Pixel(-10,-38), //相对于基点的偏移位置
	    		    draggable:false,  //是否可拖动
	    		    content:markerContent   //自定义点标记覆盖物内容
	    		});
	    	}
	    	
	    }
	});
}