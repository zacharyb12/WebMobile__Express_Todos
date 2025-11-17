import { Sequelize } from "sequelize";

export async function createDatabaseIfNotExists() {
    // Connexion sans spécifier de base de données
    const sequelize = new Sequelize(
        '',
        null,
        null,
        {
            host: process.env.DB_HOST,
            dialect: 'mssql',
            dialectOptions: {
                options: {
                    encrypt: true,
                    trustServerCertificate: true,
                    trustedConnection: true,
                    useUTC: false
                }
            },
            logging: false
        }
    );

    try {
        await sequelize.authenticate();
        
        // Vérifier si la base existe
        const [results] = await sequelize.query(
            `SELECT name FROM sys.databases WHERE name = '${process.env.DB_DATABASE}'`
        );

        if (results.length === 0) {
            // Créer la base de données
            await sequelize.query(`CREATE DATABASE [${process.env.DB_DATABASE}]`);
            console.log(`Base de données '${process.env.DB_DATABASE}' créée avec succès.`);
        } else {
            console.log(`Base de données '${process.env.DB_DATABASE}' existe déjà.`);
        }

        await sequelize.close();
    } catch (error) {
        console.error('Erreur lors de la vérification/création de la base de données:', error);
        await sequelize.close();
        throw error;
    }
}
