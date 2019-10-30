function Initialize(){
	var mynode;
	var parentnode;
	var json="";
	$.ajax({
		type: "post",
		url: "./sendMachineMsg",      
		success: function (data,Status) {
			json=eval(data);
			let machine_factory_set=new Set();
			let machine_factory_array=json.forEach(e => {
				let machine_facotry=e.m_send_to;
				machine_factory_set.add(machine_facotry);
			});
			machine_factory_set.forEach(e =>{
				document.getElementById("machine_factory").innerHTML+=`<option>${e}</option>`
			})
			$('#machine_factory').selectpicker('refresh');

		}
	})


	$("#machine_factory").change(function (e) {    //厂区发生变化的时候触发
		let machine_factory=$('#machine_factory').val();
		$("#machine_floor").find("option:not(:first)").remove();
		$("#machine_name").find("option:not(:first)").remove();
		$('#machine_floor').selectpicker('refresh');
		$('#machine_name').selectpicker('refresh');
		changeFloor(machine_factory,json); 
	});

	$('#machine_floor').change(function (e) { 
		let machine_floor=$('#machine_floor').val();
		let machine_factory=$('#machine_factory').val();
		$("#machine_name").find("option:not(:first)").remove();
		$('#machine_name').selectpicker('refresh');
		changeMachineName(machine_factory,machine_floor,json);
	});

	$('#btn_search').click(function (e) { 
		let machine_factory=$("#machine_factory").val();
		let machine_floor=$('#machine_floor').val();
		let machine_name=$('#machine_name').val();
		if(machine_factory=="选择厂区信息" || machine_floor=="选择楼层" || machine_name=="选择机器信息"){
			alert("选择条件");
			return ;
		}
		console.log({machine_name});
		$.ajax({
			type: "post",
			url: "./sendMachineMsg1",
			data: {
				m_send_to:machine_factory,
				m_floor:machine_floor,
				m_type:machine_name
			},
			dataType: "json",
			success: function (data,Status) {
				let json=eval(data);
				console.log({json});
				let treeData=convertToTreeData(json,0);
				$('#left-tree').treeview({
					data:treeData,
					levels:1,
					onNodeSelected:function (event,node) { 
						mynode=node;
						parentnode=$('#left-tree').treeview('getParent', node);

					},
					showCheckbox:false
				});
				$('#show_photo').removeAttr("disabled");
				$('#add_photo').removeAttr("disabled");
			}
		});
	});

	$('#show_photo').click(function(e){
		/*	  window.location.href="./img/aa.pdf";*/    
		let path1=mynode.id;
		let path2=parentnode.id;
		console.log({path1});
		console.log({path2});
		$.ajax({
			type: "post",
			url: "./findphoto",
			data: {
				machine_id:path1,
				machine_parent_id:path2
			},

			success: function (data,Status) {
				window.open(`./img/${data}`);
			}
		});


	}) 

	$('#add_photo').click(function (e) { 
		$('#photo_update').html(` <div class="form-group">
				<div class="col-md-8">
				<label>添加图片</label>
				<form action="#" method="post" enctype="multipart/form-data">
				<input type="file" name="inputBox" id="inputBox"  >
				</form>
				<img src="" id="img">
				</div> 
		</div>`);   

		$("#machine_factory").attr("disabled","disabled");
		$("#machine_floor").attr("disabled","disabled");
		$("#machine_name").attr("disabled","disabled");


		$('#machine_factory').selectpicker('refresh');
		$('#machine_floor').selectpicker('refresh');
		$('#machine_name').selectpicker('refresh');
		$("#unlocked").removeAttr("disabled");


		$('#add_photo_s').removeAttr('disabled');
		let machine_id=mynode.id;
		let machine_parent_id=parentnode.id;
		$.ajax({
			type: "post",
			url: "./sendList1",
			data: {
				machine_id:machine_id,
				machine_parent_id:machine_parent_id
			},
			success: function (data,Status) {
				console.log({data});
				$('#left-tree').treeview('disableAll', { silent: true });
			}
		});

	});




	$("#add_photo_s").click(function (e) { 
		var formdata=new FormData();
		formdata.append('inputBox',$('#inputBox').get(0).files[0]);

		$.ajax({
			async: false,
			type: 'POST',
			url: "/imageUpload1",
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
				console.log(data.result_msg);
			},
			error: function (e) {
				alert("没有权限");
			}
		});

	});

	$("#unlocked").click(function(e){
		$('#left-tree').treeview('enableAll', { silent: true });
		$("#machine_factory").removeAttr("disabled");
		$("#machine_floor").removeAttr("disabled");
		$("#machine_name").removeAttr("disabled");
		$('#machine_factory').selectpicker('refresh');
		$('#machine_floor').selectpicker('refresh');
		$('#machine_name').selectpicker('refresh');
		$('#photo_update').html(``);   

	})



}

function changeFloor(machine_factory,json) {
	console.log(machine_factory);
	let	machine_floor_set=new Set();
	let machine_floor=json.forEach(e =>{
		if(e.m_send_to==machine_factory){
			machine_floor_set.add(e.m_floor);
		}
	})
	machine_floor_set.forEach(e =>{
		document.getElementById("machine_floor").innerHTML+=`<option>${e}</option>`
	})
	$('#machine_floor').selectpicker('refresh');
}

function changeMachineName(machine_factory,machine_floor,json){
	console.log(machine_factory+"  "+machine_floor);
	let machineName_set=new Set();
	machineName=json.forEach(e =>{
		if(e.m_send_to==machine_factory && e.m_floor==machine_floor){
			machineName_set.add(e.m_type);
		}
	})
	
	machineName_set.forEach(e=>{
		document.getElementById("machine_name").innerHTML+=`<option>${e}</option>`
	})
	$('#machine_name').selectpicker('refresh');

}

function convertToTreeData(data, pid) {
	const result = []
	let temp = []
	for (let i = 0; i < data.length; i++) {
		if (data[i].parentid == pid) {
			const obj = { 'text': data[i].title, 'id': data[i].id }
			temp = this.convertToTreeData(data, data[i].id)
			if (temp.length > 0) {
				obj.nodes = temp
			}
			result.push(obj);
		}
	}
	return result
}

