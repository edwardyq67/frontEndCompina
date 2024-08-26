
const getmiArreglo = () => ({
    
    headers: { Authorization: `${localStorage.getItem('miArreglo')}` }
});
export default getmiArreglo;