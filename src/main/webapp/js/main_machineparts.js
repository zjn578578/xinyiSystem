let m_type="";
let st_name="";
let st_id="";
function Initialize () {
	let url=window.location.href;    
	let message=url.split("?");
	message=message[1];
	let msg=message.split("&");
	console.log({msg});
	let machine_type=msg[1];
	machine_type=machine_type.split("=");
	m_type=machine_type[1];
	m_type=decodeURI(m_type);
	
	let st=msg[2];
	st=st.split("=");
	st=st[1];
	st_name=decodeURI(st);
	msg=msg[0];
	let m=msg.split("=");
	st_id=m[1];
	console.log({m_type});
	console.log({st_name});
	console.log({st_id});
	$.ajax({
		type:"POST",
		url:"./main_machinepartsSend",
		data:st_id,
		contentType: 'application/json',
		statusCode : {
			404 : function() {
				alert("404");
			},
			500 : function() {
				alert("您还没有编辑结构");
			}
		},
		success : function(message, Status) {		
			let msg=eval(message);
			if(msg.length==0){
				msg=[
					{ mType:m_type, pName: "", stName: st_name}
				]
			}
			console.log(msg);
			show_tabel(msg);
		} 
	});
	// body... 

	$("td,th").addClass("text-center");
}

function show_tabel(json){
	console.log({json});
	$('#permissions_table').bootstrapTable({
		columns : [
			{
	            checkbox: true
	        },
			{
				field : 'pName',
				title : '零件名'
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
				alert("500");
			}
		},success:function(data,Status){
			alert("删除成功");
			location.reload();
		}
		});
    });
    
    $button.click(function() {
    	var stName=json[0]["stName"];
    	var mType=json[0]["mtype"];
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
                pName: '',
                idParts:'',
                mType:m_type,
                stName:st_name
            }
        });
    });



 $getTableData.click(function() {
	 var ids =JSON.stringify($table.bootstrapTable('getSelections'));
	 console.log({ids});
	 	$.ajax({
			type:"post",
			url:"./main_machinepartsUpdateSend",
			data:ids,	
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
            value: value        //cell值
        });
    }
}
