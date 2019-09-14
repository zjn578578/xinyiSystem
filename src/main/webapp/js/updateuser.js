function Initialize () {
	$.ajax({
		type:"POST",
		url:"./updatePermissions.do",
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

			let msg=eval(message);
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
	        	field : 'a_name',
				title : '登入工号'
	        },
			{
				field : 'a_password',
				title : '密码'
			},	     
			{
	        	field : 'a_xingming',
				title : '姓名'
	        } ],
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
			url:"./deleteUsers",
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
			window.location.href="updateuser.html";
			
		}
		});
    });
    
    $button.click(function() {
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
                a_name: '',
                a_password: '',
                a_role: '',
                a_xingming: ''
            }
        });
    });



 $getTableData.click(function() {
 	var a =JSON.stringify($table.bootstrapTable('getSelections'));
	 	$.ajax({
			type:"post",
			url:"./updateusers",
			data:a,	
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