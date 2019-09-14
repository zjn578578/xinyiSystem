package com.xinyiSystem.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="expertsPhoto")
public class expertsPhoto {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "phototId")
private int phototId;
@Column(name = "faultType")
private String faultType;
@Column(name = "path")
private String path;
public int getPhototId() {
	return phototId;
}
public void setPhototId(int phototId) {
	this.phototId = phototId;
}
public String getFaultType() {
	return faultType;
}
public void setFaultType(String faultType) {
	this.faultType = faultType;
}
public String getPath() {
	return path;
}
public void setPath(String path) {
	this.path = path;
}
}
