package com.xinyiSystem.service;

import java.util.List;
import java.util.Set;


public interface PermissionService {
	public Set<String> listPermissions(String userName);
}