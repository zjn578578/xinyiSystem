package com.xinyiSystem.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.xinyiSystem.pojo.*;
import com.xinyiSystem.service.RoleService;
import com.xinyiSystem.service.UserService;
import com.xinyiSystem.util.FileUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.xinyiSystem.mapper.*;


//专门用于显示页面的控制器
@RestController
@RequestMapping("")
public class PageController {
	String machine_msg_id;
	String faultType;
	String strid;
	String guzhangID;
	String lingjianid;
	@Autowired
	expertsDatabaseMapping expertsDatabaseMapping;
	@Autowired
	photoMapper photoMapper;
	@Autowired
	photoDAO photoDAO;
	@Autowired
	adminMapper adminMapper;
	@Autowired
	sendListMapper sendListMapper;
	@Autowired
	machineMapper machineMapper;
	@Autowired
	machineDAO machineDAO;
	@Autowired
	structureMapper structureMapper; 
	@Autowired
	structureDAO structureDAO; 
	@Autowired
	partsMapper partsMapper;
	@Autowired
	partsDAO partsDAO;
	@Autowired
	upkeepDAO upkeepDAO;
	@Autowired
	upkeeplistDAO upkeeplistDAO;

	@Controller//主页面重定向
	public class IndexController {


		@RequestMapping("/")
		public String index() {
			return "forward:/blogin.html";
		}
	}

	@RequestMapping("dengluxianshi")//用户页面获取信息
	@ResponseBody
	public String zhuye() {
		Subject subject = SecurityUtils.getSubject();
		if(subject.hasRole("admin")) {
			return "1";
		}
		else if(subject.hasRole("chief")) {
			return "2";
		}
		else if(subject.hasRole("monitor")) {
			return "3";
		}
		else {
			return "4";
		}

	}

	@RequestMapping("login")//登入
	public String login(@RequestBody admin admin) {
		machine_msg_id=new String();
		faultType=new String();
		Subject subject = SecurityUtils.getSubject();
		String name = admin.getA_name();
		String password = admin.getA_password();
		UsernamePasswordToken token = new UsernamePasswordToken(name, password);
		try {
			subject.login(token);
			//			Session session = subject.getSession();
			//			session.setAttribute("subject", subject);
			if(subject.hasRole("productManager")) {
				return "2";
			}else if(subject.hasRole("admin") || subject.hasRole("monitor")|| subject.hasRole("chief")|| subject.hasRole("worker")|| subject.hasRole("account")) {
				return "1";
			}


		} catch (AuthenticationException e) {
			return "3";
		}
		return "test";

	}


	@RequestMapping("judgePermissions")//判断权限
	public String shiroTest(@RequestBody String str) {
		Subject subject = SecurityUtils.getSubject();
		if(subject.hasRole("admin")) {
			return "1";
		}else {
			return "2";
		}


	}

	@RequestMapping("getUserInformation")//用户页面获取信息
	@ResponseBody
	public String inputUserInformation(@RequestBody String key) {
		List<admin> selectALL = adminMapper.selectALL();
		String jsonString = JSON.toJSONString(selectALL);
		return jsonString;

	}

	@RequestMapping("getAlterUserInformation")//用户界面修改信息
	@ResponseBody
	public String getAlterUserInformation(permission1 msg) {
		Subject subject=SecurityUtils.getSubject();
		if(subject.hasRole("admin")) {
			String a_id = msg.getA_id();
			String a_permission = msg.getA_permission();
			adminMapper.updateAlterInformation(a_id,a_permission);
			return "1";
		}else {
			return "没有权限";
		}

	}
	
	@RequestMapping("updaterolemsg")//用户界面更变账户类型
	@ResponseBody
	public String updaterolemsg( permission1 msg) {
		adminMapper.updaterole(Integer.parseInt(msg.getA_id()),msg.getA_role());
		return "1";
	}
	

	@RequestMapping("faultreview")//
	@ResponseBody
	public String faultreview() {
		Subject subject=SecurityUtils.getSubject();
		if(subject.hasRole("admin")|| subject.hasRole("monitor")) {
			String userName=(String) subject.getPrincipal();
			String[] a_permissions= adminMapper.findPermissionByName(userName).split("-");
			List<sendList> result=new LinkedList<>();
			for(int i=0;i<a_permissions.length;i++) {
				result.addAll(sendListMapper.findMsg1ByPermission(a_permissions[i]));
				result.addAll(sendListMapper.findMsg3ByPermission(a_permissions[i]));
				result.addAll(sendListMapper.findMsg5ByPermission(a_permissions[i]));
			}
			String res=JSON.toJSONString(result);
			return res;
		}
		return null;

	}

	@RequestMapping("faultreview1")//
	@ResponseBody
	public String faultreview1() {
		Subject subject=SecurityUtils.getSubject();
		if(subject.hasRole("admin")|| subject.hasRole("monitor")) {
			String userName=(String) subject.getPrincipal();
			String[] a_permissions= adminMapper.findPermissionByName(userName).split("-");
			List<sendList> result=new LinkedList<>();
			for(int i=0;i<a_permissions.length;i++) {
				result.addAll(sendListMapper.findMsg3ByPermission(a_permissions[i]));
			}
			String res=JSON.toJSONString(result);
			return res;
		}
		return null;

	}


	@RequestMapping("updatefaultreview")//上报修表
	@ResponseBody
	public String updatefaultreview(@RequestBody String key) {
		Date date = new Date();
		SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd :HH:mm:ss");
		String nowdate = dateFormat.format(date);
		Subject subject=SecurityUtils.getSubject();
		String[] msg=key.split("=");
		int s_id=Integer.parseInt(msg[1]);
		if(subject.hasRole("admin") || subject.hasRole("monitor")) {
			sendListMapper.updatefaultreview(s_id,nowdate);	
		}
		return "1";


	}

	@RequestMapping("unauthorized")//没有权限
	@ResponseBody
	public String unauthorized() {
		return "您还没有访问权限！";
	}

	@RequestMapping("updatePermissions")//更新权限
	public String updatePermissions() {
		List<admin> selectALL = adminMapper.selectALL();
		return JSON.toJSONString(selectALL);
	}

	@RequestMapping("deleteUsers")//删除用户信息
	public String deleteUsers(@RequestBody List<admin> a) {
		for(int i=0;i<a.size();i++) {
			admin res=a.get(i);
			adminMapper.delete(res.getA_id());
		}
		return "1";
	}

	@RequestMapping("updateusers")//更新用户信息
	public String updateusers(@RequestBody List<admin> a) {
		for(int i=0;i<a.size();i++) {
			admin res=a.get(i);
			if(res.getA_id()==0) { 
				adminMapper.insert(res);
			}
			adminMapper.update(res.getA_id(), res.getA_name(), res.getA_password(), res.getA_role(),res.getA_xingming()); 


		}	
		return "1";
	}

	/*
	 * @RequestMapping("selectFactroy") public String select(@RequestBody
	 * List<admin> a) { List<machine> select = machineMapper.select(); for(int i
	 * =0;i<select.size();i++) { machine machine = select.get(i);
	 * machine.getM_type(); machine.getM_sendTo(); ArrayList bb=new ArrayList<>(); }
	 * return "1"; }
	 */


	@RequestMapping("sendMachineMsg")//jiqi界面纺机初始信息显示
	public String sendMachineMsg() {
		List<machine1> selectInfo = machineMapper.selectInfo();
		for (int i = 0; i < selectInfo.size(); i++) {
			if(selectInfo.get(i).getM_floor()==null) {
				selectInfo.get(i).setM_floor("");
			}
		}
		String jsonString = JSON.toJSONString(selectInfo);
		return jsonString;		
	}

	@RequestMapping("sendMachineMsg1")//main界面纺机具体树结构生成
	@ResponseBody
	public String sendMachineMsg1(machine1 message) {
		String m_sendTo=message.getM_send_to();
		String m_floor=message.getM_floor();
		String m_type=message.getM_type();
		/*
		 * if(m_floor.equals("选择楼层")) { List<machine> selectByfactory =
		 * machineMapper.selectByfactory(m_sendTo);
		 * System.out.println(JSON.toJSONString(selectByfactory)); return
		 * JSON.toJSONString(selectByfactory);
		 * 
		 * }else if(!m_floor.equals("选择楼层") && m_type.equals("选择机器名称")) { List<machine>
		 * selectByFloor = machineMapper.selectByFloor(m_floor, m_sendTo); return
		 * JSON.toJSONString(selectByFloor); }
		 */	
		List<machine> selectByFloorAndType = machineMapper.selectByFloorAndType(m_floor, m_type, m_sendTo);		
		List<structure> selectAll = structureMapper.selectAllByM_type(m_type);
		List<structure1> res= new LinkedList<>();

		for(int i = 0 ; i<selectAll.size();i++) {
			structure strA = selectAll.get(i);
			structure1 strB = new structure1();
			strB.setId(strA.getSt_name());
			strB.setTitle(strA.getSt_name());
			strB.setParentid(strA.getM_type());
			res.add(strB);
		}

		List<parts> selectAllParts = partsDAO.findBymType(m_type);

		for(int i = 0 ; i<selectAllParts.size();i++) {
			parts parts = selectAllParts.get(i);
			structure1 str = new structure1();
			str.setId(parts.getpName());
			str.setTitle(parts.getpName());
			str.setParentid(parts.getStName());
			res.add(str);
		}

		structure1 strC = new structure1();
		strC.setId(message.getM_type());
		strC.setTitle(message.getM_type());;
		strC.setParentid("0");;
		res.add(strC);

		String message1=JSON.toJSONString(res);
		return message1;

	}

	@RequestMapping("main_machineinfoSend")//main_machineinfo界面初始信息显示
	public String main_machineinfo() {
		List<machine> selectAll = machineMapper.selectAll();
		for (int i = 0; i < selectAll.size(); i++) {
			if(selectAll.get(i).getM_floor()==null){
				selectAll.get(i).setM_floor("");
			}
			if(selectAll.get(i).getM_department()==null){
				selectAll.get(i).setM_department("");
			}
		}
		return JSON.toJSONString(selectAll)	;
	}

	@RequestMapping("main_machineinfoDeleteSend")//main_machineinfo界面删除信息
	public String main_machineinfoDeleteSend(@RequestBody List<machine> machine) {
		for(int i=0;i<machine.size();i++) {
			machine res=machine.get(i);
			machineMapper.delete(res.getM_id());
		}
		return "1";
	}

	@RequestMapping("main_machineinfoUpdateSend")//main_machineinfo界面提交信息
	public int main_machineinfoUpdateSend(@RequestBody List<machine> machine) {
		machineDAO.save(machine);
		return 1;
	}


	@RequestMapping("main_machinestructureSend")//main_machinestructure界面初始信息显示
	public String main_machinestructure(@RequestBody object2 msg) {
		//String substring = msg.substring(0,msg.length()-1);
		//String selectm_type = machineMapper.selectm_type(substring);
		List<structure> selectAllByM_type = structureMapper.selectAllByM_type(msg.getM_type());
		for (int i = 0; i < selectAllByM_type.size(); i++) {
			if(selectAllByM_type.get(i).getPhotoname()==null) {
				selectAllByM_type.get(i).setPhotoname("");
			}
		}
		return JSON.toJSONString(selectAllByM_type);
	}

	@RequestMapping("main_machinestructureDeleteSend")//main_machinestructure界面删除信息
	public String main_machinestructureDeleteSend(@RequestBody List<structure> structure) {
		for(int i=0;i<structure.size();i++) {
			structure res=structure.get(i);
			String st_name = structure.get(i).getSt_name();	
			String m_type = structure.get(i).getM_type();
			structureDAO.delete(res.getSt_id());
			expertsDatabaseMapping.delete1(m_type,st_name);
			partsMapper.delete1(m_type, st_name);
		}
		return "1";
	}

	@RequestMapping("main_machinestructureUpdateSend")//main_machinestructure界面提交信息
	public int main_machinestructureUpdateSend(@RequestBody List<structure> structure) {
		structureDAO.save(structure);
		return 1;
	}

	@RequestMapping("main_machineUpkeepSend")//main_machineupkeep界面提交信息
	public int main_machineUpkeppSend(@RequestBody  Integer msg) {

		//	upkeepDAO.findOne(msg);
		return 1;
	}


	@RequestMapping("/sendList1")//找到目前最大的单号
	@ResponseBody
	public String getPhotoName(treeMachine msg) {
		String machine_msg=msg.getMachine_id()+"-"+msg.getMachine_parent_id();		
		machine_msg_id=machine_msg;
		return "aa";

	}
	
	@RequestMapping("/stid")//找到机器结构的ID
	@ResponseBody
	public String stid(@RequestBody String stid) {
		strid=stid.substring(6,stid.length());
		return null;
	}
	
	@RequestMapping("/guzhangid")//找到机器结构的ID
	@ResponseBody
	public String guzhangid(@RequestBody String ID) {
		String ID1 = ID.substring(3,ID.length());
		guzhangID=ID1;
		return null;
	}
	
	@RequestMapping("/lingjianid")//找到机器结构的ID
	@ResponseBody
	public String lingjianid(@RequestBody String ID) {
		String ID1 = ID.substring(3,ID.length());
		lingjianid=ID1;
		return null;
	}
	
	@RequestMapping("/imageUpload1")//树结构的图片上传，待删。
	@ResponseBody
	public String imageUpload1(@RequestParam("inputBox") MultipartFile file) {
		String result_msg="";//上传结果信息
		Map<String,Object> root=new HashMap<String, Object>();
		//判断上传文件格式
		String fileType = file.getContentType();
		// 要上传的目标文件存放的绝对路径
		//用src为保存绝对路径不能改名只能用原名，不用原名会导致ajax上传图片后在前端显示时出现404错误-->原因未知
		//                String localPath="F:\\IDEAProject\\imageupload\\src\\main\\resources\\static\\img";
	//final String localPath="C:\\Users\\楠哥\\eclipse-workspace\\xinyiSystem\\src\\main\\webapp\\img"; 
		final String localPath="D:\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\img";
		
		//上传后保存的文件名(需要防止图片重名导致的文件覆盖)
		//获取文件名
		String fileName = file.getOriginalFilename();
		String[] msg=machine_msg_id.split("-");
		int count=photoMapper.findCount();
		List<photo> myphoto=photoMapper.selectALL(msg[0], msg[1]);
		photo photo=new photo();				
		photo.setPhoto_name(msg[0]);
		photo.setPhoto_paren(msg[1]);
		photo.setPhoto_path(fileName);
		if (FileUtils.upload(file, localPath, fileName)) {
			//文件存放的相对路径(一般存放在数据库用于img标签的src)
			String relativePath="img/"+fileName;
			root.put("relativePath",relativePath);//前端根据是否存在该字段来判断上传是否成功
			result_msg="图片上传成功";
			if(myphoto.size()>0) {
				System.out.println("图片已经存在");
				photo.setPhoto_id(myphoto.get(0).getPhoto_id());
				photoMapper.update(photo.getPhoto_id(), photo.getPhoto_path());
			}else {
				System.out.println("保存图片");
				photo.setPhoto_id(count+1);
				photoMapper.insert(photo);
			}

		}
		else{
			result_msg="图片上传失败";
		}

		root.put("result_msg",result_msg);

		//        JSON.toJSONString(root,SerializerFeature.DisableCircularReferenceDetect);
		String root_json=JSON.toJSONString(root);
		return root_json;

	}
	@RequestMapping("/findphoto")
	@ResponseBody
	public String findphoto(treeMachine msg) {
		if(msg.getMachine_parent_id()==null) {
			List<photo> res=photoMapper.selectById(msg.getMachine_id());
			photo photo=res.get(0);
			return photo.getPhoto_path();
		}
		List<photo> res=photoMapper.selectALL(msg.getMachine_id(), msg.getMachine_parent_id());
		photo photo=res.get(0);
		return photo.getPhoto_path();

	}
	@RequestMapping("/getmachineinfo")
	@ResponseBody
	public String getmachineinfo() {
		List<machine> findAll = machineDAO.findAll();
		for (int i = 0; i < findAll.size(); i++) {
			if(findAll.get(i).getM_floor()==null) {
				findAll.get(i).setM_floor("");
			}		
		}
		String res=JSON.toJSONString(findAll);
		return res;

	}
	
	@RequestMapping("/getmachineinfo1")
	@ResponseBody
	public String getmachineinfo1() {
		Subject subject = SecurityUtils.getSubject();
		Object principal = subject.getPrincipal();
		String string = principal.toString();
		adminMapper.SelectName(string);
		String res=JSON.toJSONString(adminMapper.SelectName(string));
		return adminMapper.SelectName(string);

	}

	/*
	 * @RequestMapping("/updatefaultmessage")
	 * 
	 * @ResponseBody public String updatefaultmessage(experts_database msg) {
	 * expertsDatabaseMapping.save(msg); return "提交成功";
	 * 
	 * }
	 */
	/*
	 * @RequestMapping("/findfaultidbytype")
	 * 
	 * @ResponseBody public String findfaultidbytype(experts_database msg) {
	 * faultType=msg.getType(); return "aa";
	 * 
	 * }
	 */
		@RequestMapping("/gethelp")
		@ResponseBody
		public String getHelp(faulthelp help) {
			String[] reStrings=new String[2];
			if(help.getFault_type()!="其他") {
				reStrings=help.getFault_type().split(" ");
			}else {
				return null;
			}
			System.out.println(help.getMachine_type()+reStrings[0]+reStrings[1]);
			List<experts_database> res=expertsDatabaseMapping.selectBystnameAndmtype1(help.getMachine_type(), reStrings[0], reStrings[1]);
			for (int i = 0; i < res.size(); i++) {
				if(res.get(i).getFault_msg()==null) {
					res.get(i).setFault_msg("");
				}
			}
			System.out.println(res.size());
			return JSON.toJSONString(res);
			
			
		}
	

	@RequestMapping("/upkeepinfo")//保养条目初始信息
	@ResponseBody
	public String upkeepinfo(@RequestBody upkeep upkeep) {
		String uMid = upkeep.getuMid();
		List<upkeep> findByuMid = upkeepDAO.findByuMid(uMid);
		JSON.toJSONString(findByuMid);
		return JSON.toJSONString(findByuMid);		
	}


	@RequestMapping("/upkeepUpdate")//同类型机器保养条目更新
	@ResponseBody
	public String upkeepUpdate(@RequestBody List<upkeep> upkeep) {	
		Date date = new Date();
		SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
		String nowdate = dateFormat.format(date);
		String machineType=upkeep.get(0).getuMtype();
		List<machine> res=machineMapper.selectByMtype(machineType);//13 21
		for(machine machine:res) {
			int machineId=machine.getM_id(); 
			String uSendto = machine.getM_send_to();
			String id=String.valueOf(machineId);			
			List<upkeep> findByuMid = upkeepDAO.findByuMid(id);
			List<upkeep> upkeep1=new LinkedList<>();
			upkeep1.addAll(upkeep);
			for(upkeep item:findByuMid) {
				int uid=item.getuId();
				String uitem=item.getuItem();
				int a=0;
				for(upkeep item1:upkeep) {
					if(item1.getuItem().equals(uitem)) {
						upkeep upkeep2 = new upkeep();
						upkeep2.setuId(uid);
						upkeep2.setuItem(uitem);
						upkeep2.setuMid(id);
						upkeep2.setuMtype(machineType);
						upkeep2.setuStartTime(nowdate);
						upkeep2.setuCycle(item1.getuCycle());
						upkeep2.setuSendto(uSendto);
						upkeep2.setuStatus("无需保养");
						upkeep2.setuMmid(machine.getM_mid());
						upkeep2.setuRemark(item1.getuRemark());
						upkeepDAO.save(upkeep2);
						upkeep1.remove(item1);

					}
				}


			}
			if(upkeep1.size()>0) {
				for(int i=0;i<upkeep1.size();i++) {
					upkeep upkeep3 = new upkeep();
					upkeep3.setuItem(upkeep1.get(i).getuItem());
					upkeep3.setuMid(id);
					upkeep3.setuMtype(upkeep1.get(i).getuMtype());
					upkeep3.setuStartTime(nowdate);
					upkeep3.setuCycle(upkeep1.get(i).getuCycle());
					upkeep3.setuStatus("无需保养");
					upkeep3.setuSendto(uSendto);
					upkeep3.setuMmid(machine.getM_mid());
					upkeep3.setuRemark(upkeep1.get(i).getuRemark());
					upkeepDAO.save(upkeep3);				
				}
			}

		}



		return null;		
	}


	@RequestMapping("/upkeepinfoUpdateOne")//保养条目单个机器更新
	@ResponseBody
	public String upkeepinfoUpdateOne(@RequestBody List<upkeep> upkeep) {	
		Date date = new Date();
		SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
		String nowdate = dateFormat.format(date);
		for(int i=0;i<upkeep.size();i++) {
			String getuMid = upkeep.get(i).getuMid();
			String m_send_to = machineDAO.findOne(Integer.parseInt(getuMid)).getM_send_to();
			upkeep upkeep1 = new upkeep();
			upkeep1.setuStartTime(nowdate);
			upkeep1.setuSendto(m_send_to);
			upkeep1.setuCycle(upkeep.get(i).getuCycle());
			upkeep1.setuId(upkeep.get(i).getuId());
			upkeep1.setuItem(upkeep.get(i).getuItem());
			upkeep1.setuStatus("无需保养");
			upkeep1.setuMtype(upkeep.get(i).getuMtype());
			upkeep1.setuMid(upkeep.get(i).getuMid());
			upkeep1.setuMmid(machineDAO.findOne(Integer.parseInt(getuMid)).getM_mid());	
			upkeep1.setuRemark(upkeep.get(i).getuRemark());
			upkeepDAO.save(upkeep1);
		}
		return faultType;
	}

	@RequestMapping("/upkeepinfoDeleteOne")//保养条目单个机器删除
	@ResponseBody
	public String upkeepinfoDeleteOne(@RequestBody List<upkeep> upkeep) {	
		for(int i =0;i<upkeep.size();i++) {
			upkeepDAO.delete(upkeep.get(i).getuId());
		}
		return faultType;
	}

	@RequestMapping("/upkeepinfoDeleteAll")//保养条目全体机器删除
	@ResponseBody
	public String upkeepinfoDeleteAll(@RequestBody List<upkeep> upkeep) {
		String machineType=upkeep.get(0).getuMtype();
		List<machine> res=machineMapper.selectByMtype(machineType);//13 21
		for(machine machine:res) {
			int machineId=machine.getM_id(); 
			String uMid = Integer.toString(machineId);
			for(upkeep item :upkeep) {
				String uItem = item.getuItem();
				int getuId = upkeepDAO.findByUMidAndUItem(uMid, uItem).getuId();
				upkeepDAO.delete(getuId);
			}
	
		}
		return faultType;
	}
	
	@RequestMapping("/recordlist11")//故障历史记录
	@ResponseBody
	public String recordlist() {	
		List<sendList> selectAll = sendListMapper.selectFinish();
		return JSON.toJSONString(selectAll);
	}

	@RequestMapping("/recordupkeeplist")//保养历史记录
	@ResponseBody
	public String recordupkeeplist() {	
//		List<upkeeplist> findAll = upkeeplistDAO.findAll();
		upkeeplistDAO.findAllByOrderByUIdDesc();
		return JSON.toJSONString(upkeeplistDAO.findAllByOrderByUIdDesc()); 
	}
	
	/*
	 * @RequestMapping("getdatatest")
	 * 
	 * @ResponseBody public String getdatatest() { List<specialFault1> res =
	 * expertsDatabaseMapping.findAllspecialFault(); Map map=new HashMap<>();
	 * map.put("value", res); return JSON.toJSONString(map);
	 * 
	 * }
	 */
	
	/*
	 * @RequestMapping("getSpecialPhoto")
	 * 
	 * @ResponseBody public String getSpecialPhoto(experts_database msg) {
	 * List<expertsPhoto> res = expertsPhotoDAO.findByFaultType(msg.getType());
	 * return JSON.toJSONString(res);
	 * 
	 * }
	 */
	
	@RequestMapping("getmachineplacemsg")
	@ResponseBody
	public String getmachineplacemsg() {
		List<machine> findAll = machineDAO.findAll();
		return JSON.toJSONString(findAll);
	}
	
	@RequestMapping("notpass")
	@ResponseBody
	public String notpass(@RequestBody sendList sendList) {
		sendListMapper.updatenotpass(sendList.getS_id(), sendList.getS_listType());
		return null;
	}
	
	//新的结构图片上传
		@RequestMapping("/imageUploadjiegou")
		public String imageUpload(@RequestParam("inputBox") MultipartFile file){
			String result_msg="";//上传结果信息
			Map<String,Object> root=new HashMap<String, Object>();
				String fileType = file.getContentType();
					//final String localPath="F:\\test";					
					final String localPath="D:\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\jiegou";
					String fileName = file.getOriginalFilename();
					structureMapper.updatephotoname(strid, fileName);
					if (FileUtils.upload(file, localPath, fileName)) {
						String relativePath="img/"+fileName;	
						System.out.println(relativePath);
						root.put("relativePath",relativePath);//前端根据是否存在该字段来判断上传是否成功
						result_msg="图片上传成功";
					}
					else{
						result_msg="图片上传失败";
					}
			root.put("result_msg",result_msg);
			String root_json=JSON.toJSONString(root);
			return root_json;
		}
	
		@RequestMapping("/main_machineguzhangSend")
		public String main_machineguzhangSend(@RequestBody machine msg){
			String m_type = msg.getM_type();
			String[] splitAddress=m_type.split(":");
			String string = splitAddress[0];
			String string2 = splitAddress[1];
			List<experts_database> selectAllByMsg = expertsDatabaseMapping.selectAllByMsg(string, string2);
			if(selectAllByMsg.size()==0) {
				return null;
			}
			else
				for (int i = 0; i <selectAllByMsg.size(); i++) {
					if(selectAllByMsg.get(i).getFault_photo()==null) {
						selectAllByMsg.get(i).setFault_photo("");
					}
				}
				return JSON.toJSONString(selectAllByMsg);
		}
		
		@RequestMapping("/main_machineguzhangUpdateSend")
		public String main_machineguzhangUpdateSend(@RequestBody List<experts_database> a){
			for(int i=0;i<a.size();i++) {
				experts_database res=a.get(i);
				if(res.getFault_id()==0) { 
					expertsDatabaseMapping.insert(res);
				}
				expertsDatabaseMapping.update(res.getFault_id(), res.getFault_machine(), res.getFault_structure(), res.getFault_type(),res.getFault_msg()); 
			}	
			return "1";
		}
		
		@RequestMapping("main_machineguzhangDeleteSend")//main_machinestructure界面删除信息
		public String main_machineguzhangDeleteSend(@RequestBody List<experts_database> experts_database) {
						for(int i=0;i<experts_database.size();i++) {
				experts_database res=experts_database.get(i);
				expertsDatabaseMapping.delete(res.getFault_id());
			}
			return "1";
		}
		
		//故障库图片上传
				@RequestMapping("/imageUploadguzhang")
				public String imageUploadguzhang(@RequestParam("inputBox") MultipartFile file){
					String result_msg="";//上传结果信息
					Map<String,Object> root=new HashMap<String, Object>();
						String fileType = file.getContentType();
							//final String localPath="F:\\guzhang";					
							final String localPath="D:\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\guzhang";
							String fileName = file.getOriginalFilename();
							expertsDatabaseMapping.updatephotoname(guzhangID, fileName);
							if (FileUtils.upload(file, localPath, fileName)) {
								String relativePath="img/"+fileName;	
								System.out.println(relativePath);
								root.put("relativePath",relativePath);//前端根据是否存在该字段来判断上传是否成功
								result_msg="图片上传成功";
							}
							else{
								result_msg="图片上传失败";
							}
					root.put("result_msg",result_msg);
					String root_json=JSON.toJSONString(root);
					return root_json;
				}
				
				@RequestMapping("/main_machinepartsSend")//零件界面初始信息显示
				public String main_machinepartsSend(@RequestBody machine msg) {
					String m_type = msg.getM_type();
					String[] splitAddress=m_type.split(":");
					String string = splitAddress[0];
					String string2 = splitAddress[1];
					List<parts> res = partsDAO.findByMTypeAndStName(string, string2);

					return JSON.toJSONString(res);				
					
				}
				@RequestMapping("main_machinepartsUpdateSend")//main_machineparts界面提交信息
				public int main_machinepartsUpdateSend(@RequestBody List<parts> parts) {
					partsDAO.save(parts);
					return 1;
				}
				
				@RequestMapping("main_machinepartsDeleteSend")//main_machineparts界面删除信息
				public String main_machinepartsDeleteSend(@RequestBody List<parts> parts) {
					for(int i=0;i<parts.size();i++) {
						parts res=parts.get(i);
						partsDAO.delete(res.getIdParts());
					}
					return "1";
				}
				
				//零件图片上传
				@RequestMapping("/imageUploadparts")
				public String imageUploadparts(@RequestParam("inputBox") MultipartFile file){
					String result_msg="";//上传结果信息
					Map<String,Object> root=new HashMap<String, Object>();
						String fileType = file.getContentType();
							//final String localPath="F:\\lingjian";					
							final String localPath="D:\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\lingjian";
							String fileName = file.getOriginalFilename();
							partsMapper.update(lingjianid,fileName);
							if (FileUtils.upload(file, localPath, fileName)) {
								String relativePath="img/"+fileName;	
								System.out.println(relativePath);
								root.put("relativePath",relativePath);//前端根据是否存在该字段来判断上传是否成功
								result_msg="图片上传成功";
							}
							else{
								result_msg="图片上传失败";
							}
					root.put("result_msg",result_msg);
					String root_json=JSON.toJSONString(root);
					return root_json;
				}
				
}
