package com.xinyiSystem.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="parts")
public class parts {
@Id	
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "idParts")
private int idParts;
@Column(name = "stName")
private String stName;
@Column(name = "pName")
private String pName;
@Column(name = "mType")
private String mType;
@Column(name = "photoname")
private String photoname;
public String getPhotoname() {
	return photoname;
}
public void setPhotoname(String photoname) {
	this.photoname = photoname;
}
public int getIdParts() {
	return idParts;
}
public void setIdParts(int idParts) {
	this.idParts = idParts;
}
public String getStName() {
	return stName;
}
public void setStName(String stName) {
	this.stName = stName;
}
public String getpName() {
	return pName;
}
public void setpName(String pName) {
	this.pName = pName;
}
public String getmType() {
	return mType;
}
public void setmType(String mType) {
	this.mType = mType;
}

}
