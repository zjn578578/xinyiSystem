function getUnRepairedInformation(){
	
	var str=1;
	$.ajax({
		type:"post",
		url:"./getUnrepairedInformation",
		data:{key1:str},
		statusCode:{
			404:function(){
				alert("404");
			},
			500:function(){
				alert("500");
			}
		},
		success:function(data,Status){
			var aa=JSON.stringify(data);
			var obj=eval(aa);
			for(var i=0;i<obj.length;i++){
			document.getElementById('iframe1').contentWindow.document.getElementById('beingRepairedTable').innerHTML+=`
									<tr id="label1">					
									<td id="id1">${obj[i]["s_id"]}</td>
									<td id="mc1">${obj[i]["s_mId"]}</td>
									<td id="jg1">${obj[i]["s_mType"]}</td>
									<td id="jg1">${obj[i]["s_date"]}</td>
									<td id="jg1">${obj[i]["s_person"]}</td>
									<td id="jg1">${obj[i]["s_describe"]}</td>
									<td class="am-hide-sm-only" style="color: red;" id="fbf1">${obj[i]["s_status"]}</td>
									<td class="am-hide-sm-only" id="dz1">${obj[i]["s_acType"]}</td>
									<td  id="ztxq1">${obj[i]["s_sendTo"]}</td>
									<td>
										<div class="am-btn-toolbar">
											<div class="am-btn-group am-btn-group-xs">
												<a class="am-btn am-btn-default am-btn-xs am-text-secondary" style="color: green;" id="zt1" data-index="1" onclick="repair()">维修</a>
												<a class="am-btn am-btn-default am-btn-xs am-text-secondary"  id="ck1" data-index="1" onclick="lok_img()">查看图片</a>
											</div>
										</div>
									</td>
								</tr>`
			}
		}						
	});
	localStorage.setItem("flag",1);
}

function getBeingRepairedInformation(){
	
	var str=1;
	$.ajax({
		type:"post",
		url:"./getBeingRepairedInformation",
		data:{key1:str},
		statusCode:{
			404:function(){
				alert("404");
			},
			500:function(){
				alert("500");
			}
		},
		success:function(data,Status){
			var aa=JSON.stringify(data);
			var obj=eval(aa);
			alert(obj);
			for(var i=0;i<obj.length;i++){
				document.getElementById('iframe1').contentWindow.document.getElementById('unRepairedTable').innerHTML+=`
										<tr id="label1">					
										<td id="id1">${obj[i]["s_id"]}</td>
										<td id="mc1">${obj[i]["s_mId"]}</td>
										<td id="jg1">${obj[i]["s_mType"]}</td>
										<td id="jg1">${obj[i]["s_date"]}</td>
										<td id="jg1">${obj[i]["s_person"]}</td>
										<td id="jg1">${obj[i]["s_describe"]}</td>
										<td class="am-hide-sm-only" style="color: red;" id="fbf1">${obj[i]["s_status"]}</td>
										<td class="am-hide-sm-only" id="dz1">${obj[i]["s_acType"]}</td>
										<td  id="ztxq1">${obj[i]["s_sendTo"]}</td>
										<td>
											<div class="am-btn-toolbar">
												<div class="am-btn-group am-btn-group-xs">
													<a class="am-btn am-btn-default am-btn-xs am-text-secondary" style="color: green;" id="zt1" data-index="1" onclick="repair()">维修</a>
													<a class="am-btn am-btn-default am-btn-xs am-text-secondary"  id="ck1" data-index="1" onclick="lok_img()">查看图片</a>
												</div>
											</div>
										</td>
									</tr>`
				}
		}						
	});
	localStorage.setItem("flag",1);
}

