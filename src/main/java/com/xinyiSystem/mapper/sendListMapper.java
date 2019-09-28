package com.xinyiSystem.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xinyiSystem.pojo.admin;
import com.xinyiSystem.pojo.sendList;

@Mapper
public interface sendListMapper {
	@Insert("INSERT INTO  xinyidatabase.sendlist(s_person,s_sendTo ,s_mId, s_describe, s_department,s_acType,s_mType,s_sendType,s_date,s_status) VALUES (#{s_person},#{s_sendTo},#{s_mId},#{s_describe},#{s_department},#{s_acType},#{s_mType},#{s_sendType},#{s_date},#{s_status});")
	public void insert(sendList sendList);
	@Select("select *from xinyidatabase.sendlist where s_status='维修完成' ORDER BY s_id DESC"  )
	public List<sendList> selectFinish();
	
	@Select("select *from sendlist where s_status='未维修'")
	public List<sendList> findAllUnRepaired();

	@Select("select *from sendlist where s_status='维修中'")
	public List<sendList> findAllBeingRepaired();
	
	@Select("select *from sendlist where s_status='待审核'")
	public List<sendList> findAllConfirm();
	
	@Select("select *from sendlist where s_status='需保养'")
	public List<sendList> findAllUpKeep();
	
	@Select("select * from sendlist where s_sendTo='${str}' and s_status='未维修' ORDER BY s_id DESC")
	public List<sendList> findMsg1ByPermission(@Param(value="str") String str);
	
	@Select("select * from sendlist where s_sendTo='${str}' and s_status='未通过' ORDER BY s_id DESC")
	public List<sendList> findMsg5ByPermission(@Param(value="str") String str);
	

	@Select("select * from sendlist where s_sendTo='${str}'  and s_status='维修中' ORDER BY s_id DESC  ")
	public List<sendList> findMsg2ByPermission(@Param(value="str") String str);
	
	@Select("select * from sendlist where s_sendTo='${str}'  and s_status='待审核' ORDER BY s_id DESC")
	public List<sendList> findMsg3ByPermission(@Param(value="str") String str);
	
	@Select("select * from sendlist where s_sendTo='${str}'  and s_status='需保养'")
	public List<sendList> findMsg4ByPermission(@Param(value="str") String str);
	
	@Update("update sendlist set s_status='维修完成',s_listType='',s_finishdate='${s_finishdate}' where s_id=#{s_id}")
	public void updatefaultreview(@Param(value="s_id")int s_id,@Param(value="s_finishdate")String s_finishdate);
	
	@Select("SELECT max(s_id) from xinyidatabase.sendlist")
	public int selectS_id();
	
	@Update("update xinyidatabase.sendlist set s_status='待审核'   where s_id='${s_id}' ")
	public void updatestatus(@Param(value="s_id")int s_id);

	@Update("update xinyidatabase.sendlist set s_status='未通过' , s_listType='${s_listType}'   where s_id='${s_id}' ")
	public void updatenotpass(@Param(value="s_id")int s_id,@Param(value="s_listType")String s_listType);
	
	
	@Update("update xinyidatabase.sendlist set s_status='维修中'  ,s_fixperson='${s_fixperson}' where s_id='${s_id}' ")
	public void updatefixing(@Param(value="s_id")int s_id,@Param(value="s_fixperson") String s_fixperson);
}
