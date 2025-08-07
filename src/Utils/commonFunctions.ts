const downloadXLS=()=>{
    const fileUrl = '/assets/sample_data.xlsx'; // path relative to public folder
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'sample.xlsx'); // triggers download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
const downloadCSV=()=>{
    downloadXLS();
}
export{
    downloadCSV,
    downloadXLS
};