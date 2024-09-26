const Pool = require('pg').Pool ;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gestioninventario',
    password: '0',
    port: 5432
});


export const getUsuarios = async ({correo, password}) => {
    let queryUsuarios = 'SELECT * FROM usuarios WHERE correo = $1 AND password = $2';
    try {
        const results = await pool.query(queryUsuarios, [correo, password]);
        if (results.rows.length > 0) {
            console.log('Consulta exitosa');
            return results.rows;
        } else {
            console.log('No se encontraron resultados');
            return null;
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        throw error;
    }
}



export const getProductos = async () => {
    let queryProductos = 'SELECT * FROM productos';
    pool
        .query(queryProductos)
        .then((results) => {
            console.log('Consulta exitosa');
            console.log(results.rows);
        })
        .catch(error => {
            console.error('Error en la consulta:', error);
        });

}
// getProductos();
// getUsuarios({correo: 'admin@gmail.com', password: 'adasdasd'});
