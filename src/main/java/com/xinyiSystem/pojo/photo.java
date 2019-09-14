package com.xinyiSystem.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="photo")
public class photo {
@Id
@GeneratedValue(strategy=GenerationType.AUTO)
@Column(name = "photo_id")	
private int photo_id;
@Column(name="photo_name")
private String photo_name;
@Column(name="photo_paren")
private String photo_paren;
@Column(name="photo_path")
private String photo_path;
public int getPhoto_id() {
	return photo_id;
}
public void setPhoto_id(int photo_id) {
	this.photo_id = photo_id;
}
public String getPhoto_name() {
	return photo_name;
}
public void setPhoto_name(String photo_name) {
	this.photo_name = photo_name;
}
public String getPhoto_paren() {
	return photo_paren;
}
public void setPhoto_paren(String photo_paren) {
	this.photo_paren = photo_paren;
}
public String getPhoto_path() {
	return photo_path;
}
public void setPhoto_path(String photo_path) {
	this.photo_path = photo_path;
}
}
