package mvc.controllers;

import helper.DownloadAct;
import helper.JacksonUtil;
import mvc.service.PersonnelMattersService;
import org.apache.http.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * @author: xianlehuang
 * @Description:
 * @date: 2019/11/13 - 9:32
 */
@Controller
@RequestMapping("/personnelMatters")
public class PersonnelMattersAction {
    @Autowired
    private PersonnelMattersService personnelMattersService;
    private DownloadAct downloadAct = new DownloadAct();
    private JacksonUtil jacksonUtil = JacksonUtil.buildNormalBinder();

    //用户下拉栏
    @RequestMapping("/getUser")
    @ResponseBody
    public String getUser(HttpServletRequest request){
        String msg = personnelMattersService.getUser(request);
        return msg;
    }

    //个人晨报查询
    @RequestMapping("/findPersonalMorningReport")
    @ResponseBody
    public String findPersonalMorningReport(HttpServletRequest request){
        String msg = personnelMattersService.findPersonalMorningReport(request);
        return msg;
    }

    //工作总结查询
    @RequestMapping("/findWorkSummary")
    @ResponseBody
    public String findWorkSummary(HttpServletRequest request){
        String msg = personnelMattersService.findWorkSummary(request);
        return msg;
    }

    //工作总结添加
    @RequestMapping("/addWorkSummary")
    @ResponseBody
    public String addWorkSummary(HttpServletRequest request){
        return personnelMattersService.addWorkSummary(request);
    }

    //工作总结评价
    @RequestMapping("/evaluateWorkSummary")
    @ResponseBody
    public String evaluateWorkSummary(HttpServletRequest request){
        return personnelMattersService.evaluateWorkSummary(request);
    }

    //会议纪要查询
    @RequestMapping("/findMeetingMinutes")
    @ResponseBody
    public String findMeetingMinutes(HttpServletRequest request){
        String msg = personnelMattersService.findMeetingMinutes(request);
        return msg;
    }

    //会议纪要添加
    @RequestMapping("/addMeetingMinutes")
    @ResponseBody
    public String addMeetingMinutes(HttpServletRequest request){
        return personnelMattersService.addMeetingMinutes(request);
    }

    //离职交接查询
    @RequestMapping("/findTurnoverHandover")
    @ResponseBody
    public String findTurnoverHandover(HttpServletRequest request){
        String msg = personnelMattersService.findTurnoverHandover(request);
        return msg;
    }

    //离职交接添加
    @RequestMapping("/addTurnoverHandover")
    @ResponseBody
    public String addTurnoverHandover(HttpServletRequest request){
        return personnelMattersService.addTurnoverHandover(request);
    }
    //离职交接审批
    @RequestMapping("/auditTurnoverHandover")
    @ResponseBody
    public String auditTurnoverHandover(HttpServletRequest request){
        return personnelMattersService.auditTurnoverHandover(request);
    }
}
