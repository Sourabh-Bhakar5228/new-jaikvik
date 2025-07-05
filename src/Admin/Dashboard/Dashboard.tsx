import React, { useState, useEffect } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Calendar,
  Download,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Award,
  Bell,
  Search,
} from "lucide-react";

interface CircleProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  delay?: number;
}

interface MiniCircleProgressProps {
  percentage: number;
  size?: number;
  color?: string;
}

interface AnimatedBarProps {
  height: number;
  color: string;
  delay: number;
  width?: number;
}

interface Stat {
  title: string;
  value: string;
  change: string;
  progress: number;
  icon: React.ReactNode;
  trend: "up" | "down";
  color: string;
  bgColor: string;
  progressColor: string;
}

interface CircleStat {
  title: string;
  value: number;
  color: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface Transaction {
  id: number;
  customer: string;
  product: string;
  amount: string;
  status: string;
  time: string;
  avatar: string;
}

interface PerformanceBar {
  id: number;
  height: number;
  date: string;
}

interface MonthlySale {
  month: string;
  currentYear: number;
  lastYear: number;
}

const Dashboard: React.FC = () => {
  const CircleProgress: React.FC<CircleProgressProps> = ({
    percentage,
    size = 120,
    strokeWidth = 8,
    color = "#3b82f6",
    delay = 0,
  }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (animatedPercentage / 100) * circumference;

    useEffect(() => {
      const timer = setTimeout(() => {
        let current = 0;
        const increment = percentage / 60;
        const animate = () => {
          current += increment;
          if (current < percentage) {
            setAnimatedPercentage(current);
            requestAnimationFrame(animate);
          } else {
            setAnimatedPercentage(percentage);
          }
        };
        animate();
      }, delay);

      return () => clearTimeout(timer);
    }, [percentage, delay]);

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgb(55, 65, 81)"
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-20"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out drop-shadow-lg"
            style={{
              filter: `drop-shadow(0 0 6px ${color}40)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {Math.round(animatedPercentage)}%
          </span>
        </div>
      </div>
    );
  };

  const MiniCircleProgress: React.FC<MiniCircleProgressProps> = ({
    percentage,
    size = 60,
    color = "#10b981",
  }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const radius = (size - 6) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (animatedPercentage / 100) * circumference;

    useEffect(() => {
      const timer = setTimeout(() => {
        let current = 0;
        const increment = percentage / 30;
        const animate = () => {
          current += increment;
          if (current < percentage) {
            setAnimatedPercentage(current);
            requestAnimationFrame(animate);
          } else {
            setAnimatedPercentage(percentage);
          }
        };
        animate();
      }, 200);

      return () => clearTimeout(timer);
    }, [percentage]);

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgb(55, 65, 81)"
            strokeWidth={6}
            fill="none"
            className="opacity-30"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 0 4px ${color}60)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-white">
            {Math.round(animatedPercentage)}%
          </span>
        </div>
      </div>
    );
  };

  const stats: Stat[] = [
    {
      title: "Total Revenue",
      value: "$124,590",
      change: "+14.2%",
      progress: 78,
      icon: <DollarSign size={20} />,
      trend: "up",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      progressColor: "#10b981",
    },
    {
      title: "Active Users",
      value: "8,549",
      change: "+8.1%",
      progress: 65,
      icon: <Users size={20} />,
      trend: "up",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      progressColor: "#3b82f6",
    },
    {
      title: "Total Orders",
      value: "2,847",
      change: "+23.5%",
      progress: 92,
      icon: <ShoppingCart size={20} />,
      trend: "up",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      progressColor: "#8b5cf6",
    },
    {
      title: "Conversion Rate",
      value: "2.84%",
      change: "-1.2%",
      progress: 45,
      icon: <Activity size={20} />,
      trend: "down",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      progressColor: "#f59e0b",
    },
  ];

  const circleStats: CircleStat[] = [
    {
      title: "Performance Score",
      value: 87,
      color: "#10b981",
      subtitle: "Excellent",
      icon: <Award size={24} className="text-emerald-400" />,
    },
    {
      title: "Goal Achievement",
      value: 73,
      color: "#3b82f6",
      subtitle: "On Track",
      icon: <Target size={24} className="text-blue-400" />,
    },
    {
      title: "System Health",
      value: 95,
      color: "#8b5cf6",
      subtitle: "Optimal",
      icon: <Zap size={24} className="text-purple-400" />,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: 1,
      customer: "Emma Watson",
      product: "Premium Subscription",
      amount: "$99.00",
      status: "completed",
      time: "2m ago",
      avatar: "EW",
    },
    {
      id: 2,
      customer: "Michael Chen",
      product: "Design Package",
      amount: "$299.00",
      status: "completed",
      time: "15m ago",
      avatar: "MC",
    },
    {
      id: 3,
      customer: "Sarah Johnson",
      product: "Consultation",
      amount: "$150.00",
      status: "pending",
      time: "1h ago",
      avatar: "SJ",
    },
    {
      id: 4,
      customer: "David Rodriguez",
      product: "Annual Plan",
      amount: "$599.00",
      status: "completed",
      time: "2h ago",
      avatar: "DR",
    },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const performanceBars: PerformanceBar[] = Array.from(
    { length: 12 },
    (_, i) => ({
      id: i,
      height: Math.floor(Math.random() * 160 + 40),
      date: new Date(2025, 0, i * 2 + 1).toLocaleDateString("en", {
        day: "numeric",
      }),
    })
  );

  const monthlySales: MonthlySale[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
  ].map((month, _) => ({
    month,
    currentYear: Math.floor(Math.random() * 120 + 40),
    lastYear: Math.floor(Math.random() * 100 + 30),
  }));

  const AnimatedBar: React.FC<AnimatedBarProps> = ({
    height,
    color,
    delay,
    width = 8,
  }) => {
    const [barHeight, setBarHeight] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setBarHeight(height);
      }, delay);

      return () => clearTimeout(timer);
    }, [height, delay]);

    return (
      <div
        className={`bg-gradient-to-t ${color} rounded-t-lg transition-all duration-800 ease-out`}
        style={{
          height: `${barHeight}px`,
          width: `${width}px`,
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black p-6">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-400 flex items-center gap-2">
              <Calendar size={16} />
              Today, June 26, 2025
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-64 text-white placeholder-gray-400 backdrop-blur-sm"
              />
            </div>
            <button className="p-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 transition-all duration-200 backdrop-blur-sm group">
              <Bell
                size={18}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards with Mini Circle Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group hover:bg-gray-800/70 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                  {stat.icon}
                </div>
                <MiniCircleProgress
                  percentage={stat.progress}
                  color={stat.progressColor}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>

                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  <span>{stat.change}</span>
                  <span className="text-xs text-gray-500 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Large Circle Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {circleStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 text-center group hover:bg-gray-800/70 animate-fade-in"
              style={{ animationDelay: `${(index + 4) * 150}ms` }}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {stat.title}
              </h3>
              <CircleProgress
                percentage={stat.value}
                color={stat.color}
                delay={index * 200}
              />
              <p className="text-gray-400 mt-4 font-medium">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Animated Performance Chart */}
          <div
            className="xl:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 animate-slide-up"
            style={{ animationDelay: "700ms" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Performance Overview
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Revenue and growth metrics
                </p>
              </div>
              <select className="px-3 py-2 bg-gray-700/50 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none backdrop-blur-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            <div className="h-72 flex items-end justify-between p-6 bg-gradient-to-t from-gray-900/50 to-transparent rounded-xl">
              {performanceBars.map((bar, i) => (
                <div
                  key={bar.id}
                  className="flex flex-col items-center space-y-2 group"
                >
                  <AnimatedBar
                    height={bar.height}
                    color="from-red-500 to-red-400"
                    delay={i * 100 + 800}
                    width={8}
                  />
                  <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                    {bar.date}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">$89,247</p>
                <p className="text-sm text-gray-400">Total Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">+18.2%</p>
                <p className="text-sm text-gray-400">Growth Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-sm text-gray-400">New Customers</p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 animate-slide-up"
            style={{ animationDelay: "900ms" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Recent Transactions
              </h2>
              <button className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-700/30 transition-all duration-200 group animate-slide-in-left"
                  style={{ animationDelay: `${1000 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                    {transaction.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-red-300 transition-colors">
                      {transaction.customer}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {transaction.product}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {transaction.amount}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Bar Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Sales Bar Chart */}
          <div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 animate-slide-up"
            style={{ animationDelay: "1100ms" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Monthly Sales
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Sales performance by month
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                <span className="text-xs text-gray-400">This Year</span>
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 ml-4"></div>
                <span className="text-xs text-gray-400">Last Year</span>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between p-4 bg-gradient-to-t from-gray-900/30 to-transparent rounded-xl">
              {monthlySales.map((monthData, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-3 group"
                >
                  <div className="flex items-end space-x-1">
                    <AnimatedBar
                      height={monthData.currentYear}
                      color="from-emerald-500 to-emerald-400"
                      delay={i * 150 + 1200}
                      width={6}
                    />
                    <AnimatedBar
                      height={monthData.lastYear}
                      color="from-red-500 to-red-400"
                      delay={i * 150 + 1300}
                      width={6}
                    />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                    {monthData.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-400">$156K</p>
                <p className="text-xs text-gray-400">This Year</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-red-400">$134K</p>
                <p className="text-xs text-gray-400">Last Year</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white">+16.4%</p>
                <p className="text-xs text-gray-400">Growth</p>
              </div>
            </div>
          </div>

          {/* Category Performance Bar Chart */}
          <div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 animate-slide-up"
            style={{ animationDelay: "1200ms" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Category Performance
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Revenue by product category
                </p>
              </div>
              <button className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors">
                <Eye size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  category: "Software",
                  value: 85,
                  amount: "$42.5K",
                  color: "from-red-500 to-red-400",
                },
                {
                  category: "Hardware",
                  value: 72,
                  amount: "$36.8K",
                  color: "from-red-600 to-red-500",
                },
                {
                  category: "Services",
                  value: 58,
                  amount: "$28.9K",
                  color: "from-red-700 to-red-600",
                },
                {
                  category: "Support",
                  value: 45,
                  amount: "$22.1K",
                  color: "from-red-800 to-red-700",
                },
                {
                  category: "Training",
                  value: 33,
                  amount: "$16.7K",
                  color: "from-red-900 to-red-800",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group animate-slide-in-left"
                  style={{ animationDelay: `${1300 + i * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white group-hover:text-red-300 transition-colors">
                      {item.category}
                    </span>
                    <span className="text-sm font-semibold text-gray-300">
                      {item.amount}
                    </span>
                  </div>
                  <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: `${item.value}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {item.value}% of target
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        item.value > 70
                          ? "text-emerald-400"
                          : item.value > 50
                          ? "text-orange-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.value > 70
                        ? "Excellent"
                        : item.value > 50
                        ? "Good"
                        : "Needs Attention"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
