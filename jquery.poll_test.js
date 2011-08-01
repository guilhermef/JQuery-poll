describe("Poll test", function(){
  
 var fixture ="<div id='fator-ego'>"
     fixture +="  <span class='titulo-box'>fator<span>ego</span></span>"
     fixture +="  <span class='box'>"
     fixture +="    <div class='subtitulo sombra'>O que os leitores acham:</div>"
     fixture +="      <div class='poll-results'>"
     // fixture +="    <span class='notas nota1'><span class='porcentagem'></span><span class='adjetivo'></span></span>"
     // fixture +="    <span class='notas nota2'><span class='porcentagem'></span><span class='adjetivo'></span></span>"
     // fixture +="    <span class='notas nota3'><span class='porcentagem'></span><span class='adjetivo'></span></span>"
     fixture +="      </div>"
     fixture +="    <div class='subtitulo sombra'>"
     fixture +="      O que você acha de Fabricio Lopes<span class='legenda'>(escolha até 3 características)</span>"
     fixture +="    </div>"
     fixture +="    <form>"
     fixture +="      <span class='poll-option botao-fator-ego'>Gostosa</span>"
     fixture +="      <span class='poll-option botao-fator-ego'>Ardida</span>"
     fixture +="      <span class='poll-option botao-fator-ego'>Tensa</span>"
     fixture +="      <span class='poll-option botao-fator-ego'>Joiada</span>"
     fixture +="      <span class='poll-option botao-fator-ego'>Mansa</span>"
     fixture +="      <span class='poll-option botao-fator-ego'>Filha</span>"
     fixture +="      <fieldset class='votes-container'></fieldset>"
     fixture +="      <button id='submit-vote' type='button' value='confirmar'>"
     fixture +="    </form>"
     fixture +="  </span>"
     fixture +="</div>"
  
  
  
  
  beforeEach(function () {
    $('body').append(fixture);
  });
  
  afterEach(function () {
    $('#fator-ego').remove();
  });
  
    it("Deve adicionar a classe checked ao clicar", function(){
      $("#fator-ego").JQPoll();
   $(".poll-option:eq(0)").trigger("click");
   $(".poll-option:eq(2)").trigger("click");
   $(".poll-option:eq(4)").trigger("click");
  
    expect($(".poll-option:eq(0)").hasClass("checked")).toBeTruthy();
    expect($(".poll-option:eq(2)").hasClass("checked")).toBeTruthy();
    expect($(".poll-option:eq(4)").hasClass("checked")).toBeTruthy();
  });
  
  it("Deve remover a classe checked ao clicar a segunda vez", function(){
    $("#fator-ego").JQPoll();
   $(".poll-option:eq(0)").trigger("click");
   $(".poll-option:eq(2)").trigger("click");
   $(".poll-option:eq(4)").trigger("click");
   $(".poll-option:eq(2)").trigger("click");
  
    expect($(".poll-option:eq(0)").hasClass("checked")).toBeTruthy();
    expect($(".poll-option:eq(2)").hasClass("checked")).toBeFalsy();
    expect($(".poll-option:eq(4)").hasClass("checked")).toBeTruthy();
  });
  
  it("Não posso marcar mais que 3 elementos", function(){
    $("#fator-ego").JQPoll();
   $(".poll-option:eq(0)").trigger("click");
   $(".poll-option:eq(1)").trigger("click");
   $(".poll-option:eq(2)").trigger("click");
   $(".poll-option:eq(4)").trigger("click");
  
    expect($(".poll-option:eq(0)").hasClass("checked")).toBeTruthy();
    expect($(".poll-option:eq(1)").hasClass("checked")).toBeTruthy();
    expect($(".poll-option:eq(2)").hasClass("checked")).toBeTruthy();
    expect($(".poll-option:eq(4)").hasClass("checked")).toBeFalsy();
  });
  
  it("Só posso marcar mais elementos quando desmarcar anteriores", function(){
    $("#fator-ego").JQPoll();
   $(".poll-option:eq(0)").trigger("click");
   $(".poll-option:eq(0)").trigger("click");
   $(".poll-option:eq(1)").trigger("click");
   $(".poll-option:eq(1)").trigger("click");
   $(".poll-option:eq(2)").trigger("click");
   $(".poll-option:eq(4)").trigger("click");
   $(".poll-option:eq(5)").trigger("click");
  
    expect($(".poll-option:eq(0)").hasClass("checked")).toBeFalsy();
    expect($(".poll-option:eq(1)").hasClass("checked")).toBeFalsy();
    expect($(".poll-option:eq(2)").hasClass("checked")).toBeTruthy();
    expect($(".poll-option:eq(4)").hasClass("checked")).toBeTruthy();
    expect($(".poll-option:eq(5)").hasClass("checked")).toBeTruthy();
  });
   
  it("Controlo os inputs marcados", function(){
   $("#fator-ego").JQPoll({resultClass:"votes[]"});
   $(".poll-option:eq(0)").trigger("click");
   $(".poll-option:eq(1)").trigger("click");
   $(".poll-option:eq(2)").trigger("click");
   $(".poll-option:eq(2)").trigger("click");
   $(".poll-option:eq(3)").trigger("click");
   
    expect($("input[name='votes[]']:eq(0)").val()).toEqual("Gostosa");
    expect($("input[name='votes[]']:eq(1)").val()).toEqual("Ardida");
    expect($("input[name='votes[]']:eq(2)").val()).toEqual("Joiada");
  });
})