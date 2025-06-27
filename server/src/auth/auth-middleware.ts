export function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ isAuth: false, message: "Not Authorized!" });
  }
}

export function isAdmin(req, res, next) {}

//TOKEN FROMAT:
//Authorization: Bearer <access_token>

export function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers["authorization"];

  //get token from bearer header
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    req.token = bearer[1];
    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
}
