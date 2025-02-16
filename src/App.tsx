import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronUp, ChevronDown, AlertCircle, Calendar, DollarSign, Users, Clock, CheckCircle, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  
  // Sample data
  const kpiData = [
    { name: 'Total Contingent Workers', value: 1250, target: 1300, status: 'below', icon: Users, change: '+12%' },
    { name: 'Total Spend ($M)', value: 15.2, target: 14.8, status: 'above', icon: DollarSign, change: '+5.4%' },
    { name: 'Average Hourly Rate', value: 52.50, target: 50.00, status: 'above', icon: Clock, change: '+2.5%' },
    { name: 'Vendor Compliance Rate', value: 92, target: 95, status: 'below', icon: CheckCircle, change: '-3%' },
    { name: 'Fill Rate', value: 88, target: 90, status: 'below', icon: BarChart2, change: '-2%' },
    { name: 'Time-to-Fill (days)', value: 28, target: 25, status: 'above', icon: Calendar, change: '+3d' }
  ];

  const vendorData = [
    { name: 'Vendor A', compliance: 95, fillRate: 92, timeToFill: 25, workers: 450 },
    { name: 'Vendor B', compliance: 88, fillRate: 85, timeToFill: 30, workers: 380 },
    { name: 'Vendor C', compliance: 93, fillRate: 89, timeToFill: 27, workers: 420 }
  ];

  const trendData = [
    { month: 'Jan', workers: 1100, spend: 13.5 },
    { month: 'Feb', workers: 1150, spend: 14.2 },
    { month: 'Mar', workers: 1200, spend: 14.8 },
    { month: 'Apr', workers: 1250, spend: 15.2 }
  ];

  const KPICard = ({ kpi }) => {
    const Icon = kpi.icon;
    const getStatusColor = (status) => {
      return status === 'above' ? 'text-red-500' : 'text-blue-500';
    };

    const getStatusIcon = (status) => {
      return status === 'above' ? 
        <ChevronUp className="inline w-4 h-4" /> : 
        <ChevronDown className="inline w-4 h-4" />;
    };

    const getChangeColor = (change) => {
      return change.startsWith('+') ? 'text-emerald-600' : 'text-red-600';
    };

    return (
      <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Icon className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">{kpi.name}</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                <span className={`text-sm font-medium ${getChangeColor(kpi.change)}`}>
                  {kpi.change}
                </span>
              </div>
            </div>
          </div>
          <div className={`flex flex-col items-end ${getStatusColor(kpi.status)}`}>
            {getStatusIcon(kpi.status)}
            <span className="text-sm mt-1">Target: {kpi.target}</span>
          </div>
        </div>
      </Card>
    );
  };

  const TimePeriodSelector = () => (
    <div className="inline-flex bg-gray-100 rounded-lg p-1">
      {['1W', '1M', '3M', '6M', '1Y'].map((period) => (
        <button
          key={period}
          onClick={() => setSelectedPeriod(period)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            selectedPeriod === period
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CMO Contingent Workforce Dashboard</h1>
              <p className="text-gray-500 mt-2">Last updated: February 15, 2025</p>
            </div>
            <TimePeriodSelector />
          </div>
        </header>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Performance</TabsTrigger>
            <TabsTrigger value="trends">Workforce Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {kpiData.map((kpi) => (
                <KPICard key={kpi.name} kpi={kpi} />
              ))}
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-gray-500" />
                  Vendor Compliance Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vendorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="compliance" 
                        fill="#4F46E5" 
                        name="Compliance (%)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    Fill Rate vs Time-to-Fill
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          type="number" 
                          dataKey="timeToFill" 
                          name="Time to Fill (days)"
                          label={{ value: 'Time to Fill (days)', position: 'bottom' }}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="fillRate" 
                          name="Fill Rate (%)"
                          label={{ value: 'Fill Rate (%)', angle: -90, position: 'left' }}
                        />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Legend />
                        <Scatter 
                          name="Vendors" 
                          data={vendorData} 
                          fill="#4F46E5"
                          shape="circle"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    Total Workers by Vendor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={vendorData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Bar 
                          dataKey="workers" 
                          fill="#82ca9d" 
                          name="Workers"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-gray-500" />
                  Workforce Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="month"
                        tick={{ fill: '#6B7280' }}
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fill: '#6B7280' }}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right"
                        tick={{ fill: '#6B7280' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Legend />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="workers" 
                        stroke="#4F46E5" 
                        name="Total Workers"
                        strokeWidth={2}
                        dot={{ strokeWidth: 2 }}
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="spend" 
                        stroke="#82ca9d" 
                        name="Total Spend ($M)"
                        strokeWidth={2}
                        dot={{ strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900">Key Insights</h3>
              <ul className="mt-3 text-sm text-blue-800 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Vendor compliance rates are below target for 2 out of 3 vendors
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Total spend is trending above target by $0.4M
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Worker headcount is growing steadily but remains below target
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;