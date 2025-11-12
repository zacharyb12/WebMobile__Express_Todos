const testController = {
    getPublic : (req,res) => {
        res.status(200);
        res.json({message: "Coucou de la route public"})
    },
    getVisitor : (req,res) => {
        res.status(200);
        res.json({message: "Coucou de la route visiteur"})
    },
    getAdmin : (req,res) => {
        res.status(200);
        res.json({message: "Coucou de la route admin"})
    },
};

export default testController;