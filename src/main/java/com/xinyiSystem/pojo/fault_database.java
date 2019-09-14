package com.xinyiSystem.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="fault_database")
public class fault_database {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fault_id")
	private int fault_id;
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
	public String getFault_remark() {
		return fault_remark;
	}
	public void setFault_remark(String fault_remark) {
		this.fault_remark = fault_remark;
	}
	@Column(name = "fault_type")
	private String fault_type;
	@Column(name = "fault_msg")
	private String fault_msg;
	@Column(name = "fault_remark")
	private String fault_remark;
	
}
