function Initialize () {
    var json=
    [
    {"machine_place":"1号区域","machine_type":"纺织机1"},
    {"machine_place":"1号区域","machine_type":"纺织机2"},
    {"machine_place":"1号区域","machine_type":"纺织机3"},
    {"machine_place":"1号区域","machine_type":"纺织机4"},
    {"machine_place":"1号区域","machine_type":"纺织机5"},
    {"machine_place":"2号区域","machine_type":"纺织机6"},
    {"machine_place":"2号区域","machine_type":"纺织机7"},
    {"machine_place":"2号区域","machine_type":"纺织机8"}
    ]    
   $('#machine_place').change(function(event) {
       /* Act on the event */
       var machine_place=$('#machine_place').val();
       $("#machine_type").find("option:not(:first)").remove();
        change_machine_type(machine_place,json);
   });

}
function change_machine_type(place,json){
    
    for(var i=0;i<json.length;i++){
        var machine_place=json[i]["machine_place"];
        if(machine_place==place){
            var temp=json[i]["machine_type"];
            $("#machine_type").append(new Option(temp,temp));
            $('#machine_type').selectpicker('refresh');
        }
    }
}