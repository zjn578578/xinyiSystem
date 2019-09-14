package com.xinyiSystem.pojo;

public class admin {
private int a_id;
private String a_name;
private String a_password;
private String a_role;
private String a_permission;
private String a_xingming;

public int getA_id() {
	return a_id;
}
public void setA_id(int a_id) {
	this.a_id = a_id;
}
public String getA_name() {
	return a_name;
}
public void setA_name(String a_name) {
	this.a_name = a_name == null?null:a_name.trim();
}
public String getA_password() {
	return a_password = a_password ==null?null:a_password.trim();
}
public void setA_password(String a_password) {
	this.a_password = a_password;
}
public String getA_role() {
	return a_role;
}
public void setA_role(String a_role) {
	this.a_role = a_role;
}
public String getA_permission() {
	return a_permission;
}
public void setA_permission(String a_permission) {
	this.a_permission = a_permission;
}
public String getA_xingming() {
	return a_xingming;
}
public void setA_xingming(String a_xingming) {
	this.a_xingming = a_xingming;
}
}
