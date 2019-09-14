package com.xinyiSystem.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

public class sendList {

private int s_id;
private String s_person;
private String s_mId;
private String s_mType;
private String s_acType;
private String s_describe;
private String s_sendTo;
private String s_class;
private String s_listType;
private String s_department;
private String s_sendType;
private String s_date;
private String s_status;
private String s_fixperson;
private String s_finishdate;
public String getS_fixperson() {
	return s_fixperson;
}
public void setS_fixperson(String s_fixperson) {
	this.s_fixperson = s_fixperson;
}
public String getS_finishdate() {
	return s_finishdate;
}
public void setS_finishdate(String s_finishdate) {
	this.s_finishdate = s_finishdate;
}
public String getS_status() {
	return s_status;
}
public void setS_status(String s_status) {
	this.s_status = s_status;
}
public String getS_date() {
	return s_date;
}
public void setS_date(String s_date) {
	this.s_date = s_date;
}
public int getS_id() {
	return s_id;
}
public void setS_id(int s_id) {
	this.s_id = s_id;
}
public String getS_person() {
	return s_person;
}
public void setS_person(String s_person) {
	this.s_person = s_person;
}
public String getS_mType() {
	return s_mType;
}
public void setS_mType(String s_mType) {
	this.s_mType = s_mType;
}

public String getS_acType() {
	return s_acType;
}
public void setS_acType(String s_acType) {
	this.s_acType = s_acType;
}
public String getS_describe() {
	return s_describe;
}
public void setS_describe(String s_describe) {
	this.s_describe = s_describe;
}
public String getS_sendTo() {
	return s_sendTo;
}
public void setS_sendTo(String s_sendTo) {
	this.s_sendTo = s_sendTo;
}
public String getS_class() {
	return s_class;
}
public void setS_class(String s_class) {
	this.s_class = s_class;
}
public String getS_listType() {
	return s_listType;
}
public void setS_listType(String s_listType) {
	this.s_listType = s_listType;
}
public String getS_department() {
	return s_department;
}
public void setS_department(String s_department) {
	this.s_department = s_department;
}
public String getS_sendType() {
	return s_sendType;
}
public void setS_sendType(String s_sendType) {
	this.s_sendType = s_sendType;
}
public String getS_mId() {
	return s_mId;
}
public void setS_mId(String s_mId) {
	this.s_mId = s_mId;
}
}
