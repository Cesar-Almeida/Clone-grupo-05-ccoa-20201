function adicionar_eliminar_novos_valores(tempoLeitura){

    atualizarDisco_geral(0);
    atualizarMemoriaGeral(0)
    eliminar_disco();
    eliminar_memoria();
    eliminar_cpu(tempoLeitura)
    eliminar_componentes(1)
}
function destruir_tudo(){
    if(myChart!=undefined){
    myChart.destroy();}
    if(myChart_disk!=undefined){
        myChart_disk.destroy();}
 
    if(myChart_disk_geral!=undefined){
        myChart_disk_geral.destroy();}
 
    if(myChart_memoria!=undefined){
        myChart_memoria.destroy();}
 
    if(myChart_memoria_geral!=undefined){
        myChart_memoria_geral.destroy();}
 
 
    atualizarDisco_geral(1);
    atualizarMemoriaGeral(1);
    eliminar_componentes(0)
    
}
function plotar_tudo(){
    discoPorcentagem_geral();
    atualizarDisco_geral(1);
    atualizarMemoriaGeral(1);
}