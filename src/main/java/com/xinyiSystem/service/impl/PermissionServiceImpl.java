package com.xinyiSystem.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xinyiSystem.mapper.adminMapper;
import com.xinyiSystem.pojo.admin;
import com.xinyiSystem.pojo.sendList;
import com.xinyiSystem.service.PermissionService;
import com.xinyiSystem.service.RoleService;
import com.xinyiSystem.service.UserService;

@Service
public class PermissionServiceImpl implements PermissionService {

	@Autowired
	UserService userService;
	@Autowired
	RoleService roleService;
	@Autowired
	adminMapper adminMapper;
	
	@Override
	public Set<String> listPermissions(String userName) {
		Set<String> result = new HashSet<>();
//		List<Role> roles = roleService.listRoles(userName);
//
//		List<RolePermission> rolePermissions = new ArrayList<>();
//
//		for (Role role : roles) {
//			RolePermissionExample example = new RolePermissionExample();
//			example.createCriteria().andRidEqualTo(role.getId());
//			List<RolePermission> rps = rolePermissionMapper.selectByExample(example);
//			rolePermissions.addAll(rps);
//		}
//
//		for (RolePermission rolePermission : rolePermissions) {
//			Permission p = permissionMapper.selectByPrimaryKey(rolePermission.getPid());
//			result.add(p.getName());
//		}
		admin search = adminMapper.search(userName);
		
		result.add(search.getA_permission());
		return result;
	}
}