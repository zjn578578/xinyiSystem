function Initialize() {
	console.log("页面初始化");
    $('#special_fault_handling').click(function (e) { 
    	let fault_type=	document.getElementById('fault_type').value;
    	let fault_msg= document.getElementById('fault_msg').value;
    	if(fault_type=="" || fault_msg==""){
    		alert("提交内容不能为空");
    		return;
    	}

        $.ajax({
            type: "post",
            url: "./updatefaultmessage.do",
            data: {
                type:fault_type,
                message:fault_msg
            },
            success: function (response) {
            	
                console.log({response});
                alert(response);
                $("#add_photo").removeAttr("disabled");
            }
        });
    });

    $('#add_photo').click(function (e) { 
        $('#update_photo').removeAttr('disabled');
        $("#fault_type").attr("disabled","disabled");
        $("#fault_msg").attr("disabled","disabled");
        
        
        let fault_type=$('#fault_type').val();
        let fault_msg=$('#fault_msg').val();
        $.ajax({
            type: "post",
            url: "./findfaultidbytype.do",
            data: {
                type:fault_type,
                message:fault_msg
            },
            success: function (response) {
               console.log({response});
               document.getElementById('photo').innerHTML=`<input type="file" name="inputBox" id="inputBox">`
                
            }
        });
        
    });

    $('#update_photo').click(function (e) { 
    	var formdata=new FormData();
		formdata.append('inputBox',$('#inputBox').get(0).files[0]);
		 $.ajax({
             async: false,
             type: 'POST',
             url: "/specialimageupload.do",
             dataType: 'json',
             data: formdata,
             contentType:false,//ajax上传图片需要添加
             processData:false,//ajax上传图片需要添加
             success: function (data) {
                 if(data.hasOwnProperty("relativePath")){
                     $("#showImage").html("<img src='"+data.relativePath+"'/>");
                 }
                 else {
                     $("#showImage").html("上传失败");
                 }
                 alert(data.result_msg);
             },
             error: function (e) {
                 alert("请先添加图片");
             }
         });
  
    	
    });
  }

