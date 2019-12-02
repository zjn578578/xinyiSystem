var machine_type="";

function Initialize () {
	let url=window.location.href;    
    let message=url.split("?");
    let msg=message[1];
    msg=msg.split("=");
	let msg1=msg[1];
    msg1=msg1.split("&");
    let m=decodeURI(msg1[0]);
	$.ajax({
		type:"POST",
		url:"./main_machinestructureSend",
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
		
			if(msg.length==0){
				msg=[
					{st_name: "",m_type: m, st_id: 0,photoname:""}
				]
			}

			machine_type=msg[0]['m_type'];
			show_tabel(msg);
			document.getElementById('place').innerHTML+=machine_type;
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
				field : 'st_name',
				title : '构造'
			},
			{
				field : 'photoname',
				title : '查看图片',
				formatter : function(value, row, index) {
					var s = '<a  target="_blank" href="./jiegou/'+row.photoname+'">'+row.photoname+'</a>';
					return s;},
			},
			{
				field : 'operation',
				title : '编辑该结构故障条目',
				formatter : function(value, row, index) {
					var s = '<button class="btn btn-info btn-sm edit"><span align>编辑该结构故障</span> </button>';
					var fun = '';
					return s;
				},
				events : {
					// 操作列中编辑按钮的动作 
					'click .edit' : function(e, value,
							row, index) {
						let machine_type=row.m_type;
						let machine_id=row.m_id;
						
						json.push(machine_type);

						let index1=row.st_id;
						let st_name=row.st_name;
						
						let url=`main_machineguzhang.html?st_id=${index1}&m_type=${row.m_type}&st_name=${st_name}`;
					
						window.location.href=url;
					},
				}
			},
			{
				field : 'operation1',
				title : '编辑该结构的零件',
				formatter : function(value, row, index) {
					var s = '<button class="btn btn-info btn-sm edit"><span align>编辑该构造零件</span> </button>';
					var fun = '';
					return s;
				},
				events : {
					// 操作列中编辑按钮的动作 
					'click .edit' : function(e, value,
							row, index) {
						let machine_type=row.m_type;
						let machine_id=row.m_id;
						
						json.push(machine_type);

						let index1=row.st_id;
						let st_name=row.st_name;
						
						let url=`main_machineparts.html?st_id=${index1}&m_type=${row.m_type}&st_name=${st_name}`;
					
						window.location.href=url;
					},
				}
			},
			{
				field : 'operation2',
				title : '提交该构造图片',
				formatter : function(value, row, index) {
					var id=row.st_id;
					var s = '<input type="file" name="inputBox" id="inputBox'+id+'"><button id="sub">提交</button>';					
					var fun = '';
					return s;
				},
				events : {
					// 操作列中编辑按钮的动作 
					'click #sub' : function(e, value,
							row, index) {	
						let st_id=row.st_id;
						var img='#inputBox'+st_id;
						var formdata=new FormData();
						formdata.append('inputBox',$(img).get(0).files[0]);
						$.ajax({
							type: 'POST',
							url: "./stid",
							contentType: 'application/json',
							data:{st_id},
							success: function (data) {
								$.ajax({
									async: false,
									type: 'POST',
									url: "/imageUploadjiegou",
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
	        	if(field=='st_name'){
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
    	var d = confirm("删除机器构造，同时也会删除该结构的故障条目和零件条目，您确认删除吗？");
    	alert("删除成功");
		$.ajax({
			type:"post",
			url:"./main_machinestructureDeleteSend",
			data:ids,	
			contentType: 'application/json',
			statusCode:{
			404:function(){
				alert("404");
			},
			500:function(){
				
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
            	photoname:'',
            	operation3:'',
            	m_type:machine_type,
            	st_name:'',
            	st_id:''
            }
        });
    });



 $getTableData.click(function() {
	   	var a =JSON.stringify($table.bootstrapTable('getSelections'));
	   	let mydata=eval(a);	   	 
	    let data=JSON.stringify(mydata);
	    console.log(data);
	 	$.ajax({
			type:"post",
			url:"./main_machinestructureUpdateSend",
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
}
