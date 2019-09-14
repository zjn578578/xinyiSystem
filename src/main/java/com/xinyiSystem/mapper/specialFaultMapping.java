package com.xinyiSystem.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.xinyiSystem.pojo.*;

@Mapper
public interface specialFaultMapping {
	@Insert("insert into experts_database(fault_type,fault_msg) values(#{type},#{message})")
	public void save(specialFault specialFault);
	@Select("select fault_type,fault_msg from experts_database")
	public List<specialFault1> findAllspecialFault();
}
