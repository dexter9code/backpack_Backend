exports.getOverview = (req, res) => {
  res.status(200).render("overview", { title: "Backpack" });
};
exports.getBase = (req, res) => {
  res.status(200).render("base", { title: "Backpack" });
};

exports.getLogin = (req, res) => {
  res.status(200).render("login", { title: `Login as Admin` });
};

exports.getMe = (req, res) => {
  res.status(200).render("account", { title: `Profile` });
};
