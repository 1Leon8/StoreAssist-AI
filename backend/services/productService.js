const pool = require("../db/database");

const getProductSearch = async (brand, material, size, product, product_family) => {

    const conditions = [];

    const values = [];

    if (brand) {
        conditions.push(`brand ILIKE $${values.length + 1}`);
        values.push(brand);
    }

    if (material) {
        conditions.push(`material ILIKE $${values.length + 1}`);
        values.push(material);
    }

    if (size) {
        conditions.push(`size ILIKE $${values.length + 1}`);
        values.push(size);
    }

    if (product) {
        conditions.push(`product ILIKE $${values.length + 1}`);
        values.push(product);
    }

    if (product_family) {
        conditions.push(`product_family ILIKE $${values.length + 1}`);
        values.push(product_family);
    }

    // Build the SQL query using the conditions we collected
    const query = `SELECT * FROM products WHERE ${conditions.join(" AND ")}`;

    // Execute the query and return the result to the controller
    const result = await pool.query(query, values);

    return result;
};

const getRecommendationCandidates = async (
    referenceProduct,
    searchCriteria
    ) => {

        let result;

        if (referenceProduct) {

            result = await pool.query(
                `SELECT *
                FROM products
                WHERE sku <> $1
                AND (
                    brand ILIKE $2
                    OR material ILIKE $3
                    OR product_family ILIKE $4
                )`,
                [
                    referenceProduct.sku,
                    referenceProduct.brand,
                    referenceProduct.material,
                    referenceProduct.product_family
                ]
            );

        } else {

            result = await pool.query(
                `SELECT *
                FROM products
                WHERE
                    brand ILIKE $1
                    OR material ILIKE $2
                    OR size ILIKE $3
                    OR product ILIKE $4
                    OR product_family ILIKE $5`,
                [
                    searchCriteria.brand,
                    searchCriteria.material,
                    searchCriteria.size,
                    searchCriteria.product,
                    searchCriteria.product_family
                ]
            );
        }

        return result.rows;
    };


const getRecommendations = (referenceProduct, candidates, searchCriteria) => {

    const target = referenceProduct || searchCriteria;

    const recommendations = candidates.map((candidate) => {

        let score = 0;

        if (candidate.product === target.product){
            score += 4;
        }

        if (candidate.brand === target.brand){
            score += 3;
        }

        if (candidate.size === target.size){
            score += 2;
        }

        if (candidate.material === target.material){
            score += 2;
        }

        if (candidate.product_family === target.product_family){
            score += 1;
        }
        return {
            ...candidate,
            score
        };

    });

    recommendations.sort((a,b) => b.score - a.score);
    
    return recommendations
};

const recommendProducts = async (referenceProduct, searchCriteria) => {

    const candidates = await getRecommendationCandidates(referenceProduct,searchCriteria);

    const recommendations = getRecommendations(
        referenceProduct,
        candidates,
        searchCriteria
    );

    return recommendations;
};



module.exports = { getProductSearch, 
    getRecommendationCandidates, 
    getRecommendations,
    recommendProducts};