package com.xinyiSystem.pojo;

public class faulthelp {
	private String machine_type;
	public String getMachine_type() {
		return machine_type;
	}
	public void setMachine_type(String machine_type) {
		this.machine_type = machine_type;
	}
	public String getFault_type() {
		return fault_type;
	}
	public void setFault_type(String fault_type) {
		this.fault_type = fault_type;
	}
	private String fault_type;
	public faulthelp() {}
	public faulthelp(String machine_type,String fault_type) {
		this.machine_type=machine_type;
		this.fault_type=fault_type;
	}
	
}
