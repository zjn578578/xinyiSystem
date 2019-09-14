package com.xinyiSystem.pojo;

public class specialFault1 {
	public int getFault_id() {
		return fault_id;
	}
	public void setFault_id(int fault_id) {
		this.fault_id = fault_id;
	}
	public String getFault_type() {
		return fault_type;
	}
	public void setFault_type(String fault_type) {
		this.fault_type = fault_type;
	}
	public String getFault_msg() {
		return fault_msg;
	}
	public void setFault_msg(String fault_msg) {
		this.fault_msg = fault_msg;
	}
	private int fault_id;
	private String fault_type;
	private String fault_msg;
	public specialFault1() {}
	public specialFault1(int id,String type,String msg) {
		this.fault_id=id;
		this.fault_type=type;
		this.fault_msg=msg;
	}
}
