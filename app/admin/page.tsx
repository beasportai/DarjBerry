"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface DashboardData {
  users: Array<{
    phoneNumber: string;
    name?: string;
    state: string;
    location?: string;
    landSize?: number;
    leadScore: number;
    lastInteraction: string;
  }>;
  analytics: {
    totalUsers: number;
    conversationRate: number;
    locationShared: number;
    proposalsGenerated: number;
    averageResponse: number;
  };
  investments: Array<{
    phoneNumber: string;
    acres: number;
    totalCost: number;
    status: string;
    proposalSentAt: string;
  }>;
  messages: Array<{
    phoneNumber: string;
    messageType: string;
    content: string;
    timestamp: string;
  }>;
}

const AdminDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const dashboardData = await response.json();
      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load dashboard data</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Prepare chart data
  const userStateData = data.users.reduce((acc: Record<string, number>, user) => {
    acc[user.state] = (acc[user.state] || 0) + 1;
    return acc;
  }, {});

  const stateChartData = Object.entries(userStateData).map(([state, count]) => ({
    state,
    count,
  }));

  const conversionFunnelData = [
    { stage: 'Started Chat', users: data.analytics.totalUsers },
    { stage: 'Selected Investment', users: Math.floor(data.analytics.totalUsers * 0.6) },
    { stage: 'Shared Location', users: data.analytics.locationShared },
    { stage: 'Got Proposal', users: data.analytics.proposalsGenerated },
    { stage: 'Site Visit', users: Math.floor(data.analytics.proposalsGenerated * 0.3) },
  ];

  const investmentStatusData = data.investments.reduce((acc: Record<string, number>, inv) => {
    acc[inv.status] = (acc[inv.status] || 0) + 1;
    return acc;
  }, {});

  const statusPieData = Object.entries(investmentStatusData).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getStateColor = (state: string) => {
    const colors: { [key: string]: string } = {
      'NEW': 'bg-gray-100 text-gray-800',
      'SELECTING_SERVICE': 'bg-blue-100 text-blue-800',
      'LAND_DETAILS': 'bg-yellow-100 text-yellow-800',
      'LOCATION_SHARED': 'bg-green-100 text-green-800',
      'PROPOSAL_REQUESTED': 'bg-purple-100 text-purple-800',
      'FOLLOW_UP': 'bg-orange-100 text-orange-800',
    };
    return colors[state] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Darjberry Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor WhatsApp leads and track investment conversions
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Active conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.analytics.conversationRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Leads to proposals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Proposals Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.analytics.proposalsGenerated}</div>
            <p className="text-xs text-muted-foreground">Investment proposals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.analytics.averageResponse}min</div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Users</CardTitle>
              <CardDescription>All users who have interacted with the bot</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phone</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Land Size</TableHead>
                    <TableHead>Lead Score</TableHead>
                    <TableHead>Last Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.users.map((user) => (
                    <TableRow key={user.phoneNumber}>
                      <TableCell className="font-medium">{user.phoneNumber}</TableCell>
                      <TableCell>{user.name || '-'}</TableCell>
                      <TableCell>
                        <Badge className={getStateColor(user.state)}>
                          {user.state.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.location || '-'}</TableCell>
                      <TableCell>{user.landSize ? `${user.landSize} acres` : '-'}</TableCell>
                      <TableCell>
                        <Badge variant={user.leadScore > 70 ? 'default' : user.leadScore > 40 ? 'secondary' : 'outline'}>
                          {user.leadScore}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(user.lastInteraction).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User States Distribution</CardTitle>
                  <CardDescription>Current state of all users in the flow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stateChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="state" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>User progression through the investment flow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={conversionFunnelData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="stage" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Investment Status Distribution</CardTitle>
                <CardDescription>Status of all investment proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Investments Tab */}
        <TabsContent value="investments">
          <Card>
            <CardHeader>
              <CardTitle>Investment Proposals</CardTitle>
              <CardDescription>All generated investment proposals and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phone</TableHead>
                    <TableHead>Acres</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.investments.map((investment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{investment.phoneNumber}</TableCell>
                      <TableCell>{investment.acres}</TableCell>
                      <TableCell>{formatCurrency(investment.totalCost)}</TableCell>
                      <TableCell>
                        <Badge variant={
                          investment.status === 'ACCEPTED' ? 'default' :
                          investment.status === 'PROPOSED' ? 'secondary' : 'outline'
                        }>
                          {investment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(investment.proposalSentAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <button className="text-blue-600 hover:underline">Follow Up</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Latest WhatsApp conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {data.messages.slice(0, 50).map((message, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    message.messageType === 'SENT' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'
                  }`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium">{message.phoneNumber}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    <Badge variant={message.messageType === 'SENT' ? 'default' : 'secondary'}>
                      {message.messageType}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Darjeeling</span>
                      <Badge>12 leads</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Siliguri</span>
                      <Badge>8 leads</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Jalpaiguri</span>
                      <Badge>6 leads</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Drop-off Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>After land details request</span>
                      <Badge variant="outline">35%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Location sharing</span>
                      <Badge variant="outline">25%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Investment calculation</span>
                      <Badge variant="outline">15%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertTitle>Action Items</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Follow up with 8 users who shared location but didn't proceed</li>
                      <li>Create simplified flow for land size collection</li>
                      <li>Add more interactive elements for location sharing</li>
                      <li>Schedule calls with high-score leads</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;