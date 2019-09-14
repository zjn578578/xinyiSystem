package com.xinyiSystem.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.xinyiSystem.pojo.structure;
@Mapper
public interface structureMapper {

	@Select("select *from xinyidatabase.structure where m_type='${m_type}'")
	public List<structure> selectAllByM_type(@Param(value="m_type")String m_type);
}
