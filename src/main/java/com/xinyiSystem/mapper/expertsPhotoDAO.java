package com.xinyiSystem.mapper;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xinyiSystem.pojo.expertsPhoto;
import com.xinyiSystem.pojo.fault_database;

public interface expertsPhotoDAO extends JpaRepository<expertsPhoto, Integer> {
	public  List<expertsPhoto> findByFaultType(String type);
}
