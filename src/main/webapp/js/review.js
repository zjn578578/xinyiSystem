function review() {
	var const_json=[];
	$.ajax({
		type: "post",
		url: "./getmachineinfo",
		data: {
			key:"test"
		},
		success: function (response) {
			let json=eval(response);
			json=json.sort((a,b)=> a.m_send_to-b.m_send_to);
			console.log({json});			
			change_machine_place(json);
			const_json=json;
		}
	});
	
	$.ajax({
		type: "post",
		url: "./getmachineinfo1",
		data: {
			key:"test"
		},
		success: function (response) {
			console.log({response});
			$("#s_person").val(response);
			
		}
	});
	
	

	$('#s_send_to').change(function(event) {
		/* Act on the event */
		let machine_place=$('#s_send_to').val();
		$("#s_mType").find("option:not(:first)").remove();
		$('#s_mType').selectpicker('refresh');
		$("#s_department").find("option:not(:first)").remove();
		$('#s_department').selectpicker('refresh');
		$("#s_mId").find("option:not(:first)").remove();
		$('#s_mId').selectpicker('refresh');	
		change_machine_department(machine_place,const_json);

	});

	$('#s_mType').change(function(e){
		let machine_place=$('#s_send_to').val();
		let machine_type=$('#s_mType').val();
		let machine_floor=$('#s_department').val();
		$("#s_mId").find("option:not(:first)").remove();
		$('#s_mId').selectpicker('refresh');
		change_machine_id(machine_place,machine_type,const_json,machine_floor);
		let m_type=$('#s_mType').val();
		let m_department=$('#s_department').val();
		show_my_data(m_type,m_department);
	});
	
	$('#s_department').change(function(e){
		$("#s_mType").find("option:not(:first)").remove();
		$('#s_mType').selectpicker('refresh');
		$("#s_mId").find("option:not(:first)").remove();
		$('#s_mId').selectpicker('refresh');	
		let machine_type=$('#s_mType').val();
		let machine_department=$('#s_department').val();
		let machine_place=$('#s_send_to').val();
		change_machine_type(machine_place,const_json,machine_department);
	})
	
	$('#s_acType').change(function(e){
		let s_acType=$('#s_acType').val();
		$('#s_describe').val(s_acType);
	})

	var inputBox = document.getElementById("inputBox");
	var img = document.getElementById("img");
	inputBox.addEventListener("change",function(){
		var reader = new FileReader();
		reader.onload = function(){
			//读取完成后，将结果赋值给img的src
			img.src = this.result
		}
	});

	$("#button_review").click(function(event) {	
		var formdata=new FormData();
		formdata.append('inputBox',$('#inputBox').get(0).files[0]);
		var s_sendTo=$('#s_send_to').val();
		var s_mType=$("#s_mType").val();
		var s_mId=$("#s_mId").val();
		var s_sendType=$("#s_sendType").val();
		var s_department=$("#s_department").val();
		var s_class=$("#s_class").val();
		var s_listType=$("#s_listType").val();
		var s_person=$("#s_person").val();
		var s_acType=$("#s_acType").val();
		var s_describe=$("#s_describe").val();
		var s_picture=img.src;
		if(s_mId=="机台ID"){
			s_mId="";
		}
		if(s_acType=='其他'&&s_describe==''){
			alert("请填写故障描述");
			return;
		}
		var paramas={
				"s_sendTo":s_sendTo,
				"s_mType":s_mType,
				"s_mId":s_mId,
				"s_sendType":s_sendType,
				"s_department":s_department,
				"s_class":s_class,
				"s_listType":s_listType,
				"s_person":s_person,
				"s_acType":s_acType,
				"s_describe":s_describe,
		};
		console.log(paramas);
		$.ajax({
			type:"POST",
			url:"./sendList",
			contentType:'application/json;charset=UTF-8',
			data:JSON.stringify(paramas),
			statusCode : {
				404 : function() {
					alert("404");
				},
				500 : function() {
					alert("请先填写信息");
				}
			},
			success : function(massge, Status) {
				alert("提交成功");
				$.ajax({
					async: false,
					type: 'POST',
					url: "/imageUpload",
					dataType: 'json',
					data: formdata,
					contentType:false,//ajax上传图片需要添加
					processData:false,//ajax上传图片需要添加
					success: function (data) {
						if(data.hasOwnProperty("relativePath")){
							$("#showImage").html("<img src='"+data.relativePath+"'/>");
						}
						else {
							$("#showImage").html("上传失败");
						}
						alert(data.result_msg);
					},
					error: function (e) {
					}
				});
				location.reload();
			} 
		});
	});



}

function show_my_data(machine_type,machine_department){
	console.log({machine_type});
	console.log({machine_department});
	if(machine_type!="请选择机器类型" && machine_department!="请选择部门"){
		$('#s_acType').removeAttr("disabled");	
		$.ajax({
			type:"POST",
			url:"./getmachinefaulttype.do",
			data:{
				key:"test"
			},
			statusCode : {
				404 : function() {
					alert("404");
				},
				500 : function() {
					alert("500");
				}
			},
			success : function(massge, Status) {
				let machine_type1=$('#s_mType').val();
				let machine_department1=$('#s_department').val();		
				$('#s_acType').html(`<option>其他</option>`);
				$('#s_acType').selectpicker('refresh');
				let machine_type="";
				let json=eval(massge);
				let machine_fault_set=new Set();
				json.forEach(e =>{
					machine_fault_set.add(e);
				})
				machine_fault_set.forEach(e =>{
					if(e.fault_msg.indexOf(machine_type1)!=-1){
						let msg=e.fault_type+" : "+e.fault_msg;	
						document.getElementById('s_acType').innerHTML+=`<option>${msg}</option>`
					}
				})				
				$('#s_acType').selectpicker('refresh');		
			} 
		});

		
		
	}
}



function change_machine_place(json) {
	let machine_factory=new Set();
	json.forEach(e =>{
		machine_factory.add(e.m_send_to);
	})
	machine_factory.forEach(e =>{
		document.getElementById('s_send_to').innerHTML+=`<option>${e}</option>` ;
	})
	
	$('#s_send_to').selectpicker('refresh');

}


function change_machine_type(place,json,department){
	let machine_type=new Set();
	json.forEach(e =>{
		if(e.m_send_to==place && e.m_floor==department){
			machine_type.add(e.m_type);
		}
	})
	machine_type.forEach(e =>{
		document.getElementById('s_mType').innerHTML+=`<option>${e}</option>` ;
	})
	
	$('#s_mType').selectpicker('refresh');
}

function change_machine_id(machine_place,machine_type,json,machine_floor){
	let machine_id_set=new Set();
	json.forEach(e =>{
		if(e.m_send_to==machine_place && e.m_type==machine_type && e.m_floor==machine_floor){
			machine_id_set.add(e.m_mid);
		}
	})
	machine_id_set.forEach(e =>{
		document.getElementById('s_mId').innerHTML+=`<option>${e}</option>` ;
	})
	
	$('#s_mId').selectpicker('refresh');
}

function change_machine_department(place,json){
	let machine_department=new Set();
	json.forEach(e =>{
		if(e.m_send_to==place){
			machine_department.add(e.m_floor);
		}
	})
	machine_department.forEach(e =>{
		document.getElementById('s_department').innerHTML+=`<option>${e}</option>` ;
	})
	
	$('#s_department').selectpicker('refresh');
}
