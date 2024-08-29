
import React from 'react';
import './DataTable.css';

function DataTable() {
  const requests = [
    { id: '#3066', name: 'Olivia Rhye', email: 'olivia@gmail.com', service: 'SMO', hospital: 'Squire Trauma Hospital', status: 'Open' },
    { id: '#3065', name: 'Phoenix Baker', email: '@phoenix', service: 'Tele-medicine', hospital: 'Trauma Hospital', status: 'Closed' },
    { id: '#3064', name: 'Lana Steiner', email: '@lana', service: 'Doctor appointment', hospital: 'Squire Trauma Hospital', status: 'Open' },
    { id: '#3063', name: 'Demi Wilkinson', email: '@demi', service: 'Airport pick-up', hospital: 'Trauma Hospital', status: 'Open' },
  ];

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Patient Name</th>
            <th>Service Type</th>
            <th>Hospital Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.id}</td>
              <td>{request.name}</td>
              <td>{request.service}</td>
              <td>{request.hospital}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
