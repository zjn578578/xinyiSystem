package com.xinyiSystem.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xinyiSystem.mapper.adminMapper;
import com.xinyiSystem.pojo.admin;
import com.xinyiSystem.service.RoleService;
import com.xinyiSystem.service.UserService;

@Service
public class RoleServiceImpl implements RoleService {
	@Autowired
	UserService userService;
	@Autowired
	adminMapper adminMapper;
	
	@Override
	public Set<String> listRoleNames(String userName) {
		Set<String> result = new HashSet<>();
//		List<Role> roles = listRoles(userName);
//		for (Role role : roles) {
//			result.add(role.getName());
//		}
		admin search = adminMapper.search(userName);
		result.add(search.getA_role());
		return result;
	}
}