var myrow="";
var myrow1="";
var json=[];
function Initialize () {
		$.ajax({
			type:"POST",
			url:"./getmachineplacemsg.do",
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
			success : function(message, Status) {
				let json=eval(message);
				json=json.sort((a,b)=> a.m_send_to-b.m_send_to);
				let permissions="";
				for(let i=0;i<json.length;i++){
					if(permissions!=json[i]['m_send_to']){
						let temp=json[i]['m_send_to'];
						machine_name=json[i]['m_send_to'];
						$('#machine_place').append(new Option(temp,temp));
						permissions=json[i]['m_send_to'];
					}
				}
				
			} 
		});	
		
		
		
	$.ajax({
		type:"POST",
		url:"./getUserInformation.do",
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
		success : function(message, Status) {
			json=message;
			let msg=eval(message);
			show_tabel(msg);
		} 
	});
	// body... 

	$("td,th").addClass("text-center");
	
	$('#mchine_conditions_btn').click(function(e){
		let input_msg=$('#mchine_conditions').val();
		if(input_msg==""){
			alert("请先填写信息");
			return;
		}
		let mchine_conditions=$('#mchine_conditions_select').val();
		console.log({mchine_conditions});		
		search(json,mchine_conditions,input_msg);

	})
	
	$("#change_permissions").click(function(event) { //点击提交用户更变权限的信息
		let permissions= $('#machine_place').val();
		console.log(permissions);
		let permission="";
		for(let i=0;i<permissions.length;i++)
		{
			permission+=permissions[i]+"-"
		}
		console.log(permission);
		let msg=permission.slice(0,permission.length-1);
		console.log(msg);
		$.ajax({
			type:"POST",
			url:"./getAlterUserInformation",
			data:{
				a_id:myrow.a_id,
				a_permission:msg
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
					if(massge=="1"){
						alert("修改成功");
						window.location.href="permissions.html";
					}if(massge=="没有权限"){
						window.location.href="unauthorized.do";
					}
				} 
		});        
	});

	$("#change_permissions1").click(function(event) { //点击提交用户更变权限的信息

		
		let msg= $('#machine_place1').val();		
		$.ajax({
			type:"POST",
			url:"./updaterolemsg",
			data:{
				a_id:myrow1.a_id,
				a_role:msg
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
					if(massge=="1"){
						alert("修改成功");
						window.location.href="permissions.html";
					}if(massge=="没有权限"){
						window.location.href="unauthorized.do";
					}
				} 
		});        
	});
	
	
}


function change_permissions1(row) {
	// body...
	let place=row.a_role;
	$('#myModal1').modal("show");
	console.log(place);
	$('#machine_place1').val(place); 
	$('#machine_place1').selectpicker('refresh');
	myrow1=row;
}








function change_permissions(row) {
	console.log(row);
	let place=row.a_permission;	
	$('#myModal').modal("show");
	let msg=place.split('-');
	$('#machine_place').val(msg); 
	$('#machine_place').selectpicker('refresh');
	myrow=row;
	
}

function show_tabel(json){
	console.log({json});
	$('#permissions_table').bootstrapTable({
		columns : [
			{
				field : 'a_xingming',
				title : '姓名'
					//sortable: true
			},
			{
				field : 'a_name',
				title : '工号'
			},
			{
				field : 'operation1',
				title : '分配账户类型',
				formatter : function(value, row, index) {
					var s = '<button class="btn btn-info btn-sm edit"><span align>用户类型分配</span> </button>';
					var fun = '';
					return s;
				},
				events : {
					// 操作列中编辑按钮的动作 
					'click .edit' : function(e, value,
							row, index) {
						change_permissions1(row);
					}

				}
			},
			{
				field : 'operation',
				title : '分配权限',
				formatter : function(value, row, index) {
					var s = '<button class="btn btn-info btn-sm edit"><span align>权限分配</span> </button>';
					var fun = '';
					return s;
				},
				events : {
					// 操作列中编辑按钮的动作 
					'click .edit' : function(e, value,
							row, index) {
						change_permissions(row);
					}

				}
			} ],
			data: json,
			sortable: false,   
			pageList : [ 1,5,10],
			pageSize : 10,
			sidePagination: "client",  
			clickToSelect : true,
			pagination : true,
	});
}

function search(msg,machine_conditions,input_msg){
	console.log({machine_conditions});
	console.log({input_msg});
	let json=eval(msg);
	switch (machine_conditions) {
    case "选择姓名":
    	machine_conditions="a_xingming"
        break; 
    case "选择工号":
    	machine_conditions="a_name"
        break;
    default: 
    	machine_conditions="void"
} 
	console.log({machine_conditions});
	let json1=[];
	if(input_msg!="" && machine_conditions!="void"){
		for(let i=0;i<json.length;i++){
			if(json[i][machine_conditions].indexOf(input_msg)!=-1){
				json1.push(json[i]);
			}
		}
	}
	
	console.log(json1);

 $('#permissions_table').bootstrapTable('load',json1);

 $("#mchine_conditions_select").selectpicker('refresh'); 	
	 
}
