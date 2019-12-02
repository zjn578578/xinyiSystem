package com.xinyiSystem.pojo;

public class experts_database {

	public int getFault_id() {
		return fault_id;
	}
	public void setFault_id(int fault_id) {
		this.fault_id = fault_id;
	}
	public String getFault_machine() {
		return fault_machine;
	}
	public void setFault_machine(String fault_machine) {
		this.fault_machine = fault_machine;
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
	public String getFault_photo() {
		return fault_photo;
	}
	public void setFault_photo(String fault_photo) {
		this.fault_photo = fault_photo;
	}
	public String getFault_structure() {
		return fault_structure;
	}
	public void setFault_structure(String fault_structure) {
		this.fault_structure = fault_structure;
	}
	private int fault_id;
	private String fault_machine;
	private String fault_structure;
	private String fault_type;
	private String fault_msg;
	private String fault_photo;

}
