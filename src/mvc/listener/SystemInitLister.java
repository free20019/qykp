//package mvc.listener;
//
//import helper.SystemConfig;
//
//import java.io.File;
//import java.sql.Driver;
//import java.sql.DriverManager;
//import java.sql.SQLException;
//import java.util.Enumeration;
//
//import javax.servlet.ServletContextEvent;
//import javax.servlet.ServletContextListener;
//
//import mvc.service.jiantingService;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.context.ApplicationContext;
//import org.springframework.web.context.support.WebApplicationContextUtils;
//
///**
// * 
// * @author qiaoliang.jian
// * @version
// */
//public class SystemInitLister implements ServletContextListener  {
//	private Logger logger = LoggerFactory.getLogger(this.getClass());  
//	public void contextDestroyed(ServletContextEvent arg0) {
//		Enumeration<Driver> drivers = DriverManager.getDrivers();
//		  while (drivers.hasMoreElements()) {
//	            Driver driver = drivers.nextElement();
//	            try {
//	                DriverManager.deregisterDriver(driver);
//	            } catch (SQLException e) {
//	            	logger.error("app_error",e);
//	            }
//	        }
//	}
//
//	public void contextInitialized(ServletContextEvent arg0) {
//		logger.info("#####system init#####");	
//		if(null == arg0.getServletContext().getInitParameter("uploadPath")
//				|| arg0.getServletContext().getInitParameter("uploadPath").isEmpty()){
//			logger.info("uploadPath no config... exit");
//			System.exit(0);
//		}
//		SystemConfig.uploadPath =  
//				arg0.getServletContext().getInitParameter("uploadPath")
//				+File.separatorChar;
//		
//		SystemConfig.dxGateway = arg0.getServletContext().getInitParameter("dxGateway");
//		logger.info("SystemConfig.dxGateway \t"+SystemConfig.dxGateway);
//		SystemConfig.recodeurl = arg0.getServletContext().getInitParameter("qrcodeurl");
//		logger.info("SystemConfig.recodeurl \t"+SystemConfig.recodeurl);
//		 File f = new File(SystemConfig.uploadPath);
//		 if(!f.exists()){
//			 f.mkdirs();
//			 logger.info(SystemConfig.uploadPath);
//			 logger.info(SystemConfig.uploadPath);
//		 }
//        ApplicationContext ctx = 
//              WebApplicationContextUtils.
//                    getWebApplicationContext(arg0.getServletContext());
//
//       jiantingService jiantingService = 
//              (jiantingService) ctx.getBean("jiantingService");
//       jiantingService.listen();
//	}
//
////	@Override
////	public void sessionCreated(HttpSessionEvent arg0) {
////		logger.info("#####session init#####");
////		 HttpSession session = arg0.getSession();
////
////         ApplicationContext ctx = 
////               WebApplicationContextUtils.
////                     getWebApplicationContext(session.getServletContext());
////
////         GisService gisService = 
////                     (GisService) ctx.getBean("gisService");
////         logger.info(gisService.getJdbcTemplate2());
////	}
////
////	@Override
////	public void sessionDestroyed(HttpSessionEvent arg0) {
////		logger.info("#####session destroye#####");
////		
////	}
//}
