package com.xinyiSystem.web;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import org.apache.shiro.subject.PrincipalCollection;
import com.alibaba.fastjson.JSON;
import com.xinyiSystem.mapper.*;
import com.xinyiSystem.pojo.admin;
import com.xinyiSystem.pojo.help;
import com.xinyiSystem.pojo.machine;
import com.xinyiSystem.pojo.object1;
import com.xinyiSystem.pojo.permission1;
import com.xinyiSystem.pojo.sendList;
import com.xinyiSystem.pojo.experts_database1;
import com.xinyiSystem.pojo.experts_database;
import com.xinyiSystem.pojo.treeMachine;
import com.xinyiSystem.pojo.upkeep;
import com.xinyiSystem.pojo.upkeep1;
import com.xinyiSystem.pojo.upkeeplist;
import com.xinyiSystem.util.FileUtils;
import com.xinyiSystem.service.*;
import com.xinyiSystem.service.impl.*;
@RestController
public class sendListController {
	@Autowired sendListMapper sendListMapper;
	@Autowired adminMapper adminMapper;
	@Autowired upkeepDAO upkeepDAO;
	@Autowired upkeeplistDAO upkeeplistDAO;
	@Autowired expertsDatabaseMapping specialFaultMapping;
	@Autowired machineDAO machineDAO;
	String photoName;

	//故障报修
	@RequestMapping("/sendList")
	public String subList(@RequestBody sendList sendList){
		Date date = new Date();
		SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd :HH:mm:ss");
		sendList.setS_date(dateFormat.format(date));
		sendList.setS_status("未维修");
		sendListMapper.insert(sendList);
		return "1";
	}

	//故障报修中的图片上传
	@RequestMapping("/imageUpload")
	public String imageUpload(@RequestParam("inputBox") MultipartFile file){
		String result_msg="";//上传结果信息

		Map<String,Object> root=new HashMap<String, Object>();

//		if (file.getSize() / 1000 > 1000){
//			result_msg="图片大小不能超过1000KB";
//		}
//		else{
			//判断上传文件格式
			String fileType = file.getContentType();
			/*
			 * if (fileType.equals("image/jpeg") || fileType.equals("image/png") ||
			 * fileType.equals("image/jpeg")||fileType.equals("image/pdf")) {
			 */
				// 要上传的目标文件存放的绝对路径
				//用src为保存绝对路径不能改名只能用原名，不用原名会导致ajax上传图片后在前端显示时出现404错误-->原因未知
				//                String localPath="F:\\IDEAProject\\imageupload\\src\\main\\resources\\static\\img";
				//final String localPath="C:\\Users\\楠哥\\eclipse-workspace\\xinyiSystem\\img";
				final String localPath="C:\\Program Files (x86)\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\img";
				//上传后保存的文件名(需要防止图片重名导致的文件覆盖)
				//获取文件名
				String fileName = file.getOriginalFilename();
			//	String suffixName = fileName.substring(fileName.lastIndexOf("."));
				int id = sendListMapper.selectS_id();
				fileName = "ck"+id+".jpg";
				//fileName = 1+suffixName;
				if (FileUtils.upload(file, localPath, fileName)) {
					//文件存放的相对路径(一般存放在数据库用于img标签的src)
					String relativePath="img/"+fileName;	
					System.out.println(relativePath);
					root.put("relativePath",relativePath);//前端根据是否存在该字段来判断上传是否成功
					result_msg="图片上传成功";
				}
				else{
					result_msg="图片上传失败";
				}
/*			}*/
			/*
			 * else{ result_msg="图片格式不正确"; }
			 */
	//	}

		root.put("result_msg",result_msg);

		//        JSON.toJSONString(root,SerializerFeature.DisableCircularReferenceDetect);
		String root_json=JSON.toJSONString(root);
		return root_json;
	}

	//看板未维修的信息
	@RequestMapping("/getUnrepairedInformation")
	public String broad_unRepaired(){		
		Subject subject = SecurityUtils.getSubject();
		if(subject.hasRole("admin") || (subject.hasRole("productManager")  )|| (subject.hasRole("chief")  )|| (subject.hasRole("monitor")  )|| (subject.hasRole("worker")  )) {
			String userName=(String) subject.getPrincipal();
			List<sendList> result=new LinkedList<>();		
			String[] a_permissions=adminMapper.findPermissionById(adminMapper.findIdByName(userName)).split("-");
			for(int i=0;i<a_permissions.length;i++) {
				List<sendList> list=sendListMapper.findMsg1ByPermission(a_permissions[i]);
				result.addAll(list);
			}
			String res=JSON.toJSONString(result);
			return res;
		}
		else{
			return "error";
		}
	}

	//看板维修中的信息
	@RequestMapping("/getBeingRepairedInformation")
	public String broad_beingRepaired(@RequestBody String str){
		Subject subject = SecurityUtils.getSubject();
		if(subject.hasRole("admin") || (subject.hasRole("productManager")  )|| (subject.hasRole("chief")  )|| (subject.hasRole("monitor")  )|| (subject.hasRole("worker")  )) {
			String userName=(String) subject.getPrincipal();
			List<sendList> result=new LinkedList<>();		
			String[] a_permissions=adminMapper.findPermissionById(adminMapper.findIdByName(userName)).split("-");
			for(int i=0;i<a_permissions.length;i++) {
				List<sendList> list=sendListMapper.findMsg2ByPermission(a_permissions[i]);
				result.addAll(list);
			}
			String res=JSON.toJSONString(result);
			return res;
		}
		else{
			return "error";
		}
	}

	//待审核的信息
	@RequestMapping("/getConfirmInformation")
	public String broad_Confirm(@RequestBody String str){
		Subject subject = SecurityUtils.getSubject();
		if(subject.hasRole("admin") || (subject.hasRole("productManager")  )|| (subject.hasRole("chief")  )|| (subject.hasRole("monitor")  )|| (subject.hasRole("worker")  )) {
			String userName=(String) subject.getPrincipal();
			List<sendList> result=new LinkedList<>();		
			String[] a_permissions=adminMapper.findPermissionById(adminMapper.findIdByName(userName)).split("-");
			for(int i=0;i<a_permissions.length;i++) {
				List<sendList> list=sendListMapper.findMsg3ByPermission(a_permissions[i]);
				List<sendList> list1=sendListMapper.findMsg5ByPermission(a_permissions[i]);
				result.addAll(list);
				result.addAll(list1);
			}
			String res=JSON.toJSONString(result);
			return res;
		}
		else{
			return "error";
		}
	}

	//需保养的信息
	@RequestMapping("/getUpKeepInformation")
	public String broad_upKeep(@RequestBody String str){
		Subject subject = SecurityUtils.getSubject();
		if(subject.hasRole("admin") || (subject.hasRole("productManager")  )|| (subject.hasRole("chief")  )|| (subject.hasRole("monitor")  )|| (subject.hasRole("worker")  )) {
			String userName=(String) subject.getPrincipal();
			List<upkeep> result=new LinkedList<>();		
			String[] a_permissions=adminMapper.findPermissionById(adminMapper.findIdByName(userName)).split("-");
			for(int i=0;i<a_permissions.length;i++) {
				List<upkeep> list = upkeepDAO.findByUSendtoAndUStatus(a_permissions[i], "无需保养");
				result.addAll(list);
			}
			String res=JSON.toJSONString(result);

			return res;
		}
		else{
			return "error";
		}
	}

	
	/*
	 * @RequestMapping("/gethelp")
	 * 
	 * @ResponseBody public String gethelp(help help) { String msg=help.getKey();
	 * List<fault_database> result=new LinkedList<>(); List<fault_database> findAll
	 * = fault_databaseDAO.findAll(); for(int i=0;i<findAll.size();i++) {
	 * fault_database item=findAll.get(i); String fault_type=item.getFault_type();
	 * if(fault_type.equals(msg)) { result.add(item); } } String
	 * res=JSON.toJSONString(result); return res; }
	 */
	@RequestMapping("/updateupkeep")
	@ResponseBody
	public String updateupkeep(@RequestBody upkeep upkeep) {		
		upkeep findOne = upkeepDAO.findOne(upkeep.getuId());
		findOne.setuStatus("需要保养");		
		upkeepDAO.save(findOne);
		return "1";		
	}
	
	@RequestMapping("/needupdateupkeep")
	@ResponseBody
	public String needupdateupkeep(@RequestBody String str) {		
		Subject subject = SecurityUtils.getSubject();
		if(subject.hasRole("admin") || (subject.hasRole("productManager")  )|| (subject.hasRole("chief")  )|| (subject.hasRole("monitor")  )|| (subject.hasRole("worker")  )) {
			String userName=(String) subject.getPrincipal();
			List<upkeep> result=new LinkedList<>();		
			String[] a_permissions=adminMapper.findPermissionById(adminMapper.findIdByName(userName)).split("-");
			for(int i=0;i<a_permissions.length;i++) {
				List<upkeep> list = upkeepDAO.findByUSendtoAndUStatus(a_permissions[i], "需要保养");
				result.addAll(list);
			}
			String res=JSON.toJSONString(result);

			return res;
		}
		else{
			return "error";
		}	
	}
	
	
	@RequestMapping("/finishupkeep")
	@ResponseBody
	public String finishupkeep(@RequestBody List<upkeeplist> upkeeplist) {
		Date date = new Date();
		SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
		String nowdate = dateFormat.format(date);		
		for(int i=0;i<upkeeplist.size();i++) {
			upkeep findOne = upkeepDAO.findOne(upkeeplist.get(i).getuId());
			findOne.setuStatus("无需保养");
			findOne.setuStartTime(nowdate);
			upkeepDAO.save(findOne);
		}
		for(int i=0;i<upkeeplist.size();i++) {
			machine findOne = machineDAO.findOne(Integer.parseInt(upkeeplist.get(i).getuMid()));
			upkeeplist upkeeplist1 = new upkeeplist();
			String getuUid = upkeeplist.get(i).getuUid();
			upkeeplist1.setuUid(getuUid);
			upkeeplist1.setuFinishitime(nowdate);
			upkeeplist1.setuPerson(upkeeplist.get(i).getuPerson());
			upkeeplist1.setuCycle(upkeeplist.get(i).getuCycle());
			upkeeplist1.setuDepartment(findOne.getM_department());
			upkeeplist1.setuItem(upkeeplist.get(i).getuItem());
			upkeeplist1.setuMid(upkeeplist.get(i).getuMid());
			upkeeplist1.setuSendto(upkeeplist.get(i).getuSendto());
			upkeeplist1.setuUid(findOne.getM_mid());
			upkeeplist1.setuType(findOne.getM_type());
			upkeeplist1.setuRemark(upkeeplist.get(i).getuRemark());
			upkeeplistDAO.save(upkeeplist1);
		}
		return "1";	
	}
	
	@RequestMapping("/startrepair")
	@ResponseBody
	public String startrepair(@RequestBody sendList sendList) {
		int s_id = sendList.getS_id();
		sendListMapper.updatefixing(s_id,sendList.getS_fixperson());
		return "success";	
	}
	
	
	/*
	 * @RequestMapping("getmachinefaulttype")
	 * 
	 * @ResponseBody public String getmachinefaulttype() { List<specialFault1> res
	 * =specialFaultMapping.findAllspecialFault();
	 * 
	 * return JSON.toJSONString(res); }
	 */
	
	
	
	@RequestMapping("finishfix")
	@ResponseBody
	public String finishfix(@RequestBody sendList sendList) {
		sendListMapper.updatestatus(sendList.getS_id());
		return null;	
	}
	
	@RequestMapping("selectworker")
	@ResponseBody
	public String selectworker() {
	 List<admin> selectWorker = adminMapper.SelectWorker();
	 return JSON.toJSONString(selectWorker);
	}


}
