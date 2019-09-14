package com.xinyiSystem.service;

import java.util.List;
import com.xinyiSystem.pojo.admin;
public interface UserService {
	public String getPassword(String name);
	public admin getByName(String name);
	public void delete(Long id);

}