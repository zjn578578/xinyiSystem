let f_m="";
let f_s="";
function Initialize () {
	let url=window.location.href;    
    let message=url.split("?");
    let msg=message[1];
    msg=msg.split("&");
	let msg1=msg[2];
	let msg2=msg[1];
    msg1=msg1.split("=");
    msg2=msg2.split("=");
    f_m=decodeURI(msg2[1]);
    f_s=decodeURI(msg1[1]);
    let m=decodeURI(msg2[1])+":"+decodeURI(msg1[1]);
    document.getElementById('place').innerHTML+=m;
	$.ajax({
		type:"POST",
		url:"./main_machineguzhangSend",
		contentType: 'application/json',
		data:JSON.stringify({m_type:m}),
		statusCode : {
			404 : function() {
				alert("404");
			},
			500 : function() {
				alert("请先编辑机器结构");
			}
		},
		success : function(message, Status) {
			let msg=eval(message);
			if(msg==null){
				msg=[
					{fault_machine:decodeURI(msg2[1]),fault_structure:decodeURI(msg1[1]),fault_id: 0,fault_type:"",fault_photo:"",fault_msg:""}
				]
			}

			show_tabel(msg);
			
		} 
	});
	// body... 
	$("td,th").addClass("text-center");
}

function show_tabel(json){
	$('#permissions_table').bootstrapTable({
		columns : [
			{
	            checkbox: true
	        },
			{
				field : 'fault_type',
				title : '故障类型'
			},
			{
				field : 'fault_msg',
				title : '故障解决方案',
			},
			{
				field : 'fault_photo',
				title : '故障图片',
				formatter : function(value, row, index) {
					var s = '<a  target="_blank" href="./guzhang/'+row.fault_photo+'">'+row.fault_photo+'</a>';
					return s;},
			},
			{
				field : 'operation2',
				title : '提交该故障图片',
				formatter : function(value, row, index) {
					var id=row.fault_id;
					var s = '<input type="file" name="inputBox" id="inputBox'+id+'"><button id="sub">提交</button>';					
					var fun = '';
					return s;
				},
				events : {
					// 操作列中编辑按钮的动作 
					'click #sub' : function(e, value,
							row, index) {	
						let id=row.fault_id;
						var img='#inputBox'+id;
						var formdata=new FormData();
						formdata.append('inputBox',$(img).get(0).files[0]);
						$.ajax({
							type: 'POST',
							url: "./guzhangid",
							contentType: 'application/json',
							data:{id},
							success: function (data) {
								$.ajax({
									async: false,
									type: 'POST',
									url: "/imageUploadguzhang",
									dataType: 'json',
									data: formdata,
									contentType:false,//ajax上传图片需要添加
									processData:false,//ajax上传图片需要添加
									success: function (data) {
										alert("图片上传成功");
										location.reload();
									},
									error: function (e) {
									}
								});
							},
							error: function (e) {
							}
						});

					},
				}
			}],
			showColumns: true,
			toolbar: '#toolbar',
			clickEdit: true,
			data: json,
			sortable: false,   
			pageList : [ 1,5,10],
			pageSize : 10,
			sidePagination: "client",  
			clickToSelect : true,
			pagination : true,
	        onClickCell: function(field, value, row, $element) {
	        	if(field=='fault_type'||field=='fault_msg'){
	            $element.attr('contenteditable', true);
	        	}
	            $element.blur(function() {
	                let index = $element.parent().data('index');
	                let tdValue = $element.html();					
	                saveData(index, field, tdValue);
	            })
	        }
	});
	var $table = $('#permissions_table');
    var $button = $('#button');
    var $getTableData = $('#getTableData');
    var $deleteTableData=$('#deleteTableData');
    
    $deleteTableData.click(function() {
    	var ids =JSON.stringify($table.bootstrapTable('getSelections'));
		$.ajax({
			type:"post",
			url:"./main_machineguzhangDeleteSend",
			data:ids,	
			contentType: 'application/json',
			statusCode:{
			404:function(){
				alert("404");
			},
			500:function(){
				alert("没有该结构");
			}
		},success:function(data,Status){
			location.reload();
		}
		});
    });
    
    $button.click(function() {
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	fault_type:'',
            	fault_msg:'',
            	fault_photo:'',
            	fault_machine:f_m,
            	fault_structure:f_s
            }
        });
    });



 $getTableData.click(function() {
	   	var a =JSON.stringify($table.bootstrapTable('getSelections'));
	   	let mydata=eval(a);	   	 
	    let data=JSON.stringify(mydata);
	 	$.ajax({
			type:"post",
			url:"./main_machineguzhangUpdateSend",
			data:data,	
			contentType: 'application/json',
			statusCode:{
			404:function(){
				alert("404");
			},
			500:function(){
				alert("500");
			}
		},success:function(data,Status){
			alert("上传成功");
			location.reload();
		}
		});
	 	
    });

    function saveData(index, field, value) {
        $table.bootstrapTable('updateCell', {
            index: index,       //行索引
            field: field,       //列名
            value: value       //cell值
        });
    }
    $('#refresh').click(function() {
		location.reload();
    });
    
    $('#fanhui').click(function() {
        window.history.go(-1);
    });

}
