var json=[];
var json2=[];
var FileName="导出数据";
function Initialize () {	
	$.ajax({
		type:"POST",
		url:"./recordupkeeplist",
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
			json2=msg;
			console.log({msg});
			show_tabel(msg);
		} 
	});
	// body... 
	$("td,th").addClass("text-center");
	$('#excel').click(function(e){
		JSONToExcelConvertor(json2, FileName);
	});
	$('#mchine_conditions_btn').click(function(e){
		let input_msg=$('#mchine_conditions').val();
		let mchine_conditions=$('#mchine_conditions_select').val();
		if(input_msg==""){
			alert("请先填写信息");
			return;
		}
		
		console.log({mchine_conditions});		
		search(json,mchine_conditions,input_msg);

	})
}

function show_tabel(json){
	console.log({json});
	$('#permissions_table').bootstrapTable({
		columns : [
			{
				field : 'uSendto',
				title : '分厂'
			},{
				field : 'uDepartment',
				title : '部门'
			},{
				field : 'uUid',
				title : '机器ID'
			},{
				field : 'uType',
				title : '机器类型'
			},{
				field : 'uPerson',
				title : '保养人'
			},{
				field : 'uItem',
				title : '保养条目 '
			},{
				field : 'uCycle',
				title : '保养周期'
			},{
				field : 'uRemark',
				title : '备注'
			},{
				field:'uFinishitime',
				title:'完成时间'
			}],
			showColumns: true,
			toolbar: '#toolbar',
			data: json,
			sortable: true, 
			pageList : [ 1,10,50,100,500,1000],
			pageSize : 100,
			sidePagination: "client",  
			clickToSelect : true,
			pagination : true,
	});
	
}

function search(msg,machine_conditions,input_msg){
	console.log({machine_conditions});
	console.log({input_msg});
	switch (machine_conditions) {
    case "选择分厂":
    	machine_conditions="uSendto"
        break; 
    case "选择机器类型":
    	machine_conditions="uType"
        break;
    case "选择部门":
    	machine_conditions="uDepartment"
    	break;
    case "选择保养人":
    	machine_conditions="uPerson"
    	break;
    case "选择机器ID":
    	machine_conditions="uMid"
    	break;
    case "保养条目":
    	machine_conditions="uItem"
    	break;
    default: 
    	machine_conditions="void"
} 
	console.log({machine_conditions});
	let json1=[];
	if(input_msg!="" && machine_conditions!="void"){
		for(let i=0;i<msg.length;i++){
			if(json[i][machine_conditions]==input_msg){
				json1.push(json[i]);
			}
		}
	}
	
	
	
 $('#permissions_table').bootstrapTable('load',json1);

 $("#mchine_conditions_select").selectpicker('refresh'); 	
	 
}

function JSONToExcelConvertor(JSONData, FileName) {  
    //先转化json  
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;  
    var excel = '<table>';   
    var row = "<tr>";           
    //设置表头  
    var keys = Object.keys(JSONData[0]);  
    keys.forEach(function (item) {
        row += "<td>" + item + '</td>';
    });     
    //换行  
    excel += row + "</tr>";  
    //设置数据
    for (var i = 0; i < arrData.length; i++) {  
        var row = "<tr>";  
        for (var index in arrData[i]) {  
            console.log(arrData[i][index]);
            //var value = arrData[i][index] === "." ? "" : arrData[i][index];  
            row += '<td>' + arrData[i][index] + '</td>';  
        }  
        excel += row + "</tr>";  
    }  

    excel += "</table>";  

    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";  
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';  
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';  
    excelFile += '; charset=UTF-8">';  
    excelFile += "<head>";  
    excelFile += "<!--[if gte mso 9]>";  
    excelFile += "<xml>";  
    excelFile += "<x:ExcelWorkbook>";  
    excelFile += "<x:ExcelWorksheets>";  
    excelFile += "<x:ExcelWorksheet>";  
    excelFile += "<x:Name>";  
    excelFile += "{worksheet}";  
    excelFile += "</x:Name>";  
    excelFile += "<x:WorksheetOptions>";  
    excelFile += "<x:DisplayGridlines/>";  
    excelFile += "</x:WorksheetOptions>";  
    excelFile += "</x:ExcelWorksheet>";  
    excelFile += "</x:ExcelWorksheets>";  
    excelFile += "</x:ExcelWorkbook>";  
    excelFile += "</xml>";  
    excelFile += "<![endif]-->";  
    excelFile += "</head>";  
    excelFile += "<body>";  
    excelFile += excel;  
    excelFile += "</body>";  
    excelFile += "</html>";  

    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);  

    var link = document.createElement("a");      
    link.href = uri;  

    link.style = "visibility:hidden";  
    link.download = FileName + ".xls";  

    document.body.appendChild(link);  
    link.click();  
    document.body.removeChild(link);  
}
function isJSON(str) {
            try {  
                if (typeof JSON.parse(str) == "object") {  
                return true;  
                }  
            } catch(e) {  
            }  
            return false;  
        }
