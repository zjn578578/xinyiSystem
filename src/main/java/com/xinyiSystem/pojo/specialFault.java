package com.xinyiSystem.pojo;

public class specialFault {
	private String type;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	private String message;
	public specialFault() {}
	public specialFault(String type,String message) {
		this.message=message;
		this.type=type;
	}
}
