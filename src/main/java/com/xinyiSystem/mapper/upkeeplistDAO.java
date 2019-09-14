package com.xinyiSystem.mapper;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.xinyiSystem.pojo.upkeeplist;

public interface upkeeplistDAO extends JpaRepository<upkeeplist, Integer>{
		
	public  List<upkeeplist> findAllByOrderByUIdDesc();
}
