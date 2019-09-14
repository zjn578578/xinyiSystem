package com.xinyiSystem.pojo;

public class permission1 {
	private String a_id;
	private String a_role;
	public String getA_id() {
		return a_id;
	}
	public void setA_id(String a_id) {
		this.a_id = a_id;
	}
	public String getA_permission() {
		return a_permission;
	}
	public void setA_permission(String a_permission) {
		this.a_permission = a_permission;
	}
	private String a_permission;
	public permission1() {}
	public permission1(String a_id,String a_permission) {
		this.a_id=a_id;
		this.a_permission=a_permission;
	}
	public String getA_role() {
		return a_role;
	}
	public void setA_role(String a_role) {
		this.a_role = a_role;
	}
	
}
