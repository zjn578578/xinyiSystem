package com.xinyiSystem.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="upkeeplist")
public class upkeeplist {
	@Id	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "uId")
	private int uId;
	@Column(name = "uPerson")
	private String uPerson;
	@Column(name = "uUid")
	private String uUid;
	@Column(name = "uFinishitime")
	private String uFinishitime;
	@Column(name = "uItem")
	private String uItem;
	@Column(name = "uType")
	private String uType;
	@Column(name = "uSendto")
	private String uSendto;
	@Column(name = "uCycle")
	private String uCycle;
	@Column(name = "uDepartment")
	private String uDepartment;
	@Column(name = "uMid")
	private String uMid;	
	public String getuItem() {
		return uItem;
	}
	public void setuItem(String uItem) {
		this.uItem = uItem;
	}
	public String getuType() {
		return uType;
	}
	public void setuType(String uType) {
		this.uType = uType;
	}
	public String getuSendto() {
		return uSendto;
	}
	public void setuSendto(String uSendto) {
		this.uSendto = uSendto;
	}
	public String getuCycle() {
		return uCycle;
	}
	public void setuCycle(String uCycle) {
		this.uCycle = uCycle;
	}
	public String getuDepartment() {
		return uDepartment;
	}
	public void setuDepartment(String uDepartment) {
		this.uDepartment = uDepartment;
	}
	public String getuMid() {
		return uMid;
	}
	public void setuMid(String uMid) {
		this.uMid = uMid;
	}
	public int getuId() {
		return uId;
	}
	public void setuId(int uId) {
		this.uId = uId;
	}
	public String getuPerson() {
		return uPerson;
	}
	public void setuPerson(String uPerson) {
		this.uPerson = uPerson;
	}
	public String getuUid() {
		return uUid;
	}
	public void setuUid(String uUid) {
		this.uUid = uUid;
	}
	public String getuFinishitime() {
		return uFinishitime;
	}
	public void setuFinishitime(String uFinishitime) {
		this.uFinishitime = uFinishitime;
	}
	
}
