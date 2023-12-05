const express = require("express");
const router = express.Router();
const CoverageLink = require('../../models/coverageLink');

router.get('/all/links', async (req, res) => {

  try {
    const coverageLinks = await CoverageLink.findAll();
    res.json(coverageLinks);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/add/link', async (req, res) => {
  const { event_id, coverage_type, coverage_link } = req.body;

  try {
    const newCoverageLink = await CoverageLink.create({
      event_id,
      coverage_type,
      coverage_link,
    });

    res.status(200).json({ error: 'Link uploaded successfully!' });
    res.json(newCoverageLink);
    

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:event_id', async (req, res) => {
    const { event_id } = req.params;
    const { coverage_link } = req.body;
  
    const coverage_type = req.query.coverage_type

    try {
      const coverageLink = await CoverageLink.findOne({
        where: {
          coverage_type ,
          event_id,
        },
      });
  
      if (!coverageLink) {
        return res.status(404).json({ error: 'Coverage link not found for this event and id' });
      }
      
      // Update the coverage_link for the specified coverage link
      coverageLink.coverage_link = coverage_link;
      res.status(200).json({ error: 'Link updated successfully!' });
      await coverageLink.save();
  
      res.json(coverageLink);
    } catch (error) {

      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;