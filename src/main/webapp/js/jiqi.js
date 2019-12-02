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
		document.getElementById("wangye").innerHTML=`<iframe src="main_machinestructure.html?machine_type=${machine_name}" class="iframe1" name="iframe1"
		id="iframe1" width="70%" height="500px"> </iframe>`
	});

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

