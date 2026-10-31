const dashboardService = require('../services/dashboardService');

async function getDashboard(req,res) {
    const stats = await dashboardService.getStats();
    res.json(stats);
}

module.exports = { getDashboard};