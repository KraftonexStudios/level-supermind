import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, MessageCircle } from "lucide-react";
import { Activity, TrendingUp, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  processEngagementByType,
  processReachData,
  processEngagementRate,
} from "../lib/utils";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { mockData } from "@/data/mock-data";
import { PostTypeDropdown } from "./post-type-dropdown";
import Chart from "react-apexcharts";
import "../App.css";
import { Chatbot } from "./Chatbot";

type PostType = "All" | "Carousel" | "Reels" | "Static Image";

const MetricCard = ({
  title,
  value,
  icon,
  className,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  className: string;
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          {icon}
          <div className="text-4xl font-bold text-white">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function SocialMediaDashboard() {
  const [selectedPostType, setSelectedPostType] = useState<PostType>("All");
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const filteredData =
    selectedPostType === "All"
      ? mockData
      : mockData.filter((post) => post.type === selectedPostType);

  const engagementByType = processEngagementByType(filteredData);
  const reachData = processReachData(filteredData);
  const engagementRateData = processEngagementRate(filteredData);

  const downloadData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(filteredData[0]).join(",") +
      "\n" +
      filteredData.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "social_media_analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const barChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "category",
      categories: engagementByType.map((item) => item.name),
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    theme: {
      palette: "palette2",
    },
  };

  const barChartSeries = [
    {
      name: "Likes",
      data: engagementByType.map((item) => item.likes),
    },
    {
      name: "Shares",
      data: engagementByType.map((item) => item.shares),
    },
    {
      name: "Comments",
      data: engagementByType.map((item) => item.comments),
    },
  ];

  const areaChartOptions = {
    chart: {
      height: 350,
      type: "area",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: reachData.map((item) => item.name),
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    theme: {
      palette: "palette3",
    },
  };

  const areaChartSeries = [
    {
      name: "Reach",
      data: reachData.map((item) => item.value),
    },
  ];

  const pieChartOptions = {
    chart: {
      width: 380,
      type: "pie",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    labels: engagementRateData.map((item) => item.name),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    theme: {
      palette: "palette4",
    },
  };

  const pieChartSeries = engagementRateData.map((item) => item.value);

  const generateInsights = () => {
    // This is a placeholder. In a real application, this would be generated by an AI model.
    return `
      Based on the current data for ${
        selectedPostType === "All" ? "all post types" : selectedPostType
      }:
      ❋ The average engagement rate is ${(
        engagementRateData.reduce((sum, item) => sum + item.value, 0) /
        engagementRateData.length
      ).toFixed(2)}%.
      ❋ ${
        engagementByType[0]?.name || "The selected post type"
      } has the highest average likes at ${engagementByType[0]?.likes || 0}.
      ❋ The reach trend shows ${
        reachData[reachData.length - 1].value > reachData[0].value
          ? "an increasing"
          : "a decreasing"
      } pattern.
    `;
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a placeholder. In a real application, this would be processed by an AI model.
    setChatResponse(
      `Here's some information about ${chatInput}: [AI-generated response would go here]`
    );
    setChatInput("");
  };

  return (
    <div className="min-h-screen pt-[20vh] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-heading-color text-4xl font-bold mb-4 md:mb-0">
            Social Media Analytics
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <PostTypeDropdown
              value={selectedPostType}
              onChange={setSelectedPostType}
            />
            <Button onClick={downloadData} className="w-full h-12 sm:w-auto">
              <Download className="h-16 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="w-full h-14 justify-start mb-8 bg-slate-800">
            {["dashboard", "insights", "chatbot"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 h-12 sm:flex-none "
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="dashboard">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <MetricCard
                    title="Total Engagement"
                    value={filteredData
                      .reduce(
                        (sum, post) =>
                          sum + post.likes + post.comments + post.shares,
                        0
                      )
                      .toLocaleString()}
                    icon={<Activity className="h-6 w-6" />}
                    className="bg-gradient-to-br from-blue-400 to-blue-600"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <MetricCard
                    title="Average Reach"
                    value={Math.floor(
                      filteredData.reduce((sum, post) => sum + post.reach, 0) /
                        filteredData.length
                    ).toLocaleString()}
                    icon={<Users className="h-6 w-6" />}
                    className="bg-gradient-to-br from-green-400 to-green-600"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <MetricCard
                    title="Avg Engagement Rate"
                    value={`${(
                      filteredData.reduce(
                        (sum, post) => sum + post.engagement_rate,
                        0
                      ) / filteredData.length
                    ).toFixed(2)}%`}
                    icon={<TrendingUp className="h-6 w-6" />}
                    className="bg-gradient-to-br from-orange-400 to-orange-600"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        Engagement by Post Type
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Chart
                        options={barChartOptions}
                        series={barChartSeries}
                        type="bar"
                        height={350}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        Reach Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Chart
                        options={areaChartOptions}
                        series={areaChartSeries}
                        type="area"
                        height={350}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>


{/* two flex graphs  */}


              <div className="flex flex-col gap-10">
                {/* performance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        Recent Posts Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader className="bg-slate-700">
                            <TableRow className="h-12">
                              <TableHead>Date</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Likes</TableHead>
                              <TableHead>Shares</TableHead>
                              <TableHead>Comments</TableHead>
                              <TableHead>Engagement Rate</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredData.slice(0, 5).map((post) => (
                              <TableRow className="h-12" key={post.id}>
                                <TableCell>{post.date}</TableCell>
                                <TableCell>{post.type}</TableCell>
                                <TableCell>
                                  {post.likes.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  {post.shares.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  {post.comments.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  {post.engagement_rate.toFixed(2)}%
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                {/* rate by type */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        Engagement Rate by Type
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Chart
                        options={pieChartOptions}
                        series={pieChartSeries}
                        type="pie"
                        height={350}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>
          {/* Insights */}

          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading2-color text-3xl font-semibold">
                  Data Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line leading-8 text-gray-700 dark:text-gray-300">
                  {generateInsights()}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chatbot */}
          <TabsContent
            value="chatbot"
            className="flex items-center justify-center"
          >
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle className="text-heading2-color text-3xl font-semibold">
                  Data Chatbot
                </CardTitle>
              </CardHeader>
              <CardContent>
               <Chatbot />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
