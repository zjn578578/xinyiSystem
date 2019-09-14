package com.xinyiSystem.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xinyiSystem.pojo.sendList;
import com.xinyiSystem.pojo.admin;

public interface adminMapper {
	@Select("select *from admin where a_name='${str}'")
	public admin search(@Param(value="str")String str);
	
	@Select("select *from admin  ORDER BY a_name DESC")
	public List<admin> selectALL();
	
	@Update("update xinyidatabase.admin set  a_permission ='${a_permission}' where a_id = '${a_id}'")
	public void updateAlterInformation(@Param(value="a_id")String a_id,@Param(value="a_permission")String a_permission);

	@Select("select a_permission from admin where a_id='${str}'")
	public String findPermissionById(@Param(value="str")String str);

	@Select("select a_id from admin where a_name='${str}'")
	public String findIdByName(@Param(value="str")String str);
	
	@Select("select a_permission from admin where a_name='${str}'")
	public String findPermissionByName(@Param(value="str")String str);
	
	@Delete("delete from  xinyidatabase.admin where a_id =#{a_id}")
	public void delete(int a_id);
	
	@Update("update xinyidatabase.admin set  a_name ='${a_name}',a_password='${a_password}',a_role='${a_role}',a_xingming='${a_xingming}' where a_id = '${a_id}'")
	public void update(@Param(value="a_id")int a_id,@Param(value="a_name")String a_name,@Param(value="a_password")String a_password,@Param(value="a_role")String a_role,@Param(value="a_xingming")String a_xingming);
	
	@Update("update xinyidatabase.admin set a_role='${a_role}' where a_id = '${a_id}'")
	public void updaterole(@Param(value="a_id")int a_id,@Param(value="a_role")String a_role);
	
	@Insert("INSERT INTO xinyidatabase.admin (a_name, a_password, a_role, a_permission,a_xingming) VALUES (#{a_name},#{a_password},#{a_role}, '1',#{a_xingming});")
	public void insert(admin admin);
	
	@Select("select a_xingming from xinyidatabase.admin where a_name='${a_id}';")
	public String SelectName(@Param(value="a_id") String a_id);
	
	@Select("select a_xingming from xinyidatabase.admin where a_role='worker';")
	public List<admin> SelectWorker();
}
