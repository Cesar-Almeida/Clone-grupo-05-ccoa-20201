function adicionar_eliminar_novos_valores(tempoLeitura){

  
    atualizarMemoriaGeral(0)

    eliminar_memoria();
    eliminar_cpu(tempoLeitura)
    eliminar_componentes(1)
}
function destruir_tudo(){
    if(myChart!=undefined){
    myChart.destroy();}
     
    if(myChart_memoria!=undefined){
        myChart_memoria.destroy();}
 
    if(myChart_memoria_geral!=undefined){
        myChart_memoria_geral.destroy();}
 
 

    atualizarMemoriaGeral(1);
    eliminar_componentes(0)
    
}
function plotar_tudo(){
 
    atualizarMemoriaGeral(1);
}