package com.xinyiSystem.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="upkeep")
public class upkeep {
	@Id	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "uId")
	private int uId;
	@Column(name = "uMid")
	private String uMid;
	@Column(name = "uMmid")
	private String uMmid;
	public String getuMmid() {
		return uMmid;
	}
	public void setuMmid(String uMmid) {
		this.uMmid = uMmid;
	}
	@Column(name = "uMtype")
	private String uMtype;
	@Column(name = "uStartTime")
	private String uStartTime;
	@Column(name = "uCycle")
	private String uCycle;
	@Column(name = "uItem")
	private String uItem;
	@Column(name = "uSendto")
	private String uSendto;
	@Column(name = "uStatus")
	private String uStatus;
	private String uPerson;
	public String getuSendto() {
		return uSendto;
	}
	public void setuSendto(String uSendto) {
		this.uSendto = uSendto;
	}
	public String getuStatus() {
		return uStatus;
	}
	public void setuStatus(String uStatus) {
		this.uStatus = uStatus;
	}
	public String getuStartTime() {
		return uStartTime;
	}
	public void setuStartTime(String uStartTime) {
		this.uStartTime = uStartTime;
	}
	public int getuId() {
		return uId;
	}
	public void setuId(int uId) {
		this.uId = uId;
	}
	public String getuMid() {
		return uMid;
	}
	public void setuMid(String uMid) {
		this.uMid = uMid;
	}
	public String getuMtype() {
		return uMtype;
	}
	public void setuMtype(String uMtype) {
		this.uMtype = uMtype;
	}
	public String getuCycle() {
		return uCycle;
	}
	public void setuCycle(String uCycle) {
		this.uCycle = uCycle;
	}
	public String getuItem() {
		return uItem;
	}
	public void setuItem(String uItem) {
		this.uItem = uItem;
	}
	public String getuPerson() {
		return uPerson;
	}
	public void setuPerson(String uPerson) {
		this.uPerson = uPerson;
	}
}
