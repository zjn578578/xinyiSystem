function work_person(){
	$.ajax({
		type: "post",
		url: "./selectworker",
		data:{
			test:"key"
		},
		statusCode: {
			404: function() {
				alert("404");
			},
			500: function() {
				alert("500");
			}
		},
		success: function(data, Status) {
			console.log({data});
			let json=eval(data);
			for(let i=0;i<json.length;i++){
				let temp=json[i]['a_xingming'];
				document.getElementById('work_person').innerHTML+=`<option>${temp}</option>` ;
			}
			$('#work_person').selectpicker('refresh');
		}
	});
}