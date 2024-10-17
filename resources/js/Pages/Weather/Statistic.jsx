'use client'

import Header from '@/Layouts/Header';
import React from 'react';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { Thermometer, Droplets, Wind, Sun } from 'lucide-react'

// Simulated data - replace this with actual data fetching in a real application
const generateData = () => {
  const data = []
  const now = new Date()
  for (let i = 0; i < 24; i++) {
    data.push({
      time: new Date(now.getTime() - (23 - i) * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      temperature: 20 + Math.random() * 10,
      humidity: 40 + Math.random() * 30,
      aqi: 30 + Math.random() * 50,
      lightLevel: 200 + Math.random() * 600
    })
  }
  return data
}

const calculateStats = (data, key) => {
  const values = data.map(item => item[key])
  return {
    avg: values.reduce((sum, val) => sum + val, 0) / values.length,
    min: Math.min(...values),
    max: Math.max(...values)
  }
}

function StatCard({ title, icon, unit, stats }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.avg.toFixed(1)}{unit}</div>
        <p className="text-xs text-muted-foreground">
          Min: {stats.min.toFixed(1)}{unit} | Max: {stats.max.toFixed(1)}{unit}
        </p>
      </CardContent>
    </Card>
  )
}

function Statistic({ sensor_data }) {
  const [data, setData] = useState([])

  useEffect(() => {
    // In a real application, you would fetch data from an API here
    setData(sensor_data)
  }, [])

  const tempStats = calculateStats(data, 'temperature')
  const humidityStats = calculateStats(data, 'humidity')
  const aqiStats = calculateStats(data, 'aqi')
  const lightStats = calculateStats(data, 'light_level')

  return (
    <Header title="Nhiệt độ và độ ẩm trong ngày">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Thống kê cảm biến</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Temperature" icon={<Thermometer className="h-4 w-4" />} unit="°C" stats={tempStats} />
          <StatCard title="Humidity" icon={<Droplets className="h-4 w-4" />} unit="%" stats={humidityStats} />
          <StatCard title="Air Quality Index" icon={<Wind className="h-4 w-4" />} unit="" stats={aqiStats} />
          <StatCard title="Light Level" icon={<Sun className="h-4 w-4" />} unit="lux" stats={lightStats} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng nhiệt độ và độ ẩm trong 24 giờ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
                    <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Xu hướng AQI và cường độ ánh sáng trong 24 giờ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="aqi" stroke="#ffc658" name="AQI" />
                    <Line yAxisId="right" type="monotone" dataKey="light_level" stroke="#ff7300" name="Light Level (lux)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>So sánh trung bình theo giờ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="temperature" fill="#8884d8" name="Temperature (°C)" />
                    <Bar dataKey="humidity" fill="#82ca9d" name="Humidity (%)" />
                    <Bar dataKey="aqi" fill="#ffc658" name="AQI" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Header>
  )
}

export default Statistic;
