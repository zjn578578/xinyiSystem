package com.xinyiSystem.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="machine")
public class machine {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "m_id")
private int m_id;
@Column(name="m_send_to")
private String m_send_to;
@Column(name="m_type")
private String m_type;
@Column(name="m_structure")
private String m_structure;
@Column(name="m_part")
private String m_part;
@Column(name="m_floor")
private String m_floor;
@Column(name="m_class")
private String m_class;
@Column(name="m_department")
private String m_department;
@Column(name="m_remark")
private String m_remark;
@Column(name="m_mid")
private String m_mid;
public String getM_send_to() {
	return m_send_to;
}
public void setM_send_to(String m_send_to) {
	this.m_send_to = m_send_to;
}
public String getM_mid() {
	return m_mid;
} 
public void setM_mid(String m_mid) {
	this.m_mid = m_mid;
}
public int getM_id() {
	return m_id;
}
public void setM_id(int m_id) {
	this.m_id = m_id;
}
public String getM_class() {
	return m_class;
}
public void setM_class(String m_class) {
	this.m_class = m_class;
}
public String getM_department() {
	return m_department;
}
public void setM_department(String m_department) {
	this.m_department = m_department;
}
public String getM_remark() {
	return m_remark;
}
public void setM_remark(String m_remark) {
	this.m_remark = m_remark;
}
public String getM_floor() {
	return m_floor;
}
public void setM_floor(String m_floor) {
	this.m_floor = m_floor;
}
public String getM_type() {
	return m_type;
}
public void setM_type(String m_type) {
	this.m_type = m_type;
}
public String getM_structure() {
	return m_structure;
}
public void setM_structure(String m_structure) {
	this.m_structure = m_structure;
}
public String getM_part() {
	return m_part;
}
public void setM_part(String m_part) {
	this.m_part = m_part;
}
}
