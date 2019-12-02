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
		url:"./main_machinepartsSend",
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
					{mType:decodeURI(msg2[1]),stName:decodeURI(msg1[1]),pName:"",photoname:""}
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
				field : 'pName',
				title : '零件名'
			},
			{
				field : 'photoname',
				title : '故障图片',
				formatter : function(value, row, index) {
					var s = '<a  target="_blank" href="./lingjian/'+row.photoname+'">'+row.photoname+'</a>';
					return s;},
			},
			{
				field : 'operation2',
				title : '提交该故障图片',
				formatter : function(value, row, index) {
					var id=row.idParts;
					var s = '<input type="file" name="inputBox" id="inputBox'+id+'"><button id="sub">提交</button>';					
					var fun = '';
					return s;
				},
				events : {
					// 操作列中编辑按钮的动作 
					'click #sub' : function(e, value,
							row, index) {	
						let id=row.idParts;
						var img='#inputBox'+id;
						var formdata=new FormData();
						formdata.append('inputBox',$(img).get(0).files[0]);
						$.ajax({
							type: 'POST',
							url: "./lingjianid",
							contentType: 'application/json',
							data:{id},
							success: function (data) {
								$.ajax({
									async: false,
									type: 'POST',
									url: "/imageUploadparts",
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
	        	if(field=='pName'){
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
			url:"./main_machinepartsDeleteSend",
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
            	pName:'',
            	photoname:'',
            	mType:f_m,
            	stName:f_s
            }
        });
    });



 $getTableData.click(function() {
	   	var a =JSON.stringify($table.bootstrapTable('getSelections'));
    	
	   	let mydata=eval(a);	 
	    let data=JSON.stringify(mydata);
	 	$.ajax({
			type:"post",
			url:"./main_machinepartsUpdateSend",
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
