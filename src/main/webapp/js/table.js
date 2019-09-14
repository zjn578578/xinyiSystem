function userOperationRecordTableInit(){
    json=[
    {"machine_id":10000000001,"machine_type":"纺织机","responsible":"aa","maintaining_state":"良好"},
    {"machine_id":10000000002,"machine_type":"纺织机","responsible":"aa","maintaining_state":"良好"},
    {"machine_id":10000000003,"machine_type":"纺织机","responsible":"aa","maintaining_state":"良好"},
    {"machine_id":10000000004,"machine_type":"纺织机","responsible":"aa","maintaining_state":"良好"},
    {"machine_id":10000000005,"machine_type":"纺织机","responsible":"aa","maintaining_state":"良好"},
    {"machine_id":10000000006,"machine_type":"纺织机","responsible":"aa","maintaining_state":"良好"},
    {"machine_id":10000000007,"machine_type":"纺织机","responsible":"aa","maintaining_state":"良好"},
    {"machine_id":10000000008,"machine_type":"纺织机","responsible":"aa","maintaining_state":"良好"},
    {"machine_id":10000000009,"machine_type":"纺织机","responsible":"aa","maintaining_state":"良好"}
]
var first=true;
console.log('aaa');
    $('#userOperationRecordTable').bootstrapTable({
      columns:[{
        field : 'machine_id',
        title : '纺机ID'
      },{
        field : 'machine_type',
        title : '纺机类型'
      },{
        field : 'responsible',
        title : '责任人'
      },{
        field : 'maintaining_state',
        title : '维护状态'
      }],
      data:json,
      sortable: false,   
      pageList : [ 5,10,20],
      pageSize : 10,
      sidePagination: "client",  
      clickToSelect : true,
      pagination : true,
    });

    $('#search_button').click(function(event) {
      var machine_id=$('#search_input_type').val();
      /* Act on the event */
      console.log(machine_id);
      var data=[];
      for(var i=0;i<json.length;i++){
        if(json[i]["machine_id"]==machine_id){
          data.push(json[i]);
          break;
        }
      }

      console.log(data);
     $('#userOperationRecordTable').bootstrapTable('load',data);
     var json1=[
      {"fault_time":"2019-7-5","fault_ID":1000000001,"fault_type":"门富士定型机不开机","fault_special":"当出现无法移动到下一转盘位置时，在缸杯转盘下面有两组传感器，其中，SETP组传感器被污染（露染料）或有灰尘或其它杂物挡信，用压缩空气吹去灰尘，呢要时拆下来清理。","Maintenance_personnel":"bggzs"},
      {"fault_time":"2019-7-5","fault_ID":1000000001,"fault_type":"门富士定型机不开机","fault_special":"当出现无法移动到下一转盘位置时，在缸杯转盘下面有两组传感器，其中，SETP组传感器被污染（露染料）或有灰尘或其它杂物挡信，用压缩空气吹去灰尘，呢要时拆下来清理。","Maintenance_personnel":"bggzs"},
      {"fault_time":"2019-7-5","fault_ID":1000000001,"fault_type":"门富士定型机不开机","fault_special":"当出现无法移动到下一转盘位置时，在缸杯转盘下面有两组传感器，其中，SETP组传感器被污染（露染料）或有灰尘或其它杂物挡信，用压缩空气吹去灰尘，呢要时拆下来清理。","Maintenance_personnel":"bggzs"},
      {"fault_time":"2019-7-5","fault_ID":1000000001,"fault_type":"门富士定型机不开机","fault_special":"当出现无法移动到下一转盘位置时，在缸杯转盘下面有两组传感器，其中，SETP组传感器被污染（露染料）或有灰尘或其它杂物挡信，用压缩空气吹去灰尘，呢要时拆下来清理。","Maintenance_personnel":"bggzs"},
      {"fault_time":"2019-7-5","fault_ID":1000000001,"fault_type":"门富士定型机不开机","fault_special":"当出现无法移动到下一转盘位置时，在缸杯转盘下面有两组传感器，其中，SETP组传感器被污染（露染料）或有灰尘或其它杂物挡信，用压缩空气吹去灰尘，呢要时拆下来清理。","Maintenance_personnel":"bggzs"},
      {"fault_time":"2019-7-5","fault_ID":1000000001,"fault_type":"门富士定型机不开机","fault_special":"当出现无法移动到下一转盘位置时，在缸杯转盘下面有两组传感器，其中，SETP组传感器被污染（露染料）或有灰尘或其它杂物挡信，用压缩空气吹去灰尘，呢要时拆下来清理。","Maintenance_personnel":"bggzs"},
      {"fault_time":"2019-7-5","fault_ID":1000000001,"fault_type":"门富士定型机不开机","fault_special":"当出现无法移动到下一转盘位置时，在缸杯转盘下面有两组传感器，其中，SETP组传感器被污染（露染料）或有灰尘或其它杂物挡信，用压缩空气吹去灰尘，呢要时拆下来清理。","Maintenance_personnel":"bggzs"}
     ]
      var json2=[
      {"fault_time":"2019-7-5","fault_ID":1000000001,"fault_type":"门富士定型机不开机","fault_special":"当出现无法移动到下一转盘位置时，在缸杯转盘下面有两组传感器，其中，SETP组传感器被污染（露染料）或有灰尘或其它杂物挡信，用压缩空气吹去灰尘，呢要时拆下来清理。","Maintenance_personnel":"bggzs"}
     ]
      if(first==true){
         $('#userOperationRecordTable1').bootstrapTable({
       columns:[{
        field : 'fault_time',
        title : '故障时间'
      },{
        field : 'fault_ID',
        title : '故障编号'
      },{
        field : 'fault_type',
        title : '故障类型'
      },{
        field : 'fault_special',
        title : '具体故障事件'
      },{
        field : 'Maintenance_personnel',
        title : '维修人员'
      }],
      data:json1,
      sortable: false,   
      pageList : [ 5,10,20],
      pageSize : 10,
      sidePagination: "client",  
      clickToSelect : true,
      pagination : true,
     });
         first=false;
      }else if (first==false) {
        $('#userOperationRecordTable1').bootstrapTable('load',json2);
      }
    });
    
  }











//      ┏┛ ┻━━━━━┛ ┻┓
//      ┃　　　　　　 ┃
//      ┃　　　━　　　┃
//      ┃　┳┛　  ┗┳　┃
//      ┃　　　　　　 ┃
//      ┃　　　┻　　　┃
//      ┃　　　　　　 ┃
//      ┗━┓　　　┏━━━┛
//        ┃　　　┃   神兽保佑
//        ┃　　　┃   代码无BUG！
//        ┃　　　┗━━━━━━━━━┓
//        ┃　　　　　　　    ┣┓
//        ┃　　　　         ┏┛
//        ┗━┓ ┓ ┏━━━┳ ┓ ┏━┛
//          ┃ ┫ ┫   ┃ ┫ ┫
//          ┗━┻━┛   ┗━┻━┛
  