var UserDb = require("../model/model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }

  const user = new UserDb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while creating a create operation",
      });
    });
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    UserDb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((e) => {
        res.status(500).send({ message: "Error retrieving user with id" + id });
      });
  } else {
    UserDb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((e) => {
        res.status(500).send({
          message:
            e.message || "Error occurred while retriving user information",
        });
      });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "data to update cannot be empty" });
  }
  const id = req.params.id;
  UserDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}, Maybe user not found!`,
        });
      } else {
        res.send(data);
        res.redirect("/");
      }
    })
    .catch((e) => {
      res.status(500).send({ message: `Error update user information` });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  UserDb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Maybe id is wrong" });
      } else {
        res.send({
          message: "User deleted successully",
        });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `Could not delete  user with id=` + id,
      });
    });
};
