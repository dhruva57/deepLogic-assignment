const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');


const assignmentRouter = express.Router();

assignmentRouter.use(bodyParser.json());



assignmentRouter.route('/getTimeNews')
.get((req,res,next) => {
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

try {
  await page.goto('https://time.com');



  const textsArray = await page.evaluate(
    () => [...document.querySelectorAll("div.last-column > div > div > div > div > a")].map(function(elem){return {"title":elem.innerText.trim(), "link":"http://www.time.com"+elem.getAttribute("href")}})
  );

    var news = {};
    news.news = textsArray;
 
            res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(news);


}

catch(err) {
    res.statusCode = 403;
    res.end("Unable to fetch from time.com");
}

  await browser.close();
})();



});






module.exports = assignmentRouter;