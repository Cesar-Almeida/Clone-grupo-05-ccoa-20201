// gerarGrafico();
// function gerarGrafico(){
// var ctx = document.getElementById('network_use_chart').getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['12:42:20', '12:42:25', '12:42:30', '12:42:35', '12:42:40', '12:42:45'],
//         datasets: [{
//             label: 'Download',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: 'rgba(54, 162, 235, 0.2)',
//             borderColor: 'rgba(54, 162, 235, 0.2)',
//             borderWidth: 1
//         },
//         {
//             label: 'Upload',
//             data: [21, 3, 5, 9, 1, 2],
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 0.2)',
//             borderWidth: 1
//         }]
//     },
//     options: {
//         responsive: true,
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });
// }
// setTimeout(() => {
//     gerarGrafico();
//     //myChart.destroy();
//   }, 5000);