import React, { useState } from "react";

import "./App.css";




function App() {
  const [formData, setFormData] = useState({
    fullName: "Ananya Rao",
    workEmail: "ananya.rao@techcompany.com",
    estimatedBudget: "100000",
    companySize: "500",
    projectDescription:
      "We need an AI-powered CRM automation and lead qualification workflow to automate sales processes, customer management, lead generation, and business workflow integration.",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const qualifyLead = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/qualify-lead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            workEmail: formData.workEmail,
            estimatedBudget: Number(formData.estimatedBudget),
            companySize: Number(formData.companySize),
            projectDescription: formData.projectDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Lead qualification failed."
        );
      }

      setResult({
        ...formData,
        ...data,
      });
    } catch (err) {
      console.error("Qualification error:", err);

      setError(
        err.message || "AI qualification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError("");

    setFormData({
      fullName: "",
      workEmail: "",
      estimatedBudget: "",
      companySize: "",
      projectDescription: "",
    });
  };

  return (
    <div className="app-container">
      <div className="card">

        {/* HEADER */}
        <div className="header">
          <div className="logo">
            TRYAM
          </div>

          <h1>TRYAM AUTOMATIONS</h1>

          <h2>
            Smart Lead Qualification & CRM Router
          </h2>

          <p>
            AI-Powered Automated Lead Qualification
          </p>

          <div className="flow">
            <span>Lead Form</span>
            <span>→</span>
            <span>LLM</span>
            <span>→</span>
            <span>Score</span>
            <span>→</span>
            <span>Route</span>
          </div>

          <div className="status">
            <span className="status-dot"></span>
            OpenAI LLM Enabled
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={qualifyLead}>
          <div className="lead-section">

            <div className="section-title">
              <span className="section-number">01</span>

              <div>
                <h2>Lead Information</h2>
                <p>
                  Enter your prospect's business information
                </p>
              </div>
            </div>

            {/* FULL NAME */}
            <div className="form-group">
              <label htmlFor="fullName">
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="workEmail">
                Work Email
              </label>

              <input
                id="workEmail"
                type="email"
                name="workEmail"
                placeholder="name@company.com"
                value={formData.workEmail}
                onChange={handleChange}
                required
              />
            </div>

            {/* BUDGET */}
            <div className="form-group">
              <label htmlFor="estimatedBudget">
                Estimated Budget
              </label>

              <div className="input-wrapper">
                <span className="input-prefix">$</span>

                <input
                  id="estimatedBudget"
                  type="number"
                  name="estimatedBudget"
                  placeholder="100000"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>

            {/* COMPANY SIZE */}
            <div className="form-group">
              <label htmlFor="companySize">
                Company Size
              </label>

              <div className="input-wrapper">
                <input
                  id="companySize"
                  type="number"
                  name="companySize"
                  placeholder="500"
                  value={formData.companySize}
                  onChange={handleChange}
                  min="1"
                  required
                />

                <span className="input-suffix">
                  employees
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
              <label htmlFor="projectDescription">
                Project Description
              </label>

              <textarea
                id="projectDescription"
                name="projectDescription"
                placeholder="Describe the project, business requirement, automation needs, etc."
                value={formData.projectDescription}
                onChange={handleChange}
                rows={6}
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="qualify-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  AI IS ANALYZING...
                </>
              ) : (
                <>
                  QUALIFY LEAD WITH AI
                  <span className="button-arrow">→</span>
                </>
              )}
            </button>

          </div>
        </form>

        {/* LOADING */}
        {loading && (
          <div className="loading-box">
            <div className="loading-icon">
              <span></span>
            </div>

            <h2>
              Running AI Qualification...
            </h2>

            <p>
              Analyzing your lead information
            </p>

            <div className="loading-steps">

              <div className="loading-step active">
                <span>✓</span>
                Sending lead information to LLM
              </div>

              <div className="loading-step">
                <span>↓</span>
                Analyzing business intent
              </div>

              <div className="loading-step">
                <span>↓</span>
                Generating lead score
              </div>

              <div className="loading-step">
                <span>↓</span>
                Identifying industry
              </div>

              <div className="loading-step">
                <span>↓</span>
                Determining sales priority
              </div>

            </div>
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div className="error-box">

            <div className="error-icon">
              !
            </div>

            <div>
              <h3>Automation Error</h3>

              <p>{error}</p>
            </div>

          </div>
        )}

        {/* RESULT */}
        {result && !loading && (
          <div className="result-box">

            <div className="result-header">
              <div>
                <span className="result-label">
                  AI ANALYSIS COMPLETE
                </span>

                <h2>
                  Lead Qualification Result
                </h2>
              </div>

              <button
                type="button"
                className="reset-button"
                onClick={resetForm}
              >
                New Lead
              </button>
            </div>

            {/* SCORE */}
            <div className="score-card">

              <div className="score-left">
                <span>
                  LEAD SCORE
                </span>

                <strong>
                  {result.leadScore}
                  <small>/10</small>
                </strong>
              </div>

              <div
                className={`score-circle score-${result.leadScore}`}
              >
                <div
                  className="score-circle-inner"
                  style={{
                    "--score":
                      `${result.leadScore * 10}%`,
                  }}
                >
                  {result.leadScore}
                </div>
              </div>

            </div>

            {/* DETAILS */}
            <div className="result-details">

              <div className="result-row">
                <span>Full Name</span>

                <strong>
                  {result.fullName}
                </strong>
              </div>

              <div className="result-row">
                <span>Work Email</span>

                <strong>
                  {result.workEmail}
                </strong>
              </div>

              <div className="result-row">
                <span>Estimated Budget</span>

                <strong>
                  ${Number(
                    result.estimatedBudget
                  ).toLocaleString()}
                </strong>
              </div>

              <div className="result-row">
                <span>Company Size</span>

                <strong>
                  {Number(
                    result.companySize
                  ).toLocaleString()} employees
                </strong>
              </div>

              <div className="result-row">
                <span>Industry / Domain</span>

                <strong>
                  {result.industry}
                </strong>
              </div>

              <div className="result-row">
                <span>Priority</span>

                <strong
                  className={
                    result.priority ===
                    "HIGH_PRIORITY"
                      ? "high-priority"
                      : "low-priority"
                  }
                >
                  {result.priority ===
                  "HIGH_PRIORITY"
                    ? "HIGH PRIORITY"
                    : "NURTURE"}
                </strong>
              </div>

            </div>

            {/* AI REASON */}
            <div className="reason-box">

              <div className="reason-header">
                <span className="ai-icon">
                  AI
                </span>

                <h3>
                  AI Reason
                </h3>
              </div>

              <p>
                {result.reason}
              </p>

            </div>

            {/* HIGH PRIORITY */}
            {result.priority ===
              "HIGH_PRIORITY" && (
              <div className="high-priority-box">

                <div className="priority-heading">
                  <div className="priority-icon">
                    ✓
                  </div>

                  <div>
                    <h2>
                      HIGH PRIORITY
                    </h2>

                    <p>
                      This lead should be routed
                      to your sales team.
                    </p>
                  </div>
                </div>

                <div className="route-actions">

                  <div className="route-action">
                    <span>✓</span>
                    Route to Sales / CRM
                  </div>

                  <div className="route-action">
                    <span>✓</span>
                    Log to Google Sheets
                  </div>

                  <div className="route-action">
                    <span>✓</span>
                    Trigger Internal Alert
                  </div>

                </div>

              </div>
            )}

            {/* NURTURE */}
            {result.priority === "NURTURE" && (
              <div className="low-priority-box">

                <div className="priority-heading">
                  <div className="priority-icon nurture">
                    →
                  </div>

                  <div>
                    <h2>
                      NURTURE / LOW PRIORITY
                    </h2>

                    <p>
                      This lead should enter your
                      nurture workflow.
                    </p>
                  </div>
                </div>

                <div className="route-actions">

                  <div className="route-action">
                    <span>✓</span>
                    Route to Nurture Flow
                  </div>

                  <div className="route-action">
                    <span>✓</span>
                    Generate Follow-up Email
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </div>

      <div className="footer">
        TRYAM AUTOMATIONS • AI-POWERED LEAD ROUTING
      </div>

    </div>
  );
}

export default App;
