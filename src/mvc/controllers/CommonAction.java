package mvc.controllers;

import helper.DownloadAct;
import helper.JacksonUtil;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mvc.service.CommonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/common")
public class CommonAction {
	protected JdbcTemplate jdbcTemplate = null;
	protected JdbcTemplate jdbcTemplate2 = null;

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	@Autowired
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public JdbcTemplate getJdbcTemplate2() {
		return jdbcTemplate2;
	}

	@Autowired
	public void setJdbcTemplate2(JdbcTemplate jdbcTemplate2) {
		this.jdbcTemplate2 = jdbcTemplate2;
	}

	private JacksonUtil jacksonUtil = JacksonUtil.buildNormalBinder();

	private CommonService commonService;

	private DownloadAct downloadAct = new DownloadAct();
	public CommonService getCommonService() {
		return commonService;
	}

	@Autowired
	public void setCommonService(CommonService commonService) {
		this.commonService = commonService;
	}

	@RequestMapping(value = "/test")
	@ResponseBody
	public String test() {
		String msg = "ok";
		System.out.println("####");
		commonService.test();
		return msg;
	}
	@RequestMapping(value = "/aaa")
	public String aaa(){
		return "redirect:http://www.baidu.com";
	}

	/**
	 * 岗位管理-查询
	 * 
	 * @return
	 */
	@RequestMapping(value = "/part")
	@ResponseBody
	public String part(HttpServletRequest request,
			@RequestParam("gw") String gw,
			@RequestParam("currentpage") String currentpage,
			@RequestParam("totalnum") String totalnum) {
		String msg = "ok";
		msg = commonService.part(gw, currentpage, totalnum);
		return msg;
	}

	/**
	 * 部门岗位-tree
	 * 
	 * @return
	 */
	@RequestMapping(value = "/tree")
	@ResponseBody
	public String tree() {
		String msg = "ok";
		msg = commonService.tree();
		return msg;
	}

	/**
	 * 权限-tree
	 * 
	 * @return
	 */
	@RequestMapping(value = "/qxtree")
	@ResponseBody
	public String qxtree() {
		String msg = "ok";
		msg = commonService.qxtree();
		return msg;
	}

	/**
	 * 增加岗位-权限
	 * 
	 * @return
	 */
	@RequestMapping(value = "/addsave")
	@ResponseBody
	public String addsave(HttpServletRequest request,
			@RequestParam("mc") String mc, @RequestParam("id") String id) {
		int msg = 0;
		msg = commonService.addsave(mc, id);
		if (msg == 1) {
			return "{\"msg\":\"添加成功\"}";
		} else {
			return "{\"msg\":\"添加失败\"}";
		}
	}

	/**
	 * 删除岗位-权限
	 * 
	 * @return
	 */
	@RequestMapping(value = "/del")
	@ResponseBody
	public String del(HttpServletRequest request, @RequestParam("sj") String sj) {
		int msg = 0;
		msg = commonService.del(sj);
		if (msg > 0) {
			return "{\"msg\":\"删除成功\"}";
		} else {
			return "{\"msg\":\"删除失败\"}";
		}
	}

	/**
	 * 修改岗位-权限
	 * 
	 * @return
	 */
	@RequestMapping(value = "/editsave")
	@ResponseBody
	public String editsave(HttpServletRequest request,
			@RequestParam("mc") String mc, @RequestParam("nr") String nr,
			@RequestParam("id") String id) {
		int msg = 0;
		msg = commonService.editsave(mc, nr, id);
		if (msg > 0) {
			return "{\"msg\":\"修改成功\"}";
		} else {
			return "{\"msg\":\"修改失败\"}";
		}
	}

	/**
	 * 用户管理-查询
	 * 
	 * @return
	 */
	@RequestMapping(value = "/user")
	@ResponseBody
	public String user(HttpServletRequest request,
			@RequestParam("name") String name, @RequestParam("bm") String bm,
			@RequestParam("currentpage") String currentpage,
			@RequestParam("totalnum") String totalnum) {
		String msg = "ok";
		msg = commonService.user(name, bm, currentpage, totalnum);
		return msg;
	}

	/**
	 * 增加用户
	 * 
	 * @return
	 */
	@RequestMapping(value = "/useraddsave")
	@ResponseBody
	public String useraddsave(HttpServletRequest request,
			@RequestParam("xm") String xm, @RequestParam("zh") String zh,
			@RequestParam("mm") String mm,@RequestParam("bm") String bm,
			@RequestParam("gw") String gw) {
		int msg = 0;
		msg = commonService.useraddsave(xm, zh, mm,gw,bm);
		if (msg == 1) {
			return "{\"msg\":\"添加成功\"}";
		} else {
			return "{\"msg\":\"添加失败\"}";
		}
	}
	

	/**
	 * 删除用户
	 * 
	 * @return
	 */
	@RequestMapping(value = "/userdel")
	@ResponseBody
	public String userdel(HttpServletRequest request, @RequestParam("sj") String sj) {
		int msg = 0;
		msg = commonService.userdel(sj);
		if (msg > 0) {
			return "{\"msg\":\"删除成功\"}";
		} else {
			return "{\"msg\":\"删除失败\"}";
		}
	}
	/**
	 * 修改用户
	 * 
	 * @return
	 */
	@RequestMapping(value = "/usereditsave")
	@ResponseBody
	public String usereditsave(HttpServletRequest request,
			@RequestParam("xm") String xm, @RequestParam("zh") String zh,
			@RequestParam("mm") String mm, @RequestParam("bm") String bm,
			@RequestParam("gw") String gw, @RequestParam("id") String id) {
		int msg = 0;
		msg = commonService.usereditsave(xm, zh,mm,bm,gw, id);
		if (msg > 0) {
			return "{\"msg\":\"修改成功\"}";
		} else {
			return "{\"msg\":\"修改失败\"}";
		}
	}
	
	/**
	 * 部门管理-查询
	 * 
	 * @return
	 */
	@RequestMapping(value = "/bmgl")
	@ResponseBody
	public String bmgl(HttpServletRequest request,
			@RequestParam("bm") String bm,
			@RequestParam("currentpage") String currentpage,
			@RequestParam("totalnum") String totalnum) {
		String msg = "ok";
		msg = commonService.bmgl(bm, currentpage, totalnum);
		return msg;
	}
	/**
	 * 增加部门
	 * 
	 * @return
	 */
	@RequestMapping(value = "/bmgladdsave")
	@ResponseBody
	public String bmgladdsave(HttpServletRequest request,
			@RequestParam("bm") String bm, @RequestParam("parent") String parent) {
		int msg = 0;
		msg = commonService.bmgladdsave(bm, parent);
		if (msg == 1) {
			return "{\"msg\":\"添加成功\"}";
		} else {
			return "{\"msg\":\"添加失败\"}";
		}
	}
	
	/**
	 * 删除部门
	 * 
	 * @return
	 */
	@RequestMapping(value = "/bmgldel")
	@ResponseBody
	public String bmgldel(HttpServletRequest request, @RequestParam("sj") String sj) {
		int msg = 0;
		msg = commonService.bmgldel(sj);
		if (msg > 0) {
			return "{\"msg\":\"删除成功\"}";
		} else {
			return "{\"msg\":\"删除失败\"}";
		}
	}
	/**
	 * 修改部门
	 * 
	 * @return
	 */
	@RequestMapping(value = "/bmgleditsave")
	@ResponseBody
	public String bmgleditsave(HttpServletRequest request,
			@RequestParam("bm") String bm, @RequestParam("id") String id, @RequestParam("sjid") String sjid) {
		int msg = 0;
		msg = commonService.bmgleditsave(bm,id,sjid);
		if (msg > 0) {
			return "{\"msg\":\"修改成功\"}";
		} else {
			return "{\"msg\":\"修改失败\"}";
		}
	}
	
	
	
	/**
	 * 查找签到
	 * 
	 * @return
	 */
	@RequestMapping(value = "/findqdsz")
	@ResponseBody
	public String findqdsz() {
		String msg = "ok";
		msg = commonService.findqdsz();
		return msg;
	}

	/**
	 * 签到设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/addsz")
	@ResponseBody
	public String addsz(HttpServletRequest request,
			@RequestParam("bm") String bm, @RequestParam("longi") String longi,
			@RequestParam("lati") String lati, @RequestParam("sb") String sb,
			@RequestParam("xb") String xb, @RequestParam("fw") String fw) {
		int msg = 0;
		msg = commonService.addsz(bm, longi, lati, sb, xb, fw);
		if (msg == 1) {
			return "{\"msg\":\"设置成功\"}";
		} else {
			return "{\"msg\":\"设置失败\"}";
		}
	}
	/**
	 * 设置查询
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getsz")
	@ResponseBody
	public String getsz(HttpServletRequest request,
			@RequestParam("bm") String bm) {
		String msg = commonService.getsz(bm);
		return msg;
	}
	
	
	/**
	 * 签到查询
	 * 
	 * @return
	 */
	@RequestMapping(value = "/qdtj")
	@ResponseBody
	public String qdtj(HttpServletRequest request,
			@RequestParam("name") String name,
			@RequestParam("bm") String bm,
			@RequestParam("stime") String stime,
			@RequestParam("etime") String etime,
			@RequestParam("currentpage") String currentpage,
			@RequestParam("totalnum") String totalnum) {
		String msg = commonService.qdtj(name,bm, stime,etime,currentpage, totalnum);
		return msg;
	}
	
	@RequestMapping("/qdtjexcle")
	@ResponseBody
	public String qdtjexcle(HttpServletRequest request,
			HttpServletResponse response,@RequestParam("name") String name,
			@RequestParam("bm") String bm,
			@RequestParam("stime") String stime,
			@RequestParam("etime") String etime,
			@RequestParam("currentpage") String currentpage,
			@RequestParam("totalnum") String totalnum) throws IOException{
		String a[] = {"序号","姓名","签到时间","迟到原因","签退时间","早退原因"};//导出列名
		String b[] = {"r","username","qdtime","cdyy","qttime","ztyy"};//导出map中的key
		String gzb = "签到表";//导出sheet名和导出的文件名
		String sql = "select * from (select ts.*,rownum r from (select tin.username,tin.qdtime,tin.cdyy,tout.qttime,tout.ztyy from "
				+ "(select * from tb_signin t where  t.username in (select u.username from tuser u where u.username like '%"+name+"%' and u.bm in (select t.code from tb_bm t where t.bm like '%"+bm+"%'))"
				+ " and t.qdtime>=to_date('"+stime+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and t.qdtime<=to_date('"+etime+" 23:59:59','yyyy-mm-dd hh24:mi:ss') "
				+ ") tin left join tb_signout tout on tin.yeartime=tout.yeartime and tin.username=tout.username "
				+ "order by tin.username,tin.qdtime desc)ts ,tb_bm m,tuser y where ts.username=y.username and y.bm=m.code)tt where tt.r<= 999999999  and tt.r>= 0";
//		System.out.println(sql);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		List<Map<String, Object>> resultlist = jdbcTemplate.queryForList(sql);
		List<Map<String,Object>> resultMap = new ArrayList<Map<String,Object>>();
		for(int i = 0; i< resultlist.size();i++){
			Map map = new HashMap<String,Object>();
			map.put("r",resultlist.get(i).get("R"));
			map.put("username",resultlist.get(i).get("USERNAME"));
			map.put("qdtime",resultlist.get(i).get("QDTIME"));
			map.put("cdyy",resultlist.get(i).get("CDYY"));
			map.put("qttime",resultlist.get(i).get("QTTIME"));
			map.put("ztyy",resultlist.get(i).get("ZTYY"));
			if(resultlist.get(i).get("qdtime")!=null){
//				Date date = new Date(Long.parseLong(resultlist.get(i).get("qdtime").toString()));
				map.put("qdtime",formatter.format(resultlist.get(i).get("QDTIME")));
			}else{
				map.put("qdtime","");
			}
			if(resultlist.get(i).get("qttime")!=null){
//				Date date = new Date(Long.parseLong(resultlist.get(i).get("qttime").toString()));
				map.put("qttime",formatter.format(resultlist.get(i).get("QTTIME")));
			}else{
				map.put("qttime","");
			}
			resultMap.add(map);
		}
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("datas", resultMap);
		String msg = jacksonUtil.toJson(m);
		List<Map<String, Object>>list = DownloadAct.parseJSON2List1(msg);//导出的数据
		downloadAct.download(request,response,a,b,gzb,list);
		return null;
	}
	
	
	
	
	
	/**
	 * 月签到表
	 * 
	 * @return
	 */
	@RequestMapping(value = "/zqdb")
	@ResponseBody
	public String zqdb(HttpServletRequest request,
			@RequestParam("name") String name,
			@RequestParam("bm") String bm,
			@RequestParam("stime") String stime,
			@RequestParam("dyts") String dyts) {
		String msg = commonService.zqdb(name,bm,stime,dyts);
		return msg;
	}
	/**
	 * 请假查询
	 * 
	 * @return
	 */
	@RequestMapping(value = "/qjcx")
	@ResponseBody
	public String qjcx(HttpServletRequest request,
			@RequestParam("name") String name,
			@RequestParam("bm") String bm,
			@RequestParam("stime") String stime,
			@RequestParam("etime") String etime,
			@RequestParam("currentpage") String currentpage,
			@RequestParam("totalnum") String totalnum) {
		String msg = commonService.qjcx(name,bm, stime,etime,currentpage, totalnum);
		return msg;
	}
	@RequestMapping("/qjcxexcle")
	@ResponseBody
	public String qjcxexcle(HttpServletRequest request,
			HttpServletResponse response,@RequestParam("name") String name,
			@RequestParam("bm") String bm,
			@RequestParam("stime") String stime,
			@RequestParam("etime") String etime,
			@RequestParam("currentpage") String currentpage,
			@RequestParam("totalnum") String totalnum) throws IOException{
		String a[] = {"序号","姓名","请假开始时间","请假结束时间"};//导出列名
		String b[] = {"r","username","qjkstime","qjjstime"};//导出map中的key
		String gzb = "请假表";//导出sheet名和导出的文件名
		String sql = "select * from (select ts.*,rownum r from (select t.qjkstime,t.qjjstime,t.username "
				+ "from tb_qjsc t,tuser u,tb_bm m "
				+ "where t.username=u.username and u.bm=m.code and t.username like '%"+name+"%' "
				+ " and t.qjkstime>=to_date('"+stime+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and t.qjkstime<=to_date('"+etime+" 23:59:59','yyyy-mm-dd hh24:mi:ss') "
				+ " and m.bm like '%"+bm+"%' order by t.qjkstime asc)ts )tt where tt.r<= 999999999  and tt.r>= 0";
//		System.out.println(sql);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		List<Map<String, Object>> resultlist = jdbcTemplate.queryForList(sql);
		List<Map<String,Object>> resultMap = new ArrayList<Map<String,Object>>();
		for(int i = 0; i< resultlist.size();i++){
			Map map = new HashMap<String,Object>();
			map.put("r",resultlist.get(i).get("R"));
			map.put("username",resultlist.get(i).get("USERNAME"));
			map.put("qjkstime",resultlist.get(i).get("QJKSTIME"));
			map.put("qjjstime",resultlist.get(i).get("QJJSTIME"));
			if(resultlist.get(i).get("qjkstime")!=null){
//				Date date = new Date(Long.parseLong(resultlist.get(i).get("qdtime").toString()));
				map.put("qjkstime",formatter.format(resultlist.get(i).get("QJKSTIME")));
			}else{
				map.put("qjkstime","");
			}
			if(resultlist.get(i).get("qjjstime")!=null){
//				Date date = new Date(Long.parseLong(resultlist.get(i).get("qttime").toString()));
				map.put("qjjstime",formatter.format(resultlist.get(i).get("QJJSTIME")));
			}else{
				map.put("qjjstime","");
			}
			resultMap.add(map);
		}
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("datas", resultMap);
		String msg = jacksonUtil.toJson(m);
		List<Map<String, Object>>list = DownloadAct.parseJSON2List1(msg);//导出的数据
		downloadAct.download(request,response,a,b,gzb,list);
		return null;
	}
	/**
	 * 增加请假
	 * 
	 * @return
	 * @throws ParseException 
	 */
	@RequestMapping(value = "/qjcxadd")
	@ResponseBody
	public String qjcxadd(HttpServletRequest request,
			@RequestParam("name") String name,
			@RequestParam("spuser") String spuser,
			@RequestParam("userid") String userid,
			@RequestParam("kstime") String kstime,
			@RequestParam("jstime") String jstime,
			@RequestParam("qjly") String qjly,
			@RequestParam("qjlx") String qjlx,
			@RequestParam("qjjg") String qjjg,
			@RequestParam("qjsc") String qjsc
			){ 
		int msg =commonService.qjcxadd(name,spuser,userid,kstime,jstime,qjly, qjlx, qjjg, qjsc);
		if (msg == 1) {
			return "{\"msg\":\"添加成功\"}";
		} else {
			return "{\"msg\":\"添加失败\"}";
		}
	}
	/**
	 * 请假删除
	 * 
	 * @return
	 */
	@RequestMapping(value = "/qjcxdel")
	@ResponseBody
	public String qjcxdel(HttpServletRequest request, @RequestParam("sj") String sj) {
		int msg = 0;
		msg = commonService.qjcxdel(sj);
		System.out.println(sj);
		if (msg > 0) {
			return "{\"msg\":\"删除成功\"}";
		} else {
			return "{\"msg\":\"删除失败\"}";
		}
	}
	/**
	 * 修改请假
	 * 
	 * @return
	 */
	@RequestMapping(value = "/qjcxeditsave")
	@ResponseBody
	public String qjcxeditsave(HttpServletRequest request,
			@RequestParam("name") String name,
			@RequestParam("spuser") String spuser,
			@RequestParam("userid") String userid,
			@RequestParam("kstime") String kstime,
			@RequestParam("jstime") String jstime,
			@RequestParam("qjly") String qjly,
			@RequestParam("qjlx") String qjlx,
			@RequestParam("qjjg") String qjjg,
			@RequestParam("qjsc") String qjsc,
			@RequestParam("id") String id
			) {
		int msg = 0;
		msg = commonService.qjcxeditsave(name,spuser,userid,kstime,jstime,qjly,qjlx,qjjg,qjsc,id);
		if (msg > 0) {
			return "{\"msg\":\"修改成功\"}";
		} else {
			return "{\"msg\":\"修改失败\"}";
		}
	}
	
	/**
	 * 外勤查询
	 * 
	 * @return
	 */
	@RequestMapping(value = "/wqcx")
	@ResponseBody
	public String wqcx(HttpServletRequest request,
			@RequestParam("name") String name,
			@RequestParam("bm") String bm,
			@RequestParam("stime") String stime,
			@RequestParam("etime") String etime,
			@RequestParam("currentpage") String currentpage,
			@RequestParam("totalnum") String totalnum) {
		String msg = commonService.wqcx(name,bm, stime,etime,currentpage, totalnum);
		return msg;
	}
	@RequestMapping("/wqcxexcle")
	@ResponseBody
	public String wqcxexcle(HttpServletRequest request,
			HttpServletResponse response,@RequestParam("name") String name,
			@RequestParam("bm") String bm,
			@RequestParam("stime") String stime,
			@RequestParam("etime") String etime,
			@RequestParam("currentpage") String currentpage,
			@RequestParam("totalnum") String totalnum) throws IOException{
		String a[] = {"序号","姓名","外勤时间"};//导出列名
		String b[] = {"r","username","bgtime"};//导出map中的key
		String gzb = "外勤表";//导出sheet名和导出的文件名
		String sql = "select * from (select ts.*,rownum r from(select t.bgtime,t.username "
				+ "from tb_wqbgsc t,tuser u,tb_bm m where "
				+ "t.username=u.username and u.bm=m.code and t.username like '%"+name+"%' "
				+ " and t.bgtime>=to_date('"+stime+" 00:00:00','yyyy-MM-dd hh24:mi:ss') and t.bgtime<=to_date('"+etime+" 23:59:59','yyyy-MM-dd  hh24:mi:ss') "
				+ " and m.bm like '%"+bm+"%' order by t.bgtime asc)ts )tt where tt.r<= 999999999  and tt.r>= 0";
//		System.out.println(sql);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		List<Map<String, Object>> resultlist = jdbcTemplate.queryForList(sql);
		List<Map<String,Object>> resultMap = new ArrayList<Map<String,Object>>();
		for(int i = 0; i< resultlist.size();i++){
			Map map = new HashMap<String,Object>();
			map.put("r",resultlist.get(i).get("R"));
			map.put("username",resultlist.get(i).get("USERNAME"));
			map.put("bgtime",resultlist.get(i).get("BGTIME"));
			if(resultlist.get(i).get("bgtime")!=null){
				map.put("bgtime",formatter.format(resultlist.get(i).get("BGTIME")));
			}else{
				map.put("bgtime","");
			}
			resultMap.add(map);
		}
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("datas", resultMap);
		String msg = jacksonUtil.toJson(m);
		List<Map<String, Object>>list = DownloadAct.parseJSON2List1(msg);//导出的数据
		downloadAct.download(request,response,a,b,gzb,list);
		return null;
	}
	
	
	/**
	 * 月外勤表
	 * 
	 * @return
	 */
	@RequestMapping(value = "/ywqb")
	@ResponseBody
	public String ywqb(HttpServletRequest request,
			@RequestParam("name") String name,
			@RequestParam("bm") String bm,
			@RequestParam("stime") String stime,
			@RequestParam("dyts") String dyts) {
		String msg = commonService.ywqb(name,bm,stime,dyts);
		return msg;
	}

/**
 * 增加外勤
 * 
 * @return
 * @throws ParseException 
 */
@RequestMapping(value = "/wqcxadd")
@ResponseBody
public String wqcxadd(HttpServletRequest request,
		@RequestParam("username") String username,
		@RequestParam("spuser") String spuser,
		@RequestParam("userid") String userid,
		@RequestParam("time") String time,
		@RequestParam("address") String address,
		@RequestParam("content") String content,
		@RequestParam("spjg") String spjg
		){ 
	int msg =commonService.wqcxadd(username, spuser,userid, time, address, content, spjg);
	if (msg == 1) {
		return "{\"msg\":\"添加成功\"}";
	} else {
		return "{\"msg\":\"添加失败\"}";
	}
}
/**
 * 外勤删除
 * 
 * @return
 */
@RequestMapping(value = "/wqcxdel")
@ResponseBody
public String wqcxdel(HttpServletRequest request, @RequestParam("sj") String sj) {
	int msg = 0;
	msg = commonService.wqcxdel(sj);
	System.out.println(sj);
	if (msg > 0) {
		return "{\"msg\":\"删除成功\"}";
	} else {
		return "{\"msg\":\"删除失败\"}";
	}
}
/**
 * 修改外勤信息
 * 
 * @return
 */
@RequestMapping(value = "/wqcxeditsave")
@ResponseBody
public String wqcxeditsave(HttpServletRequest request,
		@RequestParam("username") String username,
		@RequestParam("spuser") String spuser,
		@RequestParam("userid") String userid,
		@RequestParam("time") String time,
		@RequestParam("address") String address,
		@RequestParam("content") String content,
		@RequestParam("spjg") String spjg,
		@RequestParam("id") String id
		) {
	int msg = 0;
	msg = commonService.wqcxeditsave(username,spuser,userid,time,address,content,spjg,id);
	if (msg > 0) {
		return "{\"msg\":\"修改成功\"}";
	} else {
		return "{\"msg\":\"修改失败\"}";
	}
}
/**
 * 加班查询
 * 
 * @return
 */
@RequestMapping(value = "/jbcx")
@ResponseBody
public String jbcx(HttpServletRequest request,
		@RequestParam("name") String name,
		@RequestParam("bm") String bm,
		@RequestParam("kstime") String kstime,
		@RequestParam("jstime") String jstime,
		@RequestParam("currentpage") String currentpage,
		@RequestParam("totalnum") String totalnum) {
	String msg = commonService.jbcx(name,bm,kstime,jstime,currentpage,totalnum);
	return msg;
}
@RequestMapping("/jbcxexcle")
@ResponseBody
public String jbcxexcle(HttpServletRequest request,
		HttpServletResponse response,@RequestParam("name") String name,
		@RequestParam("bm") String bm,
		@RequestParam("kstime") String kstime,
		@RequestParam("jstime") String jstime,
		@RequestParam("currentpage") String currentpage,
		@RequestParam("totalnum") String totalnum) throws IOException{
	String a[] = {"序号","姓名","加班开始时间","加班结束时间"};//导出列名
	String b[] = {"r","username","jbkstime","jbjstime"};//导出map中的key
	String gzb = "加班表";//导出sheet名和导出的文件名
	String sql = "select * from (select ts.*,rownum r from(select t.jbkstime,t.jbjstime,t.username "
				+ "from tb_jb t,tuser u,tb_bm m where "
				+ "t.username=u.username and u.bm=m.code and t.username like '%"+name+"%' "
				+ " and t.jbkstime>=to_date('"+kstime+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and t.jbkstime<=to_date('"+jstime+" 23:59:59','yyyy-mm-dd hh24:mi:ss') "
				+ " and m.bm like '%"+bm+"%' order by t.jbkstime asc)ts )tt where tt.r<= 999999999  and tt.r>= 0";
//	System.out.println(sql);
	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	List<Map<String, Object>> resultlist = jdbcTemplate.queryForList(sql);
	List<Map<String,Object>> resultMap = new ArrayList<Map<String,Object>>();
	for(int i = 0; i< resultlist.size();i++){
		Map map = new HashMap<String,Object>();
		map.put("r",resultlist.get(i).get("R"));
		map.put("username",resultlist.get(i).get("USERNAME"));
		map.put("jbkstime",resultlist.get(i).get("JBKSTIME"));
		map.put("jbjstime",resultlist.get(i).get("JBJSTIME"));
		if(resultlist.get(i).get("jbkstime")!=null){
			map.put("jbkstime",formatter.format(resultlist.get(i).get("JBKSTIME")));
		}else{
			map.put("jbkstime","");
		}
		if(resultlist.get(i).get("jbjstime")!=null){
			map.put("jbjstime",formatter.format(resultlist.get(i).get("JBJSTIME")));
		}else{
			map.put("jbjstime","");
		}
		resultMap.add(map);
	}
	Map<String, Object> m = new HashMap<String, Object>();
	m.put("datas", resultMap);
	String msg = jacksonUtil.toJson(m);
	List<Map<String, Object>>list = DownloadAct.parseJSON2List1(msg);//导出的数据
	downloadAct.download(request,response,a,b,gzb,list);
	return null;
}

/**
 * 增加加班
 * 
 * @return
 * @throws ParseException 
 */
@RequestMapping(value = "/jbcxadd")
@ResponseBody
public String jbcxadd(HttpServletRequest request,
		@RequestParam("username") String username,
		@RequestParam("spuser") String spuser,
		@RequestParam("userid") String userid,
//		@RequestParam("bm") String bm,
		@RequestParam("stime") String stime,
		@RequestParam("etime") String etime,
		@RequestParam("content") String content,
		@RequestParam("sqjg") String sqjg,
		@RequestParam("jbsc") String jbsc
		) throws ParseException{ 
	int msg =commonService.jbcxadd(username, spuser, userid,stime, etime, content, sqjg,jbsc);
	if (msg == 1) {
		return "{\"msg\":\"添加成功\"}";
	} else {
		return "{\"msg\":\"添加失败\"}";
	}
}
/**
 * 加班删除
 * 
 * @return
 */
@RequestMapping(value = "/jbcxdel")
@ResponseBody
public String jbcxdel(HttpServletRequest request, @RequestParam("sj") String sj) {
	int msg = 0;
	msg = commonService.jbcxdel(sj);
	if (msg > 0) {
		return "{\"msg\":\"删除成功\"}";
	} else {
		return "{\"msg\":\"删除失败\"}";
	}
}
/**
 * 修改加班信息
 * 
 * @return
 */
@RequestMapping(value = "/jbcxeditsave")
@ResponseBody
public String jbcxeditsave(HttpServletRequest request,
		@RequestParam("username") String username,
		@RequestParam("spuser") String spuser,
		@RequestParam("userid") String userid,
		@RequestParam("stime") String stime,
		@RequestParam("etime") String etime,
		@RequestParam("content") String content,
		@RequestParam("sqjg") String sqjg,
		@RequestParam("jbsc") String jbsc,
		@RequestParam("id") String id
		) {
	int msg = 0;
	msg = commonService.jbcxeditsave(username,spuser,userid, stime, etime, content, sqjg, jbsc, id);
	if (msg > 0) {
		return "{\"msg\":\"修改成功\"}";
	} else {
		return "{\"msg\":\"修改失败\"}";
	}
}
/**
 * 
 * 
 * @return
 */
@RequestMapping(value = "/queryqj")
@ResponseBody
public String queryqj(HttpServletRequest request,
		@RequestParam("id") String id
		) {
	String msg = commonService.queryqj(id);
	return msg;
}
/**
 * 
 * 
 * @return
 */
@RequestMapping(value = "/querywq")
@ResponseBody
public String querwq(HttpServletRequest request,
		@RequestParam("id") String id
		) {
	String msg = commonService.querywq(id);
	return msg;
}
/**
 * 
 * 
 * @return
 */
@RequestMapping(value = "/queryjb")
@ResponseBody
public String querjb(HttpServletRequest request,
		@RequestParam("id") String id
		) {
	String msg = commonService.queryjb(id);
	return msg;
}
/**
 * 
 * 
 * @return
 */
@RequestMapping(value = "/selectname")
@ResponseBody
public String selectname(HttpServletRequest request
	) {
	String msg = commonService.selectname();
	return msg;
}

//@RequestMapping(value = "/selectwqname")
//@ResponseBody
//public String selectwqname(HttpServletRequest request
//	) {
//	String msg = commonService.selectwqname();
//	return msg;
//}
@RequestMapping(value = "/login")
@ResponseBody
public String login(HttpServletRequest request,
        @RequestParam("username") String username,
        @RequestParam("password") String password) {
    if(username.equals("admin")&&password.equals("admin")){
        request.getSession().setAttribute("username", username);
    }else if(username.equals("tw")&&password.equals("123")){
        request.getSession().setAttribute("username", username);
    }
    return "{}";
}

}
