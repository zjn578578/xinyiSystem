var machine_type1111="";
var machine_mid1111="";
function Initialize () {
	let url=window.location.href;    
    let message=url.split("?");
    let msg=message[1];
    msg=msg.split("=");
	let msg1=msg[1];
    msg1=msg1.split("&");
    let m=decodeURI(msg1[0]);
    data={"uMid":msg[2],"uMtype":m};
    machine_type1111=m;
    machine_mid1111=msg[2];
    console.log(machine_mid1111);
	$.ajax({
		type:"POST",
		url:"./upkeepinfo",
		data:JSON.stringify(data),
        dataType:"json",
        contentType : "application/json;charset=UTF-8",
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
				{"uCycle":"","uId":"","uItem":"","uRemark":"","uMid":machine_mid1111,"uMtype":m}
				]
			}
			console.log({msg});
			machine_type=msg[0]['m_type'];
			console.log({machine_type});
			show_tabel(msg);
			
		} 
	});
	// body... 

	$("td,th").addClass("text-center");
}

function show_tabel(json){
	console.log({json});
	
//	let long=machine_type.length;
//	for(let i=0;i<json.length;i++){
//		json[i]['st_name']=json[i]['st_name'].substr(long,json[i]['st_name'].length-long);
//	}
	$('#permissions_table').bootstrapTable({
		columns : [
			{
	            checkbox: true
	        },
			{
				field : 'uItem',
				title : '保养条目'
			},
			{
				field : 'uCycle',
				title : '时间间隔(天)'
			},{
				field : 'uRemark',
				title : '备注'
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
    var $getTableDataToAll = $('#getTableDataToAll');
    var $deleteTableData=$('#deleteTableData');
    var $deleteAllTableData=$('#deleteAllTableData');
    $deleteTableData.click(function() {
    	var ids =JSON.stringify($table.bootstrapTable('getSelections'));
		$.ajax({
			type:"post",
			url:"./upkeepinfoDeleteOne",
			data:ids,	
			contentType: 'application/json',
			statusCode:{
			404:function(){
				alert("404");
			},
			500:function(){
				alert("没有数据");
			}
		},success:function(data,Status){
			console.log({data});
			location.reload();
		}
		});
    });
    
    $deleteAllTableData.click(function() {
    	var ids =JSON.stringify($table.bootstrapTable('getSelections'));
		$.ajax({
			type:"post",
			url:"./upkeepinfoDeleteAll",
			data:ids,	
			contentType: 'application/json',
			statusCode:{
			404:function(){
				alert("404");
			},
			500:function(){
				alert("没有数据");
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
            	uMid:machine_mid1111,
            	uMtype:machine_type1111,
            	uItem:'',
            	uRemark:'',
            	uCycle:''
            }
        });
    });



 $getTableData.click(function() {
	   	let a =JSON.stringify($table.bootstrapTable('getSelections'));
	   	let json=eval(a);
	   	console.log({json});
	 	$.ajax({
			type:"post",
			url:"./upkeepinfoUpdateOne",
			data:a,	
			contentType: 'application/json',
			statusCode:{
			404:function(){
				alert("404");
			},
			500:function(){
				alert("请先选择信息");
			}
		},success:function(data,Status){
			alert("上传成功");
		//	location.reload();
		}
		});
	 	
    });
 
 $getTableDataToAll.click(function() {
	   	let aa=JSON.stringify($table.bootstrapTable('getSelections'));
	 	$.ajax({
			type:"post",
			url:"./upkeepUpdate",
			data:aa,	
			contentType: 'application/json',
			statusCode:{
			404:function(){
				alert("404");
			},
			500:function(){
				alert("请先选择信息");
			}
		},success:function(data,Status){
			alert("上传成功");
//			location.reload();
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
