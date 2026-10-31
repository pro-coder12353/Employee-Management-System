const dashboardRepository = require('../repositories/dashboardRepository');

async function getStats() {
    const totalDepartments = await dashboardRepository.countDepartments();
    const totalEmployees = await dashboardRepository.countEmployees();
    const activeEmployees =  await dashboardRepository.countActiveEmployees();

    return { totalDepartments,totalEmployees,activeEmployees };
}

module.exports = {getStats};