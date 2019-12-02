package com.xinyiSystem.mapper;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xinyiSystem.pojo.parts;



public interface partsDAO extends JpaRepository<parts, Integer>{
	public List<parts> findByStName(String name);
	public List<parts> findBymType(String name);
	public List<parts> findByMTypeAndStName(String mtype,String stname);
	public void deleteByMTypeAndStName(String mtype,String stname);
}
