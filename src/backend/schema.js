// src/backend/schema.js
// Partner Tier & Node Telemetry Schema for Vector Bellows 18GW Network

/**
 * INVESTMENT CLASSES (External 40% Pool Only)
 * DO NOT EXPOSE Sovereign Block (60%) in API responses
 */
const InvestmentClasses = {
  BLUE_CHIP: {
    class_id: "BCP",
    tier_name: "Blue Chip Class",
    description: "Institutional grid integration partners with access to full 18GW roadmap.",
    min_investment: 1000000, // $1M+
    equity_pool_percent: 15, // 15% of 40% external pool
    access_level: 3, // Full technical + roadmap access
    compliance_required: "SEC 506(c) Accredited Investor",
    phase_participation: "1-10",
    distribution_rights: true
  },
  PARTNER: {
    class_id: "PRT",
    tier_name: "Partner Class",
    description: "10-Phase Strategic Pool; manages node rollout and expansion rights.",
    min_investment: 100000, // $100K+
    equity_pool_percent: 20, // 20% of 40% external pool
    access_level: 2, // Phase-specific roadmap access
    compliance_required: "SEC 506(c) Accredited Investor",
    phase_participation: "3-10",
    distribution_rights: true
  },
  COMMON: {
    class_id: "CMN",
    tier_name: "Common Class",
    description: "Retail utility; fractional energy returns and efficiency metrics.",
    min_investment: 1000, // $1K fractional
    equity_pool_percent: 5, // 5% of 40% external pool
    access_level: 1, // High-level ROI & efficiency data only
    compliance_required: "General Onboarding",
    phase_participation: "8-10",
    distribution_rights: false
  }
};

/**
 * 10-PHASE PARTNER ROADMAP
 * Total: 18,000 nodes @ 1.0 MW each = 18GW
 * Current Status: Phase 3 (Open Enrollment)
 */
const TenPhaseRoadmap = {
  phase_1: {
    phase_id: 1,
    phase_name: "Genesis - Owosso, Michigan",
    node_target: 1800, // 1.8GW
    node_pool_percent: 10,
    equity_alloc_percent: 4, // 4% of 40% pool
    expected_completion: "Q4 2026",
    status: "COMPLETE",
    description: "Primary subterranean hub; 20ft monolithic geopolymer vault with full VRC lift.",
    accessible_to_classes: ["BLUE_CHIP", "PARTNER"]
  },
  phase_2: {
    phase_id: 2,
    phase_name: "Regional Expansion - Great Lakes Cluster",
    node_target: 1800, // 1.8GW
    node_pool_percent: 10,
    equity_alloc_percent: 4,
    expected_completion: "Q2 2027",
    status: "IN_PROGRESS",
    description: "Distributed satellite nodes across Michigan, Ohio, Indiana.",
    accessible_to_classes: ["BLUE_CHIP", "PARTNER"]
  },
  phase_3: {
    phase_id: 3,
    phase_name: "Open Enrollment & Refinement",
    node_target: 1800, // 1.8GW
    node_pool_percent: 10,
    equity_alloc_percent: 4,
    expected_completion: "Q3 2027",
    status: "OPEN_ENROLLMENT",
    description: "Winter Refinement complete; Spring Push initiates.",
    accessible_to_classes: ["BLUE_CHIP", "PARTNER"]
  },
  phase_4: {
    phase_id: 4,
    phase_name: "Midwest Saturation",
    node_target: 1800, // 1.8GW
    node_pool_percent: 10,
    equity_alloc_percent: 4,
    expected_completion: "Q4 2027",
    status: "PLANNED",
    description: "Fill remaining Midwest capacity.",
    accessible_to_classes: ["BLUE_CHIP", "PARTNER"]
  },
  phase_5: {
    phase_id: 5,
    phase_name: "Eastern Seaboard Integration",
    node_target: 2700, // 2.7GW
    node_pool_percent: 15,
    equity_alloc_percent: 4,
    expected_completion: "Q2 2028",
    status: "PLANNED",
    description: "Atlantic corridor nodes; high-density grid resilience.",
    accessible_to_classes: ["BLUE_CHIP", "PARTNER"]
  },
  phase_6: {
    phase_id: 6,
    phase_name: "Western Expansion",
    node_target: 2700, // 2.7GW
    node_pool_percent: 15,
    equity_alloc_percent: 4,
    expected_completion: "Q4 2028",
    status: "PLANNED",
    description: "Pacific coast and Mountain West nodes.",
    accessible_to_classes: ["BLUE_CHIP", "PARTNER"]
  },
  phase_7: {
    phase_id: 7,
    phase_name: "Grid Redundancy & Hardening",
    node_target: 1800, // 1.8GW
    node_pool_percent: 10,
    equity_alloc_percent: 4,
    expected_completion: "Q2 2029",
    status: "PLANNED",
    description: "Cross-region failover and EMP resilience nodes.",
    accessible_to_classes: ["BLUE_CHIP", "PARTNER", "COMMON"]
  },
  phase_8: {
    phase_id: 8,
    phase_name: "Tertiary Grid Deploy",
    node_target: 1800, // 1.8GW
    node_pool_percent: 10,
    equity_alloc_percent: 4,
    expected_completion: "Q4 2029",
    status: "PLANNED",
    description: "Deep rural and frontier nodes.",
    accessible_to_classes: ["BLUE_CHIP", "PARTNER", "COMMON"]
  },
  phase_9: {
    phase_id: 9,
    phase_name: "Saturation & Optimization",
    node_target: 1800, // 1.8GW
    node_pool_percent: 10,
    equity_alloc_percent: 4,
    expected_completion: "Q2 2030",
    status: "PLANNED",
    description: "Final gap-filling and efficiency optimization.",
    accessible_to_classes: ["BLUE_CHIP", "PARTNER", "COMMON"]
  },
  phase_10: {
    phase_id: 10,
    phase_name: "End Game - 18,000 Node Network",
    node_target: 0, // Cumulative achievement
    node_pool_percent: 0,
    equity_alloc_percent: 4,
    expected_completion: "Q4 2030",
    status: "PLANNED",
    description: "Full 18GW continental subterranean grid operational.",
    accessible_to_classes: ["BLUE_CHIP", "PARTNER", "COMMON"]
  }
};

/**
 * NODE TELEMETRY & SPECIFICATIONS
 */
const NodeSpecifications = {
  unit_capacity_mw: 1.0,
  total_nodes_target: 18000,
  total_capacity_gw: 18,
  current_phase: 3,
  construction_method: "3DCP (Monolithic Geopolymer)",
  shaft_depth_ft: 20,
  hull_shape: "Octagonal",
  thermal_management: "Closed-loop Subterranean Geothermal",
  water_waste: "Zero",
  hardening: "EMP + Solar Flare Resilient (20ft Earth Shield)",
  primary_site: "Owosso, Michigan"
};

/**
 * EQUITY STRUCTURE (Internal Reference Only)
 * 60% Sovereign Block = NEVER exposed in external APIs
 * 40% External Pool = Distributed across BLUE_CHIP, PARTNER, COMMON
 */
const EquityStructure = {
  total_equity: 100,
  sovereign_block_percent: 60, // Hidden from external users
  sovereign_holder: "A.V. Strategic Asset Trust",
  external_pool_percent: 40,
  external_pool_breakdown: {
    blue_chip: 15,
    partner: 20,
    common: 5
  }
};

/**
 * EXPORT SCHEMA
 */
module.exports = {
  InvestmentClasses,
  TenPhaseRoadmap,
  NodeSpecifications,
  EquityStructure // For internal Drake controller only
};
