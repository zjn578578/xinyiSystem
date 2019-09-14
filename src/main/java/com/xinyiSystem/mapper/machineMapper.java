package com.xinyiSystem.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xinyiSystem.pojo.machine;
import com.xinyiSystem.pojo.machine1;
import com.xinyiSystem.pojo.sendList;

@Mapper
public interface machineMapper {
	@Insert("INSERT INTO xinyidatabase.machine (`m_id`, `m_name`) VALUES ('${id}', '#{str}');")
	public void insert(@Param(value="str") String str ,String id);
		
	@Select("select m_type from xinyidatabase.machine where m_id ='${m_id}'")
	public String selectm_type(@Param(value="m_id") String m_id );
	
	@Select("select * from xinyidatabase.machine where m_id ='${m_id}'")
	public machine select(@Param(value="m_id") String m_id );
	
	@Select("select *from machine ORDER BY m_id DESC")
	public List<machine> selectAll();
	
	@Select("select m_send_to,m_type,m_floor,m_id from machine")
	public List<machine1> selectInfo();
	
	@Select("select * from xinyidatabase.machine where m_send_to=#{m_send_to}")
	public List<machine> selectByfactory(@Param(value="m_send_to") String m_send_to);
	
	@Select("select * from machine where m_send_to='${m_send_to}' m_floor='${m_floor}'")
	public List<machine> selectByFloor(@Param(value="m_floor") String m_floor,@Param(value="m_send_to") String m_send_to);
	
	@Select("select * from machine where  m_send_to='${m_send_to}'and m_floor='${m_floor}' and m_type='${m_type}'")
	public List<machine> selectByFloorAndType(@Param(value="m_floor") String m_floor,@Param(value="m_type") String m_type,@Param(value="m_send_to") String m_send_to );

	@Delete("delete from  xinyidatabase.machine where m_id =#{m_id}")
	public void delete(int m_id);
	
	@Select("select * from xinyidatabase.machine where m_type=#{m_type}")
	public List<machine> selectByMtype(@Param(value="m_type") String m_type);
	
}
