function AtualizarIndices(maiorTemp, menorTemp, maiorUmid, menorUmid) {
    maiorTempertura.innerHTML = maiorTemp[0]
    maiorTemperturaArea.innerHTML = maiorTemp[1]
    menorTempertura.innerHTML = menorTemp[0]
    menorTemperturaArea.innerHTML = menorTemp[1]

    maiorUmidade.innerHTML = maiorUmid[0]
    maiorUmidadeArea.innerHTML = maiorUmid[1]
    menorUmidade.innerHTML = menorUmid[0]
    menorUmidadeArea.innerHTML = menorUmid[1]

}
function AtualizarIndicesSolo(maiorTemp, menorTemp, maiorUmid, menorUmid) {
    maiorTemperturaSolo.innerHTML = maiorTemp[0]
    maiorTemperturaAreaSolo.innerHTML = maiorTemp[1]
    menorTemperturaSolo.innerHTML = menorTemp[0]
    menorTemperturaAreaSolo.innerHTML = menorTemp[1]

    maiorUmidadeSolo.innerHTML = maiorUmid[0]
    maiorUmidadeAreaSolo.innerHTML = maiorUmid[1]
    menorUmidadeSolo.innerHTML = menorUmid[0]
    menorUmidadeAreaSolo.innerHTML = menorUmid[1]
}