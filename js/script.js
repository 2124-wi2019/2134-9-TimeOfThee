$(document).ready(function(){
    $('#holder').hide();
    $('#get-employees').fadeIn();
    $('#get-employees').click(function(){
        $(this).fadeIn(function(){
            $.ajax({
                url:'https://www.mccinfo.net/epsample/employees',
            }).done(onAjaxComplete);
        });
    });
    function onAjaxComplete(employees){
        employees = $.parseJSON(employees);
        let s ="";
        if(Array.isArray(employees)){
            for(let i=0; i<employees.length; i++){
                s+="<h3>"+employees[i].first_name+" "+employees[i].last_name+"</h3>";
                s+="<div>";
                s+="<img src='"+employees[i].image_filename+"' alt='employee image'/></p>";
                s+="<button class='get-info' id='>"+employees[i].id+"'>More Info </button>";
                s+="</div>";
                $('#holder').html(s);
                $('#loader').fadeOut(function(){
                    $('#holder').accordion({
                        minHeight:300,
                        heightStyle:"content"
                    });
                    $('.get-info').click(function(e){
                        console.log(this.id);
                        let id=this.id;
                        e.stopImmediatePropagation();
                        $('#holder').fadeOut();
                        $('#loader').fadeIn(function(){
                            $ajax({
                                url:'https://www.mccinfo.net/epsample/employees/'+id,
                            }).done(showEmployeeInfo);
                        });
                    });
                    function showEmployeeInfo(data){
                        parseData = $.parseJSON(data);
                        console.log(parseData);
                        let name=parseData.first_name+" "+parseData.last_name;
                        $('#dialog').attr('title',name);
                        let s="";
                        s+="<img src='"+parseData.image_filename+"'/>";
                        s+="<p>Hire Date: "+parseData.hire_date+"</p>";
                        s+="<p>Salary :"+accounting.formatMoney(parseData.annual_salary)+"</p>";
                        s+="<p>Department: "+parseData.department.name+"</p>";
                        $('#dialog').html(s);
                        $('#loader').fadeOut();
                        $('#dialog').dialog({
                            close:function(){
                                console.log('closing');
                                $('#holder').fadeIn(function(){
                                    $('#dialog').html('');
                                });
                            }
                        });
                    }
                    $('#holder').fadeIn();
                });
            }
        }else{
            s+="<p>Error - unexpected response from the server. Expected Array, received something else! Oof</p>"
        }
    }
});