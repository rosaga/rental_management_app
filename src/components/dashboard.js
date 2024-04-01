import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Navigation from './navigation';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
  // Dummy data for the dashboard
  const dummyDashboardData = {
    occupiedHouses: 10,
    tenants: 25,
    totalHouses: 50,
    apartments: 15
  };
  const location = useLocation();
  const user = location.state;
  // Define chart options
  const chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Dashboard'
    },
    xAxis: {
      categories: ['Occupied Houses', 'Tenants', 'Total Houses', 'Apartments']
    },
    yAxis: {
      title: {
        text: 'Number'
      }
    },
    series: [{
      name: 'Data',
      data: [dummyDashboardData.occupiedHouses, dummyDashboardData.tenants, dummyDashboardData.totalHouses, dummyDashboardData.apartments]
    }]
  };

  console.log('Dashboard component rendered', user.user.username);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div className="dashboard-content">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
        </div>
        <div className="col-md-3">
          <Navigation />
        </div>
      </div>
      <div className="user-details">
        <p>Logged in as: {user.user.username} </p>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default Dashboard;
