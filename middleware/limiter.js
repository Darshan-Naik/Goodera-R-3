
let mapReq = {};

const limiter = (req, res, next) => {
  let id = req.connection.remoteAddress + req.url;
  if (mapReq[id]) {
    if (mapReq[id].timer) {
      if (new Date() - mapReq[id].timer > 1000 * 60) {
        const payload = {
          count: 1,
          time: new Date(),
          l_req_time: new Date(),
        };
        mapReq[id] = payload;
        req.body = mapReq[id];
        next()
        // res.status(200).json({ data: mapReq[id].count });
      } else {
        res.status(400).json({ status: "failed", message: "limit crossed" });
      }
    } else {
      if (new Date() - mapReq[id].time < 1000 * 60) {
              mapReq[id].count++;           
        mapReq[id].l_req_time = new Date();
        if (mapReq[id].count == 5) {
          mapReq[id].timer = new Date();
        }
        req.body = mapReq[id];
        next();
        //   res.status(200).json({ data: mapReq[id].count });
      } else{
          const payload = {
            count: 1,
            time: new Date(),
            l_req_time: new Date(),
          };
          mapReq[id] = payload;
          req.body = mapReq[id];
          next();
      }
    } 
  } else {
    const payload = {
      count: 1,
      time: new Date(),
      l_req_time: new Date(),
    };
    mapReq[id] = payload;
    req.body = mapReq[id];
    next();
    // res.status(200).json({ data: mapReq[id].count });
  }
};


module.exports = limiter;