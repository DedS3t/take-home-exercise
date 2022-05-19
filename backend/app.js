const express = require('express');
const { TeamMember } = require('./model');

const app = express();

app.use(express.json());

app.get('/team', async (req, res, next) => {
  const team = await TeamMember.findAll();
  return res.json(team);
});

app.post("/team", async (req, res) => {
  try{
    const { firstName, lastName,title,story,favoriteColor, photoUrl } = req.body;
    let response = await TeamMember.create({firstName, lastName, title, story, favoriteColor, photoUrl});
    return res.json({"status": true, "id": response.id});
  } catch(_) {
    return res.json({"status": false});
  }
});

app.post("/team/delete", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.id);
    await TeamMember.destroy({
      where: {
        id: req.body.id 
      }
    })
    return res.json({"status": true});
  } catch(_) {
    return res.json({"status": false});
  }
});

app.post("/team/update", async (req, res) => {
  try{
    const { firstName, lastName,title,story,favoriteColor, photoUrl } = req.body;
    await TeamMember.update({firstName, lastName, title,story,favoriteColor,photoUrl}, {
      where: {
        id: req.body.id 
      }
    })

    return res.json({"status": true});
  } catch(_) {
    return res.json({"status": true})
  }
});

module.exports = app;
