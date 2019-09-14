var json=[];
function Initialize () {	
	$.ajax({
		type:"POST",
		url:"./recordupkeeplist",
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
			let msg=eval(message);		
			json=msg;	
			console.log({msg});
			show_tabel(msg);
		} 
	});
	// body... 
	$("td,th").addClass("text-center");
		
	$('#mchine_conditions_btn').click(function(e){
		let input_msg=$('#mchine_conditions').val();
		let mchine_conditions=$('#mchine_conditions_select').val();
		if(input_msg==""){
			alert("请先填写信息");
			return;
		}
		
		console.log({mchine_conditions});		
		search(json,mchine_conditions,input_msg);

	})
}

function show_tabel(json){
	console.log({json});
	$('#permissions_table').bootstrapTable({
		columns : [
			{
				field : 'uSendto',
				title : '分厂'
			},{
				field : 'uDepartment',
				title : '部门'
			},{
				field : 'uUid',
				title : '机器ID'
			},{
				field : 'uType',
				title : '机器类型'
			},{
				field : 'uPerson',
				title : '保养人'
			},{
				field : 'uItem',
				title : '保养条目 '
			},{
				field : 'uCycle',
				title : '保养周期'
			},{
				field:'uFinishitime',
				title:'完成时间'
			}],
			showColumns: true,
			toolbar: '#toolbar',
			data: json,
			sortable: true, 
			pageList : [ 1,10,50,100,500,1000],
			pageSize : 100,
			sidePagination: "client",  
			clickToSelect : true,
			pagination : true,
	});
	
}

function search(msg,machine_conditions,input_msg){
	console.log({machine_conditions});
	console.log({input_msg});
	switch (machine_conditions) {
    case "选择分厂":
    	machine_conditions="uSendto"
        break; 
    case "选择机器类型":
    	machine_conditions="uType"
        break;
    case "选择部门":
    	machine_conditions="uDepartment"
    	break;
    case "选择保养人":
    	machine_conditions="uPerson"
    	break;
    case "选择机器ID":
    	machine_conditions="uMid"
    	break;
    case "保养条目":
    	machine_conditions="uItem"
    	break;
    default: 
    	machine_conditions="void"
} 
	console.log({machine_conditions});
	let json1=[];
	if(input_msg!="" && machine_conditions!="void"){
		for(let i=0;i<msg.length;i++){
			if(json[i][machine_conditions]==input_msg){
				json1.push(json[i]);
			}
		}
	}
	
	
	
 $('#permissions_table').bootstrapTable('load',json1);

 $("#mchine_conditions_select").selectpicker('refresh'); 	
	 
}
