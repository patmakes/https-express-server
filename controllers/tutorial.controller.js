const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    //Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Tutorial in the database
    Tutorial.create(tutorial)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
              err.message || "Some error occurred while creating the Tutorial."
          });
      });
};

// Retrieve all Tutorials from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occured while retrieving tutorials."
        });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id ;

    Tutorial.findByPk(id)
      .then(data => {
          if (data) {
              res.send(data);
          } else {
              res.status(404).send({
                  message: `Cannot find Tutorial with id=${id}`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Error retrieving Tutorial with id=" + id
          });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
      .then(num => {
          if (num == 1) {
              res.send({
                  message: "Successfully updated"
              });
          } else {
              res.send({
                  message: `Cannot update Tutorial with id=${id}. Maybe not found or empty request`
              })
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Error updating Tutoril with id=" + id
          });
      });
};

//Delete a Tutorial with the secified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
      where: { id: id }
    })
      .then(num => {
          if (num == 1) {
              res.send({
                  message: "Tutorial was deleted successfully!"
              });
          } else {
              res.send({
                  message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found.`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Could not delete Tutorial with id=" + id
          });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured while removing all tutorials."
            });
        });
};

// Find all published Tutorials ( all objects by condition)
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || " wome error occurred while retrieving tutorials."
        });
    });

};