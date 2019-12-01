package com.xinyiSystem.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xinyiSystem.pojo.*;

@Mapper
public interface expertsDatabaseMapping {
	@Select("select *from xinyidatabase.experts_database where fault_machine='${fault_machine}' and fault_structure='${fault_structure}'")
	public List<experts_database> selectAllByMsg(@Param(value="fault_machine")String fault_machine,@Param(value="fault_structure")String fault_structure);
	
	@Insert("INSERT INTO xinyidatabase.experts_database (fault_machine, fault_structure, fault_type,fault_msg) VALUES (#{fault_machine},#{fault_structure},#{fault_type},#{fault_msg});")
	public void insert(experts_database experts_database);
	
	@Update("update xinyidatabase.experts_database set  fault_machine ='${fault_machine}',fault_structure='${fault_structure}',fault_type='${fault_type}',fault_msg='${fault_msg}' where fault_id = '${fault_id}'")
	public void update(@Param(value="fault_id")int fault_id,@Param(value="fault_machine")String fault_machine,@Param(value="fault_structure")String fault_structure,@Param(value="fault_type")String fault_type,@Param(value="fault_msg")String fault_msg);
	
	@Delete("delete from  xinyidatabase.experts_database where fault_id =#{fault_id}")
	public void delete(int fault_id);
	@Delete("delete from  xinyidatabase.experts_database where fault_machine=#{fault_machine} and fault_structure =#{fault_structure}")
	public void delete1(@Param(value="fault_machine")String fault_machine,@Param(value="fault_structure")String fault_structure);

	@Update("update xinyidatabase.experts_database set fault_photo='${fault_photo}' where fault_id='${fault_id}' ")
	public void updatephotoname(@Param(value="fault_id")String fault_id,@Param(value="fault_photo")String fault_photo);
}
