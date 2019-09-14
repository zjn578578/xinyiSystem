package com.xinyiSystem.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="structure")
public class structure {
@Id	
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "st_id")
private int st_id;
@Column(name = "m_type")
private String m_type;
@Column(name = "st_name")
private String st_name;
public String getM_type() {
	return m_type;
}
public void setM_type(String m_type) {
	this.m_type = m_type;
}
public int getSt_id() {
	return st_id;
}
public void setSt_id(int st_id) {
	this.st_id = st_id;
}
public String getSt_name() {
	return st_name;
}
public void setSt_name(String st_name) {
	this.st_name = st_name;
}

}
