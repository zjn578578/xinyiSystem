package com.xinyiSystem.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.xinyiSystem.pojo.machine;
import com.xinyiSystem.pojo.parts;

@Mapper
public interface partsMapper {

	@Select("select * from parts where m_type ='${m_type}'")
	public List<parts> selectALL(@Param(value="m_type") String m_type);
	
}
