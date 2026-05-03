// src/frontend/components/InvestmentGate.jsx
// SEC 506(c) Accreditation Filter (Glass-Morphism UI)

import React, { useState } from "react";

const InvestmentGate = ({ onAccreditationComplete }) => {
  const [step, setStep] = useState(1); // Step 1: Class Selection, Step 2: Accreditation, Step 3: Confirmation
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    netWorth: "",
    annualIncome: "",
    investmentAmount: "",
  });
  const [accreditationStatus, setAccreditationStatus] = useState(null);

  const investmentClasses = [
    {
      id: "BCP",
      name: "Blue Chip Class",
      description: "Institutional grid integration partners with access to full 18GW roadmap.",
      minInvestment: "$1,000,000+",
      accessLevel: "Full Technical + Roadmap",
    },
    {
      id: "PRT",
      name: "Partner Class",
      description: "10-Phase Strategic Pool; manages node rollout and expansion rights.",
      minInvestment: "$100,000+",
      accessLevel: "Phase-Specific Roadmap",
    },
    {
      id: "CMN",
      name: "Common Class",
      description: "Retail utility; fractional energy returns and efficiency metrics.",
      minInvestment: "$1,000+",
      accessLevel: "High-Level ROI & Metrics",
    },
  ];

  const handleClassSelection = (classId) => {
    setSelectedClass(classId);
    setStep(2);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccreditationVerification = () => {
    const netWorth = parseFloat(formData.netWorth);
    const annualIncome = parseFloat(formData.annualIncome);

    // SEC 506(c): Individual must have net worth > $1M or annual income > $200K
    const isAccredited = netWorth >= 1000000 || annualIncome >= 200000;

    setAccreditationStatus({
      verified: isAccredited,
      netWorth: netWorth >= 1000000,
      income: annualIncome >= 200000,
    });

    if (isAccredited) {
      setStep(3);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000 0%, #1a1a2e 50%, #0f0f1e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ===== STEP 1: CLASS SELECTION ===== */}
      {step === 1 && (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            border: "1px solid rgba(0, 206, 209, 0.3)",
            padding: "3rem",
            maxWidth: "1200px",
            width: "100%",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: "2rem",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            Accreditation Gateway
          </h1>
          <p
            style={{
              color: "#00CED1",
              textAlign: "center",
              marginBottom: "3rem",
              fontSize: "1rem",
            }}
          >
            SEC Rule 506(c) Compliance Required for External Participation
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {investmentClasses.map((investmentClass) => (
              <div
                key={investmentClass.id}
                onClick={() => handleClassSelection(investmentClass.id)}
                style={{
                  background:
                    selectedClass === investmentClass.id
                      ? "rgba(220, 20, 60, 0.2)"
                      : "rgba(255, 255, 255, 0.03)",
                  border:
                    selectedClass === investmentClass.id
                      ? "2px solid #DC143C"
                      : "1px solid rgba(0, 206, 209, 0.2)",
                  borderRadius: "12px",
                  padding: "2rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: "hover:scale(1.02)",
                }}
                onMouseEnter={(e) => {
                  if (selectedClass !== investmentClass.id) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                    e.currentTarget.style.borderColor = "rgba(0, 206, 209, 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedClass !== investmentClass.id) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                    e.currentTarget.style.borderColor = "rgba(0, 206, 209, 0.2)";
                  }
                }}
              >
                <h3
                  style={{
                    color: "#FFD700",
                    marginBottom: "0.5rem",
                    fontSize: "1.3rem",
                  }}
                >
                  {investmentClass.name}
                </h3>
                <p
                  style={{
                    color: "#ccc",
                    marginBottom: "1rem",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  {investmentClass.description}
                </p>
                <div
                  style={{
                    borderTop: "1px solid rgba(0, 206, 209, 0.2)",
                    paddingTop: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <p style={{ color: "#00CED1", fontSize: "0.85rem", margin: "0.5rem 0" }}>
                    <strong>Minimum:</strong> {investmentClass.minInvestment}
                  </p>
                  <p style={{ color: "#00CED1", fontSize: "0.85rem", margin: "0.5rem 0" }}>
                    <strong>Access:</strong> {investmentClass.accessLevel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== STEP 2: ACCREDITATION VERIFICATION ===== */}
      {step === 2 && (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            border: "1px solid rgba(0, 206, 209, 0.3)",
            padding: "3rem",
            maxWidth: "600px",
            width: "100%",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "1.8rem",
              marginBottom: "0.5rem",
            }}
          >
            Accreditation Verification
          </h2>
          <p
            style={{
              color: "#00CED1",
              marginBottom: "2rem",
              fontSize: "0.9rem",
            }}
          >
            Verify your accredited investor status (SEC Rule 506(c))
          </p>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div>
              <label
                style={{
                  color: "#fff",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "rgba(0, 206, 209, 0.1)",
                  border: "1px solid rgba(0, 206, 209, 0.3)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  color: "#fff",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                Net Worth (USD)
              </label>
              <input
                type="number"
                name="netWorth"
                placeholder="1000000"
                value={formData.netWorth}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "rgba(0, 206, 209, 0.1)",
                  border: "1px solid rgba(0, 206, 209, 0.3)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
              <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                Excluding primary residence
              </p>
            </div>

            <div>
              <label
                style={{
                  color: "#fff",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                Annual Income (USD)
              </label>
              <input
                type="number"
                name="annualIncome"
                placeholder="200000"
                value={formData.annualIncome}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "rgba(0, 206, 209, 0.1)",
                  border: "1px solid rgba(0, 206, 209, 0.3)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
              <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                Last 2 years average
              </p>
            </div>

            <div>
              <label
                style={{
                  color: "#fff",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                Investment Amount (USD)
              </label>
              <input
                type="number"
                name="investmentAmount"
                placeholder="Enter amount"
                value={formData.investmentAmount}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "rgba(0, 206, 209, 0.1)",
                  border: "1px solid rgba(0, 206, 209, 0.3)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              onClick={handleAccreditationVerification}
              style={{
                padding: "1rem",
                background: "linear-gradient(135deg, #DC143C, #FF1744)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
                marginTop: "1rem",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 0 20px rgba(220, 20, 60, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "none";
              }}
            >
              Verify Accreditation
            </button>

            <button
              onClick={() => setStep(1)}
              style={{
                padding: "0.8rem",
                background: "transparent",
                color: "#00CED1",
                border: "1px solid #00CED1",
                borderRadius: "8px",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(0, 206, 209, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
              }}
            >
              Back to Class Selection
            </button>
          </form>
        </div>
      )}

      {/* ===== STEP 3: CONFIRMATION ===== */}
      {step === 3 && (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            border: "2px solid #00CED1",
            padding: "3rem",
            maxWidth: "600px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(0, 206, 209, 0.3)",
          }}
        >
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              color: "#00CED1",
            }}
          >
            ✓
          </div>
          <h2
            style={{
              color: "#fff",
              fontSize: "1.8rem",
              marginBottom: "0.5rem",
            }}
          >
            Accreditation Verified
          </h2>
          <p
            style={{
              color: "#00CED1",
              marginBottom: "2rem",
              fontSize: "1rem",
            }}
          >
            Welcome to Vector Bellows
          </p>

          <div
            style={{
              background: "rgba(255, 215, 0, 0.1)",
              border: "1px solid #FFD700",
              borderRadius: "8px",
              padding: "1.5rem",
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            <p style={{ color: "#fff", margin: "0.5rem 0" }}>
              <strong>Name:</strong> {formData.name}
            </p>
            <p style={{ color: "#fff", margin: "0.5rem 0" }}>
              <strong>Investment Amount:</strong> ${parseFloat(formData.investmentAmount).toLocaleString()}
            </p>
            <p style={{ color: "#fff", margin: "0.5rem 0" }}>
              <strong>Investment Class:</strong>{" "}
              {investmentClasses.find((c) => c.id === selectedClass)?.name}
            </p>
            <p style={{ color: "#00CED1", margin: "1rem 0 0 0", fontSize: "0.9rem" }}>
              You are now eligible for Phase 3 enrollment and full 18GW technical roadmap access.
            </p>
          </div>

          <button
            onClick={() => onAccreditationComplete({ ...formData, selectedClass })}
            style={{
              padding: "1rem 2rem",
              background: "linear-gradient(135deg, #FFD700, #FFA500)",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "none";
            }}
          >
            Proceed to Partner Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default InvestmentGate;
