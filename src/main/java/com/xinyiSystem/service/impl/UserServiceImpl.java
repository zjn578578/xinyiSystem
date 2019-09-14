package com.xinyiSystem.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xinyiSystem.mapper.adminMapper;
import com.xinyiSystem.pojo.admin;
import com.xinyiSystem.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	adminMapper adminMapper;
	@Override
	public String getPassword(String name) {
		admin admin = getByName(name);
		if (null == admin)
			return null;
		return admin.getA_password();
	}

	@Override
	public admin getByName(String name) {
//		UserExample example = new UserExample();
//		example.createCriteria().andNameEqualTo(name);
//		List<User> users = userMapper.selectByExample(example);
//		if (users.isEmpty())
//			return null;
		admin search = adminMapper.search(name);
		return search;
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
	}



}