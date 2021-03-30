export const showMessage = (req,res) => {
    res.status(200).send(`Your message : ${req.params.message}`);
};
