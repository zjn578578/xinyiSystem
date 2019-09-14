package com.xinyiSystem.mapper;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xinyiSystem.pojo.parts;
import com.xinyiSystem.pojo.upkeep;

public interface upkeepDAO extends JpaRepository<upkeep, Integer>{
	public List<upkeep> findByuMid(String uMid);
	public upkeep findByUMidAndUItem(String uMid,String uItem);
	public List<upkeep> findByUSendtoAndUStatus(String uSendto,String uStatus);

}