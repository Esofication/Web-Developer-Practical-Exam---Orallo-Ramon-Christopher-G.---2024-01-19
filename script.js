function submitForm(event) {

    event.preventDefault(); 

    const plateNo = document.getElementById('plateNo').value;
    const currentColor = document.getElementById('currentColor').value;
    const targetColor = document.getElementById('targetColor').value;

    const paintJobsInProgressTable = document.getElementById('paintJobsTableWithAction').getElementsByTagName('tbody')[0];
    const numRowsInProgress = paintJobsInProgressTable.getElementsByTagName('tr').length;

    const newRow = document.createElement('tr');
    const columns = [plateNo, currentColor, targetColor, 'Mark as Completed'];
    if (numRowsInProgress < 5) {
        columns.forEach((data, index) => {
            const cell = document.createElement('td');

            if (index === columns.length - 1) {
                cell.classList.add('complete-action');
            }

            cell.textContent = data;
            newRow.appendChild(cell);
        });
        paintJobsInProgressTable.appendChild(newRow);
    } else {
        // Add to "Paint Queue" table
        const paintQueueTable = document.getElementById('paintJobsTableWithoutAction').getElementsByTagName('tbody')[0];
        columns.slice(0, -1).forEach((data) => {
            const cell = document.createElement('td');
            cell.textContent = data;
            newRow.appendChild(cell);
        });
        paintQueueTable.appendChild(newRow);
    }

    document.getElementById('plateNo').value = '';
    document.getElementById('currentColor').value = '';
    document.getElementById('targetColor').value = '';
}

function updatePaintJobsTable() {
    fetch('paintJobs.json') // Replace with your JSON file or endpoint
        .then(response => response.json())
        .then(data => {
            updateTable('paintJobsTableWithAction', data);
        })
        .catch(error => console.error('Error fetching paint jobs:', error));
}

function updatePaintQueueTable() {
    fetch('paintQueue.json') // Replace with your JSON file or endpoint
        .then(response => response.json())
        .then(data => {
            updateTable('paintJobsTableWithoutAction', data);
        })
        .catch(error => console.error('Error fetching paint queue:', error));
}

setInterval(updatePaintJobsTable, 5000);
setInterval(updatePaintQueueTable, 5000);

function updateTable(tableId, data) {
    const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear the existing table content
    data.forEach(rowData => {
        const newRow = document.createElement('tr');
        rowData.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            newRow.appendChild(cell);
        });
        tableBody.appendChild(newRow);
    });
}


function updateImage() {
    const targetColor = document.getElementById('targetColor').value;
    const imageSrc = targetColor ? `Images/${targetColor}.jpg` : 'Images/AutoPaintExam.jpg';
    document.getElementById('carImage').src = imageSrc;
}

// Event listener for the targetColor select element
document.getElementById('targetColor').addEventListener('change', updateImage);
