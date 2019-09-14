package com.xinyiSystem.mapper;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xinyiSystem.pojo.fault_database;
import com.xinyiSystem.pojo.machine;

public interface fault_databaseDAO extends JpaRepository<fault_database, Integer> {
	
}
