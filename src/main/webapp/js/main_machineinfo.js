var json=[];
var index=[];
function Initialize () {	
	$.ajax({
		type:"POST",
		url:"./main_machineinfoSend",
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
			json=msg;			
			show_tabel(msg);
			index["m_class"]="";
			index["m_send_to"]="";
			index["m_floor"]="";
			index["m_type"]="";
			index["m_department"]="";
		} 
	});
	// body... 
	$("td,th").addClass("text-center");
		
	$('#mchine_conditions_btn').click(function(e){
		
		let input_msg=$('#mchine_conditions').val();
		if(input_msg==""){
			alert("请先填写内容");
			return;
		}
		let mchine_conditions=$('#mchine_conditions_select').val();

		console.log({mchine_conditions});		
		search(json,mchine_conditions,input_msg);

	})
}

function show_tabel(json){
	console.log({json});
	$('#permissions_table').bootstrapTable({
		columns : [
			{
	            checkbox: true
	        },
			{
				field : 'm_mid',
				title : '机器编号'
					//sortable: true
			},
			{
				field : 'm_send_to',
				title : '分厂'
			},
			{
				field : 'm_class',
				title : '机器类型'
			},
			{
				field : 'm_department',
				title : '所属部门'
			},
			{
				field : 'm_floor',
				title : '楼层'
			},
			{
				field : 'm_type',
				title : '机器名'
			} ,	
			{
				field : 'm_remark',
				title : '备注信息'
			} ,
			
			{
				field : 'operation',
				title : '编辑机器结构',
				formatter : function(value, row, index) {
					var s = '<button class="btn btn-info btn-sm edit" id="upkeep"><span align>编辑保养条目</span> </button>';
					var fun = '';
					return s;
				},
				events : {
					// 操作列中编辑按钮的动作 
/*					'click .edit' : function(e, value,row, index) {
						let machine_type=row.m_type;
						let machine_id=row.m_id;
						console.log({machine_id});
						console.log({machine_type});
						json.push(machine_type);
						console.log({json});						
						let url=`main_machinestructure.html?machine_type=${machine_type}&machine_id=${machine_id}`;
						console.log(url);
						window.location.href=url;
					},*/
					'click #upkeep':function(e, value,row, index){
						let machine_type=row.m_type;
						let machine_id=row.m_id;
						let url=`upkeep.html?machine_type=${machine_type}&machine_id=${machine_id}`;					
						window.location.href=url;
						
					}

				}
			}],
			showColumns: true,
			toolbar: '#toolbar',
			clickEdit: true,
			data: json,
			sortable: false,   
			pageList : [ 1,10,50,100,500,1000],
			pageSize : 100,
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
			url:"./main_machineinfoDeleteSend",
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
			window.location.href="main_machineinfo.html";	
		}
		});
    });
    
    $button.click(function() {
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
                m_mid: '',
                m_class: index["m_class"],
                m_send_to: index["m_send_to"],
				m_floor:index["m_floor"],
				m_type:index["m_type"],
				m_department:index["m_department"]
            }
        });
    });

 $getTableData.click(function() {
	var ids =JSON.stringify($table.bootstrapTable('getSelections'));
		console.log({ids});
	 	$.ajax({
			type:"post",
			url:"./main_machineinfoUpdateSend",
			data:ids,	
			contentType: 'application/json',
			statusCode:{
			404:function(){
				alert("404");
			},
			500:function(){
				alert("请先选择要提交的信息");
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

function search(msg,machine_conditions,input_msg){
	
	if(machine_conditions=="选择编号"){
		$("#e").attr("disabled", "disabled");
		machine_conditions='m_mid';	
	}else if(machine_conditions=="选择机器类型"){
		machine_conditions="m_class";
		$("#b").attr("disabled", "disabled");
	}else if(machine_conditions=="选择分厂"){
		machine_conditions="m_send_to";
		$("#a").attr("disabled", "disabled");
	}else if(machine_conditions=="选择楼层"){
		machine_conditions="m_floor";
		$("#d").attr("disabled", "disabled");
	}else if(machine_conditions=="选择机器名"){
		machine_conditions="m_type";
		$("#f").attr("disabled", "disabled");		
	}else if(machine_conditions=="选择部门"){
		machine_conditions="m_department";
		$("#c").attr("disabled", "disabled");
	}
	index[machine_conditions]=input_msg;
	console.log({index});
	let temp1=msg;
	let json1=[];
	for(let i=0;i<temp1.length;i++){		
		if(temp1[i][machine_conditions].indexOf(input_msg)>=0){			
			json1.push(temp1[i]);
		}
	}	
 $('#permissions_table').bootstrapTable('load',json1);

 $("#mchine_conditions_select").selectpicker('refresh'); 	
	 json=json1;
}

function createsum ( ) {
	let pre = Math.floor(Math.random()*10000);
    let time = new Date();
    let year=time.getFullYear();
    let month=time.getMonth()+1; 
    let day=time.getDate();
	let sum=pre+""+year+""+month+""+day;
	return sum;
  }