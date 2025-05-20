import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const BudgetTracker = () => {
  const [dailySpent, setDailySpent] = useState(0);
  const [weeklySpent, setWeeklySpent] = useState(0);

  const [dailyBudget, setDailyBudget] = useState(0);
  const [weeklyBudget, setWeeklyBudget] = useState(0);

  const [inputDaily, setInputDaily] = useState("");
  const [inputWeekly, setInputWeekly] = useState("");
  const token = Cookies.get("token");

  // Fetch spending and budget from the API
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/transactions/get-expense-summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        // Set state with data from the API
        setDailySpent(data.dailySpent);
        setWeeklySpent(data.weeklySpent);

        // Get the daily and weekly budget from localStorage first, then fallback to the API data
        const storedDailyBudget = localStorage.getItem("dailyBudget");
        const storedWeeklyBudget = localStorage.getItem("weeklyBudget");

        setDailyBudget(
          storedDailyBudget
            ? parseFloat(storedDailyBudget)
            : data.dailyBudget || 0
        );
        setWeeklyBudget(
          storedWeeklyBudget
            ? parseFloat(storedWeeklyBudget)
            : data.weeklyBudget || 0
        );
      })
      .catch((err) => {
        console.error("Failed to fetch budget summary:", err.message);
      });
  }, [token]);

  // Save budget and also update localStorage
  const saveBudget = () => {
    fetch("http://localhost:5000/api/user/set-budget", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dailyBudget: parseFloat(inputDaily),
        weeklyBudget: parseFloat(inputWeekly),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the state
        setDailyBudget(data.dailyBudget);
        setWeeklyBudget(data.weeklyBudget);

        // Save the budgets to localStorage to persist across page reloads
        localStorage.setItem("dailyBudget", data.dailyBudget);
        localStorage.setItem("weeklyBudget", data.weeklyBudget);

        // Clear inputs
        setInputDaily("");
        setInputWeekly("");
      });
  };

  const getColor = (progress) => {
    if (progress < 70) return "green";
    if (progress < 90) return "orange";
    return "red";
  };

  const dailyProgress = Math.min((dailySpent / dailyBudget) * 100 || 0, 100);
  const weeklyProgress = Math.min((weeklySpent / weeklyBudget) * 100 || 0, 100);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #eee",
        borderRadius: "12px",
        background: "#f9f9f9",
      }}
    >
      <h3>Budget Tracker</h3>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Set Daily Budget"
          value={inputDaily}
          onChange={(e) => setInputDaily(e.target.value)}
        />
        <input
          type="number"
          placeholder="Set Weekly Budget"
          value={inputWeekly}
          onChange={(e) => setInputWeekly(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <button
          onClick={saveBudget}
          style={{ marginLeft: "10px" }}
          disabled={!inputDaily && !inputWeekly}
        >
          Save Budget
        </button>
      </div>

      <p>Daily Budget: Rs.{dailyBudget}</p>
      <div
        style={{
          height: "20px",
          background: "#ddd",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${dailyProgress}%`,
            background: getColor(dailyProgress),
            height: "100%",
            transition: "width 0.5s ease",
          }}
        />
      </div>
      <p style={{ marginTop: "5px" }}>
        Rs.{typeof dailySpent === "number" ? dailySpent.toFixed(2) : "0.00"} /
        Rs.
        {dailyBudget}
      </p>

      <p style={{ marginTop: "15px" }}>Weekly Budget: Rs.{weeklyBudget}</p>
      <div
        style={{
          height: "20px",
          background: "#ddd",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${weeklyProgress}%`,
            background: getColor(weeklyProgress),
            height: "100%",
            transition: "width 0.5s ease",
          }}
        />
      </div>
      <p style={{ marginTop: "5px" }}>
        Rs.{typeof weeklySpent === "number" ? weeklySpent.toFixed(2) : "0.00"} /
        ${weeklyBudget}
      </p>
    </div>
  );
};

export default BudgetTracker;
