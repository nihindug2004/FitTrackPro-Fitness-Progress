const workoutData = [
    { month: 'Jan', weightLifted: 4500, workouts: 16, progressPercentage: 10 },
    { month: 'Feb', weightLifted: 5200, workouts: 18, progressPercentage: 15 },
    { month: 'Mar', weightLifted: 5800, workouts: 20, progressPercentage: 20 },
    { month: 'Apr', weightLifted: 6300, workouts: 22, progressPercentage: 25 },
    { month: 'May', weightLifted: 6900, workouts: 24, progressPercentage: 30 }
];

const exerciseDistribution = {
    labels: ['Strength', 'Cardio', 'Flexibility', 'HIIT'],
    data: [40, 30, 20, 10]
};

const personalRecords = [
    { exercise: 'Bench Press', weight: 225, date: '2024-04-15' },
    { exercise: 'Squat', weight: 315, date: '2024-05-01' },
    { exercise: 'Deadlift', weight: 405, date: '2024-05-20' }
];


function updateSummaryCards() {
    const totalWeight = workoutData.reduce((sum, data) => sum + data.weightLifted, 0);
    const avgWorkouts = Math.round(workoutData.reduce((sum, data) => sum + data.workouts, 0) / workoutData.length);
    const progress = workoutData[workoutData.length - 1].progressPercentage;

    document.getElementById('totalWeight').textContent = `${totalWeight.toLocaleString()} lbs`;
    document.getElementById('monthlyWorkouts').textContent = avgWorkouts;
    document.getElementById('progressPercentage').textContent = `${progress}%`;
}


function createWeightChart() {
    const ctx = document.getElementById('weightChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: workoutData.map(data => data.month),
            datasets: [{
                label: 'Weight Lifted',
                data: workoutData.map(data => data.weightLifted),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}


function createExerciseChart() {
    const ctx = document.getElementById('exerciseChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: exerciseDistribution.labels,
            datasets: [{
                label: 'Exercise Types',
                data: exerciseDistribution.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}


function populatePersonalRecords() {
    const recordsBody = document.getElementById('recordsBody');
    personalRecords.forEach(record => {
        const row = recordsBody.insertRow();
        row.insertCell(0).textContent = record.exercise;
        row.insertCell(1).textContent = `${record.weight} lbs`;
        row.insertCell(2).textContent = record.date;
    });
}


function resetDashboard() {
    
    const weightChart = Chart.getChart('weightChart');
    const exerciseChart = Chart.getChart('exerciseChart');
    
    if (weightChart) weightChart.destroy();
    if (exerciseChart) exerciseChart.destroy();
    
    
    document.getElementById('recordsBody').innerHTML = '';
    
    
    initDashboard();
}


function addWorkout() {
    const newWorkout = {
        month: prompt("Enter month:"),
        weightLifted: parseInt(prompt("Enter weight lifted:")),
        workouts: parseInt(prompt("Enter number of workouts:"))
    };
    
    if (newWorkout.month && newWorkout.weightLifted && newWorkout.workouts) {
        workoutData.push(newWorkout);
        
        resetDashboard();
    }
}


function initDashboard() {
    updateSummaryCards();
    createWeightChart();
    createExerciseChart();
    populatePersonalRecords();
}


document.getElementById('resetBtn').addEventListener('click', resetDashboard);
document.getElementById('addWorkoutBtn').addEventListener('click', addWorkout);


document.addEventListener('DOMContentLoaded', initDashboard);
