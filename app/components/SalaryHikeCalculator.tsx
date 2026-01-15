"use client";

import React, { useState } from "react";
import {
  Calculator, TrendingUp, DollarSign, IndianRupee, Calendar, Banknote as BanknoteIcon, BookOpen, Info, BarChart3, PieChart
} from "lucide-react";

type Currency = {
  code: string;
  symbol: string;
  name: string;
  country: string;
};

export default function SalaryHikeCalculator() {
  const [currentSalary, setCurrentSalary] = useState('');
  const [hikePercentage, setHikePercentage] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [mode, setMode] = useState('percentage');
  const [salaryType, setSalaryType] = useState('annual');
  const [currency, setCurrency] = useState('INR');
  const [showFormulas, setShowFormulas] = useState(false);

  const currencies: Currency[] = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India' },
    { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States' },
    { code: 'EUR', symbol: '€', name: 'Euro', country: 'European Union' },
    { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', country: 'United Arab Emirates' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', country: 'Switzerland' }
  ];

  // fallback ensures TypeScript knows selectedCurrency is never undefined
  const selectedCurrency: Currency = currencies.find(c => c.code === currency) || currencies[0];

  // Calculate new salary from percentage
  const calculateFromPercentage = () => {
    const current = parseFloat(currentSalary);
    const hike = parseFloat(hikePercentage);
    if (isNaN(current) || isNaN(hike) || current <= 0) return;

    const hikeAmount = (current * hike) / 100;
    setNewSalary((current + hikeAmount).toFixed(2));
  };

  // Calculate hike % from new salary
  const calculateFromNewSalary = () => {
    const current = parseFloat(currentSalary);
    const newSal = parseFloat(newSalary);
    if (isNaN(current) || isNaN(newSal) || current <= 0) return;

    const hike = ((newSal - current) / current) * 100;
    setHikePercentage(hike.toFixed(2));
  };

  const handleCalculate = () => {
    if (mode === 'percentage') {
      calculateFromPercentage();
    } else {
      calculateFromNewSalary();
    }
  };

  const handleReset = () => {
    setCurrentSalary('');
    setHikePercentage('');
    setNewSalary('');
  };

  const formatCurrency = (value: number) => {
    if (Number.isNaN(value)) return `${selectedCurrency.symbol}0`;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: selectedCurrency.code,
      maximumFractionDigits: 0
    }).format(value);
  };

  

  const current = parseFloat(currentSalary) || 0;
  const hike = parseFloat(hikePercentage) || 0;
  const newSal = parseFloat(newSalary) || 0;
  const hikeAmount = mode === 'percentage' ? (current * hike) / 100 : newSal - current;
  
  const annualCurrent = salaryType === 'monthly' ? current * 12 : current;
  const annualNew = salaryType === 'monthly' ? newSal * 12 : newSal;
  const annualHikeAmount = salaryType === 'monthly' ? hikeAmount * 12 : hikeAmount;
  
  const monthlyCurrent = salaryType === 'annual' ? current / 12 : current;
  const monthlyNew = salaryType === 'annual' ? newSal / 12 : newSal;
  const monthlyHikeAmount = salaryType === 'annual' ? hikeAmount / 12 : hikeAmount;

  const hasResults = (mode === 'percentage' && newSalary) || (mode === 'salary' && hikePercentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
        {/*   <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div> */}
          <h1 className="text-3xl sm:text-3xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Salary Hike Calculator
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Calculate your salary increase with precision and clarity</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Calculator Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            {/* Calculation Mode */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                What would you like to calculate?
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setMode('percentage')}
                  className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    mode === 'percentage'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Calculate New Salary</span>
                </button>
                <button
                  onClick={() => setMode('salary')}
                  className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    mode === 'salary'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <PieChart className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Calculate Hike %</span>
                </button>
              </div>
            </div>

            {/* Currency and Salary Type */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <BanknoteIcon className="w-4 h-4 text-blue-600" />

                  Select Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                >
                  {currencies.map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.code} - {curr.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Salary Period
                </label>
                <select
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                >
                  <option value="annual">Annual (Yearly)</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current {salaryType === 'annual' ? 'Annual' : 'Monthly'} Salary
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    {selectedCurrency.symbol}
                  </span>
                  <input
                    type="number"
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(e.target.value)}
                    placeholder={salaryType === 'annual' ? 'e.g., 800000' : 'e.g., 66667'}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {mode === 'percentage' ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hike Percentage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={hikePercentage}
                      onChange={(e) => setHikePercentage(e.target.value)}
                      placeholder="e.g., 15"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      %
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New {salaryType === 'annual' ? 'Annual' : 'Monthly'} Salary
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      {selectedCurrency.symbol}
                    </span>
                    <input
                      type="number"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      placeholder={salaryType === 'annual' ? 'e.g., 920000' : 'e.g., 76667'}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCalculate}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Results
              </button>
              <button
                onClick={handleReset}
                className="sm:w-auto px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-1">
            {hasResults ? (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white sticky top-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5" />
                  <h2 className="text-xl font-bold">Your Results</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/15 backdrop-blur rounded-xl p-4 border border-white/20">
                    <p className="text-sm text-blue-100 mb-1">Hike Percentage</p>
                    <p className="text-3xl font-bold">{hike.toFixed(2)}%</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wide">Monthly Breakdown</p>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/10">
                      <p className="text-xs text-blue-100 mb-1">Current Monthly</p>
                      <p className="text-lg font-semibold">{formatCurrency(monthlyCurrent)}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/10">
                      <p className="text-xs text-blue-100 mb-1">New Monthly</p>
                      <p className="text-lg font-semibold text-green-300">{formatCurrency(monthlyNew)}</p>
                    </div>
                    <div className="bg-green-500/25 backdrop-blur rounded-xl p-3 border border-green-400/40">
                      <p className="text-xs text-green-100 mb-1">Monthly Increase</p>
                      <p className="text-lg font-bold text-green-200">+{formatCurrency(monthlyHikeAmount)}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-4 space-y-3">
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wide">Annual Breakdown</p>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/10">
                      <p className="text-xs text-blue-100 mb-1">Current Annual</p>
                      <p className="text-lg font-semibold">{formatCurrency(annualCurrent)}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/10">
                      <p className="text-xs text-blue-100 mb-1">New Annual</p>
                      <p className="text-lg font-semibold text-green-300">{formatCurrency(annualNew)}</p>
                    </div>
                    <div className="bg-green-500/25 backdrop-blur rounded-xl p-3 border border-green-400/40">
                      <p className="text-xs text-green-100 mb-1">Annual Increase</p>
                      <p className="text-lg font-bold text-green-200">+{formatCurrency(annualHikeAmount)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex items-center justify-center border border-gray-100">
                <div className="text-center text-gray-400">
                  <IndianRupee className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="font-medium">Enter your details and click Calculate to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Formula Explanation Section */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <button
            onClick={() => setShowFormulas(!showFormulas)}
            className="w-full flex items-center justify-between text-left mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">How the Calculations Work</h3>
            </div>
            <span className="text-blue-600 font-medium">{showFormulas ? '▼' : '▶'}</span>
          </button>
          
          {showFormulas && (
            <div className="space-y-6 pt-4 border-t border-gray-200">
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  Calculate New Salary from Hike Percentage
                </h4>
                <div className="space-y-2 text-sm text-gray-700 ml-8">
                  <p className="font-mono bg-white p-3 rounded-lg border border-blue-200">
                    <strong>Formula:</strong> New Salary = Current Salary + (Current Salary × Hike % ÷ 100)
                  </p>
                  <p className="mt-3"><strong>Step-by-step:</strong></p>
                  <ol className="list-decimal ml-5 space-y-1">
                    <li>Calculate hike amount: Current Salary × Hike Percentage ÷ 100</li>
                    <li>Add hike amount to current salary: Current Salary + Hike Amount</li>
                  </ol>
                  <div className="bg-white p-3 rounded-lg border border-blue-200 mt-3">
                    <p className="font-semibold text-blue-800 mb-2">Example:</p>
                    <p>Current Salary = ₹800,000 | Hike = 15%</p>
                    <p>Hike Amount = 800,000 × 15 ÷ 100 = ₹120,000</p>
                    <p>New Salary = 800,000 + 120,000 = <strong>₹920,000</strong></p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  Calculate Hike Percentage from New Salary
                </h4>
                <div className="space-y-2 text-sm text-gray-700 ml-8">
                  <p className="font-mono bg-white p-3 rounded-lg border border-indigo-200">
                    <strong>Formula:</strong> Hike % = ((New Salary - Current Salary) ÷ Current Salary) × 100
                  </p>
                  <p className="mt-3"><strong>Step-by-step:</strong></p>
                  <ol className="list-decimal ml-5 space-y-1">
                    <li>Calculate salary increase: New Salary - Current Salary</li>
                    <li>Divide increase by current salary: Increase ÷ Current Salary</li>
                    <li>Multiply by 100 to get percentage: Result × 100</li>
                  </ol>
                  <div className="bg-white p-3 rounded-lg border border-indigo-200 mt-3">
                    <p className="font-semibold text-indigo-800 mb-2">Example:</p>
                    <p>Current Salary = ₹800,000 | New Salary = ₹920,000</p>
                    <p>Increase = 920,000 - 800,000 = ₹120,000</p>
                    <p>Percentage = (120,000 ÷ 800,000) × 100 = <strong>15%</strong></p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                  Convert Between Monthly and Annual
                </h4>
                <div className="space-y-2 text-sm text-gray-700 ml-8">
                  <p className="font-mono bg-white p-3 rounded-lg border border-purple-200">
                    <strong>Annual to Monthly:</strong> Monthly Salary = Annual Salary ÷ 12
                  </p>
                  <p className="font-mono bg-white p-3 rounded-lg border border-purple-200">
                    <strong>Monthly to Annual:</strong> Annual Salary = Monthly Salary × 12
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-purple-200 mt-3">
                    <p className="font-semibold text-purple-800 mb-2">Example:</p>
                    <p>Annual Salary = ₹920,000</p>
                    <p>Monthly Salary = 920,000 ÷ 12 = <strong>₹76,667</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-800">Key Features</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>Support for 10 major global currencies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>Calculate based on monthly or annual salary</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>Bi-directional calculation (salary or percentage)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>Detailed breakdown of all calculations</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-800">Use Cases</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">→</span>
                <span>Negotiating salary during job offers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">→</span>
                <span>Planning annual appraisal expectations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">→</span>
                <span>Comparing multiple job offers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">→</span>
                <span>Financial planning and budgeting</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Info Footer */}
  {/*       <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold text-gray-800 mb-1">About This Calculator</p>
              <p>This calculator is built using <strong>React</strong> (JavaScript library) with <strong>Tailwind CSS</strong> for styling. It runs directly in your web browser and performs all calculations instantly without sending data to any server, ensuring your salary information remains private and secure.</p>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
}