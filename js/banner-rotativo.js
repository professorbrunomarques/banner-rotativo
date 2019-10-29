$(document).ready(function(){

    //Atribui as imagens dos itens
    $(".banner-item").each(function(index){
        var src = $(this).data("src");
        $(this).css("background-image",'url(' + src + ')');

        var idDot = $(this).index();
        var ndot = $("<input>",{
            type: "radio",
            name: "dot"
        });
        $(".banner-dots").append(ndot);

        if($(this).hasClass("atual")){
            changeDot($(this).index());
        }
    });

    //Armazena a quantidade de elementos a serem exibidos no banner
    var count = $(".banner-item").length;
    
    //Altera o marcador do slide atual
    function changeDot(id){
        $(".banner-dots input").prop("checked", false);
        $(".banner-dots input:eq("+id+")").prop("checked",true);
    }
    
    //Passa para o próximo slide
    function proximo(){
        //Pega o indice do banner que está sendo exibido atualmente    
        var idAtual = $(".atual").index();
        
        $(".banner-item").removeClass("atual");

        if((idAtual < count-1)){
            $(".banner-item:eq("+idAtual+")").fadeOut().next().fadeIn().addClass("atual");
            changeDot($(".atual").index());
        }else{
            $(".banner-item:eq("+idAtual+")").fadeOut();
            $(".banner-item:first").fadeIn().addClass("atual");
            changeDot($(".atual").index());
        }
        
    }

    //Passa para o slide anterior
    function anterior(){
        //Pega o indice do banner que está sendo exibido atualmente    
        var idAtual = $(".atual").index();       
        $(".banner-item").removeClass("atual");
        
        if(idAtual > 0){
            $(".banner-item:eq("+idAtual+")").fadeOut().prev().fadeIn().addClass("atual");
            changeDot($(".atual").index());
        }else{
            $(".banner-item:eq("+idAtual+")").fadeOut();
            $(".banner-item:last").fadeIn().addClass("atual");
            changeDot($(".atual").index());
        }
    }

    function irPara(id){
        $(".banner-item").fadeOut().removeClass("atual");
        $(".banner-item:eq("+id+")").fadeIn().addClass("atual");
        changeDot($(".atual").index());
    }
    
    
    $(".banner-container").mouseenter(function(){
        $(".banner-nav").fadeIn("fast");
    });
    $(".banner-container").mouseleave(function(){
        $(".banner-nav").fadeOut("fast");
    });
    
    $("#anterior").click(anterior);    
    $("#proximo").click(proximo);
    $(".banner-dots input").click(function(event){
        var id = $(this).index();
        $(this).prop("checked",true);
        irPara(id);        
    });
    
    setInterval(proximo, 5000);
});