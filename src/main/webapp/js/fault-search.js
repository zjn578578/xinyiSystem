

function fault_search () {
    var msg1="主要检查启动部份电路   062/80 +D1  按下主启动按钮前，必须先按警铃，按下警铃按钮后，+D1 =062-K91时间继电器工作，7秒后要以按启动按钮，若无法启动，直接手工按动+D1=062-K30接触器，若接触器能吸合，机器能运转，说明故障出在中间电路，依次查 +F1=062-K63,+F2 =121-K34 +F2=062-K64  +D1=062-K43 +D1=062-K18  +D1=062-K90 +D1=062-K91 +D1=062-K25 +D1=062-K20 +D1=062-K41  检查所有零件的常闭触点有没有未导通的情况， 特别注意检查时间继电器有没有在运行状态，或时间继电器有故障存在，一般看指示灯就很容易分辨时间继电器有否存在故障"; 
    var msg2="经查，点火控制器无供电，供电由K08/09（以9号烘箱为例）继电器及合后供电，K08/09继电器是自吸式继电器，辅助供电电路由点火器伺服电机电电路板辅助触点，当风门没有回到位，即伺服电机没回到位，点火器无法供电，因此，点火器无供电，是因为K08/09未吸全中，出现此问题后，可以手动使伺服电机回位。 伺服电机与风门连杆的长度为10.5CM,点火针露出外面标准为4.2CM 或以上，检测探针露出外面为2.5CM 以上。";
    var msg3="当出现无法移动到下一转盘位置时，在缸杯转盘下面有两组传感器，其中，SETP组传感器被污染（露染料）或有灰尘或其它杂物挡信，用压缩空气吹去灰尘，呢要时拆下来清理。"
    var msg4="出现此种情况，一般都是差压传感器清洗阀漏水导致，此情况通常出现在升温过程中，常压下，稍许的漏水不足以影响差压传感器的计量，但当缸内压力上升时，会将有小故障的阀门稍微顶开，导致水量测量不准，生产完毕后，将差压传感器前面的冲洗阀拆下，检查阀门漏的情况，通常为有杂质导致。"
    var json=[
        {"门富士定型机不开机":msg1,"门富士定型机不点火":msg2,"滴液机转盘无法移动":msg3,"染缸升温后出现水位0或超100":msg4}    
    ]
    var array1=new Array();
    array1[0]=msg1;
    array1[1]=msg2;
    array1[2]=msg3;
    array1[3]=msg4;

    var array2=new Array();
    array2[0]="门富士定型机不开机";
    array2[1]="门富士定型机不点火";
    array2[2]="滴液机转盘无法移动";
    array2[3]="染缸升温后出现水位0或超100";
    
    $('#fault_search').click(function() {
     var array=new Array();
     array[0]=0;
     array[1]=0;
     array[2]=0;
     array[3]=0;
        
        var search=$('#exampleInputEmail1').val();
        console.log(search);
        
       var mynumber=0;
        for(var key in json[0]){
            
            var type=key;
            var details=json[0][key];
            var index=0;
            for(var i=0;i<search.length;i++){
               var number=type.indexOf(search.charAt(i));
               var number1=details.indexOf(search.charAt(i));
               if(number==-1 && number1==-1){
                break;
               }else if (number==-1 && number1!=-1) {
                   index++;
                   details=details.replace(search.charAt(i),"");
                   
               }else if (number1==-1 && number!=-1) {
                   index++;
                   type=type.replace(search.charAt(i),"");
                    
               }else if (number!=-1 && number1!=-1) {
                   index+=2;
                   details=details.replace(search.charAt(i),"");
                   type=type.replace(search.charAt(i),"");
                  
               }
               

            }
           
          console.log(index);
          array[mynumber]=index;
          mynumber++;
          index=0;

        }
        console.log(array);
        document.getElementById('massage').innerHTML=`
            <div style="padding: 30px"></div>
        `
        var max=0;
        var index=0;

        for(var i=0;i<array.length;i++){
            for(var j=0;j<array.length;j++){
                if(max<array[j]){
                    max=array[j];
                    index=j; 
                }
            }
            array[index]=0;
            if(max!=0){
                document.getElementById('massage').innerHTML+=`
                
                <div class="well">
                <h4>`+array2[index]+`</h4>
                <p>`+array1[index]+`</p>
                </div> 
                `
            }
            console.log(index);
            max=0;
            index=0;
        }
      

    });
}

//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                           O\  =  /O
//                        ____/`---'\____
//                      .'  \\|     |//  `.
//                     /  \\|||  :  |||//  \
//                    /  _||||| -:- |||||-  \
//                    |   | \\\  -  /// |   |
//                    | \_|  ''\---/''  |   |
//                    \  .-\__  `-`  ___/-. /
//                  ___`. .'  /--.--\  `. . __
//               ."" '<  `.___\_<|>_/___.'  >'"".
//              | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//              \  \ `-.   \_ __\ /__ _/   .-` /  /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                      Buddha Bless, No Bug !