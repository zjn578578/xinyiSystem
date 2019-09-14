var global_json;
var global_json1;
var first=true;
function Initialize() {
	$.ajax({
		type:"POST",
		url:"./faultreview.do",
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
			json=json.sort((a,b)=> a.s_id-b.s_id);
			console.log({json});
			global_json=json;
			showdata(json);
		} 
	});

//	setTimeout("Initialize()",1000);
	
	setTimeout("window.location.reload();", 1000*60*2);
}
function save_data(){
	let s_id=$("#s_id").text();
	$.ajax({
		type:"POST",
		url:"./updatefaultreview.do",
		data:{
			key:s_id
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
			if(message=="1"){
				window.location.href="fault-review.html";
			}
		} 
	});

}


function mybtn(){
	let fault_id=$("#s_id").text();
	let msg=$("#mytextarea").val();
	data1=JSON.stringify({"s_id":fault_id,"s_listType":msg});
	$.ajax({
		type:"POST",
		url:"./notpass",
		data:data1,
	    contentType : "application/json;charset=UTF-8",
		statusCode : {
			404 : function() {
				alert("404");
			},
			500 : function() {
				alert("500");
			}
		},
		success : function(message, Status) {
			alert("提交成功");
			window.location.href="fault-review.html";
			
		} 
	});
	
}

function getID(number) {
	let status=global_json[number]["s_status"];
	if(status=="未通过"){
		$("#mybtn").attr("disabled","disabled");
	}else{
		$("#mybtn").removeAttr("disabled");
	}
	// body...
	
	$('#s_department').text(global_json[number]['s_department']);
	$('#s_sendTo').text(global_json[number]['s_sendTo']);
	$('#s_id').text(global_json[number]["s_id"]);
	$('#s_fixperson').text(global_json[number]["s_fixperson"]);
	$('#s_person').text(global_json[number]["s_person"]);
	$('#s_acType').text(global_json[number]["s_acType"]);
	$('#s_mId').text(global_json[number]["s_mId"]);
	$('#s_mType').text(global_json[number]["s_mType"]);
	$('#mytextarea').text(global_json[number]['s_listType']);
	document.getElementById('fault_img').innerHTML=`<img style="width:100%;" src="img/ck${global_json[number]["s_id"]}.jpg">`
		$.ajax({
			type:"POST",
			url:"./xinyi/Material/materialsById",
			data:{
				id:global_json[number]["s_id"]
			},
			success : function(message, Status) {
				let item=[];
				let resultArr = [];
				let json=eval(message);
				for(let i=0;i<json.length;i++){
					let msg=eval(json[i]);
					console.log(msg[0]);
					msg.forEach(it=>{item.push(it)});
//					let material=msg[0]["material"];
//					let materialId=msg[0]['materialId'];
//					let number=msg[0]['number'];
//					let unit=msg[0]['unit'];
//					item[i]['material']=material;
//					item[i]['materialId']=materialId;
//					item[i]['number']=number;
//					item[i]['unit']=unit;
				}
				item.forEach(item=>{
					let index = resultArr.findIndex(materialInfo=>materialInfo.material==item.material);
					if(index!=-1){
						resultArr[index].number +=item.number;
					}else{
						resultArr.push(JSON.parse(JSON.stringify(item)));
					}
				})
				if(first){
					show_parts_data(item);
					show_parts_data1(resultArr);
					first=false;
				}else{
					$('#show_parts_date').bootstrapTable('load',item);
				}
			} 
		});

}

function showdata(json){
	for(let i=0;i<json.length;i++){
		if(json[i]['s_status']=="待审核"){ 
			document.getElementById('row_panel').innerHTML+=`
				<div class="col-sm-4">
				<div class="panel panel-green">
				<div class="panel-heading">
				<h3 class="panel-title">故障ID：${json[i]["s_id"]}</h3>
				</div>
				<div class="panel-body">
				<a href="#" data-toggle="modal" data-target="#myModal" onclick="getID(`+i+`)">报修人：${json[i]["s_person"]}</a>
				</div>
				</div> 
				</div>
				`     
		}
	}
	
	
	

	for(let i=0;i<json.length;i++){
		if(json[i]['s_status']=="未通过"){
			document.getElementById('row_panel').innerHTML+=`
				<div class="col-sm-4">
				<div class="panel panel-default">
				<div class="panel-heading">
				<h3 class="panel-title">故障ID：${json[i]["s_id"]}</h3>
				</div>
				<div class="panel-body">
				<a href="#" data-toggle="modal" data-target="#myModal" onclick="getID(`+i+`)">报修人：${json[i]["s_person"]}</a>
				</div>
				</div> 
				</div>
				`
		}
	}
	
	
	
	
	for(let i=0;i<json.length;i++){
		if(json[i]['s_status']=="未维修"){
			document.getElementById('row_panel').innerHTML+=`
				<div class="col-sm-4">
				<div class="panel panel-red">
				<div class="panel-heading">
				<h3 class="panel-title">故障ID：${json[i]["s_id"]}</h3>
				</div>
				<div class="panel-body">
				<a href="#"  data-toggle="modal">报修人：${json[i]["s_person"]}</a>
				</div>
				</div> 
				</div>
				`
		}
	}
	
	
	
//	for(var i=0;i<json.length;i++){
//		if(json[i]['s_status']=="待审核"){
//			document.getElementById('row_panel').innerHTML+=`
//				<div class="col-sm-4">
//				<div class="panel panel-green">
//				<div class="panel-heading">
//				<h3 class="panel-title">故障ID：${json[i]["s_id"]}</h3>
//				</div>
//				<div class="panel-body">
//				<a href="#" data-toggle="modal" data-target="#myModal" onclick="getID(`+i+`)">报修人：${json[i]["s_person"]}</a>
//				</div>
//				</div> 
//				</div>
//				`     
//		}else if(json[i]['s_status']=="未维修"){
//			document.getElementById('row_panel').innerHTML+=`
//				<div class="col-sm-4">
//				<div class="panel panel-red">
//				<div class="panel-heading">
//				<h3 class="panel-title">故障ID：${json[i]["s_id"]}</h3>
//				</div>
//				<div class="panel-body">
//				<a href="#"  data-toggle="modal">报修人：${json[i]["s_person"]}</a>
//				</div>
//				</div> 
//				</div>
//				`
//		}
//	}
}


function show_parts_data(json){
	$('#show_parts_date').bootstrapTable({
		columns:[{
			field:"materialId",
			title:"零件ID"
		},{
			field:"material",
			title:"零件名称"
		},{
			field:"number",
			title:"数量"
		},{
			field:"unit",
			title:"单位"
		}],
		data:json,
		sortable: false,   
		pageList : [ 5,10,20],
		pageSize : 5,
		sidePagination: "client",  
		clickToSelect : true,
	});
}

function show_parts_data1(json){
	$('#show_parts_date1').bootstrapTable({
		columns:[{
			field:"materialId",
			title:"零件ID"
		},{
			field:"material",
			title:"零件名称"
		},{
			field:"number",
			title:"数量"
		},{
			field:"unit",
			title:"单位"
		}],
		data:json,
		sortable: false,   
		pageList : [ 5,10,20],
		pageSize : 5,

	});
}




