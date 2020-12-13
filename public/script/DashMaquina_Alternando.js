function showCPUSection(){
    div_memory_section.style.display = "none";
    div_disk_section.style.display = "none"; 
    div_network_section.style.display = "none";
    
    div_cpu_section.style.display = "block";
}

function showMemorySection(){
    div_cpu_section.style.display = "none";
    div_disk_section.style.display = "none";
    div_network_section.style.display = "none";

    div_memory_section.style.display = "block";
}

function showDiskSection(){
    div_cpu_section.style.display = "none";
    div_memory_section.style.display = "none";
    div_network_section.style.display = "none";

    div_disk_section.style.display = "block";
}

function showNetworkSection(){
    div_cpu_section.style.display = "none";
    div_memory_section.style.display = "none";
    div_disk_section.style.display = "none";

    div_network_section.style.display = "block";
}