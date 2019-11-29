var machine_type="";

function Initialize () {
	let url=window.location.href;    
    let message=url.split("?");
    let msg=message[1];
    msg=msg.split("=");
	console.log(msg);
	let msg1=msg[1];
    msg1=msg1.split("&");
    let m=decodeURI(msg1[0]);
   console.log(m);
   console.log(msg[2]);
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
				alert("没有选择");
			}
		},
		success : function(message, Status) {
			let msg=eval(message);
		
			if(msg.length==0){
				msg=[
					{st_name: "",m_type: m, st_id: 0}
				]
			}
			console.log({msg});
			machine_type=msg[0]['m_type'];
			console.log({machine_type});
			show_tabel(msg);
			document.getElementById('place').innerHTML+=machine_type;
		} 
	});
	// body... 

	$("td,th").addClass("text-center");
}

function show_tabel(json){
	console.log({json});
	
	let long=machine_type.length;
	for(let i=0;i<json.length;i++){
		json[i]['st_name']=json[i]['st_name'].substr(long,json[i]['st_name'].length-long);
	}
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
				title : '查看图片'
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
						console.log(row);
						let index1=row.st_id;
						let st_name=row.m_type+""+row.st_name;
						console.log({st_name});
						
						let url=`main_machineparts.html?st_id=${index1}&m_type=${row.m_type}&st_name=${st_name}`;
					
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
						console.log(row);
						let index1=row.st_id;
						let st_name=row.m_type+""+row.st_name;
						console.log({st_name});
						
						let url=`main_machineparts.html?st_id=${index1}&m_type=${row.m_type}&st_name=${st_name}`;
					
						window.location.href=url;
					},
				}
			},
			{
				field : 'operation2',
				title : '提交该构造图片',
				formatter : function(value, row, index) {
					var s = ' <div class="form-group"><div class="col-md-8"><form action="imageUpload" method="post" enctype="multipart/form-data"><input type="file" name="inputBox" id="inputBox"  ></form><button>提交</button></div> </div>';
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
						console.log(row);
						let index1=row.st_id;
						let st_name=row.m_type+""+row.st_name;
						console.log({st_name});
						
						let url=`main_machineparts.html?st_id=${index1}&m_type=${row.m_type}&st_name=${st_name}`;
					
						window.location.href=url;
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
	            $element.attr('contenteditable', true);
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
    	console.log({ids});
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
				alert("没有该结构");
			}
		},success:function(data,Status){
			console.log({data});
			location.reload();
		}
		});
    });
    
    $button.click(function() {
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	operation:'',
            	m_type:'',
            	st_name:'',
            	st_id:''
            }
        });
    });



 $getTableData.click(function() {
	 	console.log(machine_type);
	   	var a =JSON.stringify($table.bootstrapTable('getSelections'));
	   	console.log(a);
	   	let mydata=eval(a);	   	 
	   	for(let i=0;i<mydata.length;i++){
	   		if(mydata[i]['m_type']==""){
	   			mydata[i]['m_type']=machine_type;
	   		}
	   		mydata[i]['st_name']=machine_type+""+mydata[i]['st_name'];
	   	}
	   	console.log({mydata});
	    let data=JSON.stringify(mydata);
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
			//location.reload();
		}
		});
	 	
    });

    function saveData(index, field, value) {
        $table.bootstrapTable('updateCell', {
            index: index,       //行索引
            field: field,       //列名
            value: value        //cell值
        });
    }
}
