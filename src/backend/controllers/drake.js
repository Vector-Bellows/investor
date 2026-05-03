// src/backend/controllers/drake.js
// Drake AI Controller: Sovereign Block Logic & Partner Management

const { InvestmentClasses, TenPhaseRoadmap, EquityStructure } = require("../schema");

/**
 * DRAKE AI CONTROLLER
 * Manages automated capital calls, equity waterfall, and Sovereign Block intervention.
 * 
 * KEY RULE: Sovereign Block (60%) is NEVER exposed in external APIs or dashboards.
 */
class DrakeController {
  constructor() {
    this.sovereign_block = EquityStructure.sovereign_block_percent; // 60% (internal only)
    this.external_pool = EquityStructure.external_pool_percent; // 40% (public)
    this.current_phase = 3;
    this.rebuy_threshold = 0.05; // 5% non-participation triggers Rebuy Status
  }

  /**
   * FILTER EXTERNAL API RESPONSES
   * Remove all Sovereign Block references before sending to partners
   */
  filterPublicEquityView(fullEquityData) {
    const filtered = {
      external_pool_percent: this.external_pool,
      external_allocation: {
        blue_chip: 15,
        partner: 20,
        common: 5
      },
      total_public_equity: this.external_pool,
      // Sovereign Block is NEVER included
    };
    return filtered;
  }

  /**
   * PARTNER DASHBOARD
   * Only expose partner's own tier, phase access, and public telemetry
   */
  getPartnerDashboard(partnerId, partnerClass) {
    const phases = TenPhaseRoadmap;
    const accessiblePhases = phases[Object.keys(phases).find(k => 
      phases[k].accessible_to_classes.includes(partnerClass)
    )];

    return {
      partner_id: partnerId,
      investment_class: InvestmentClasses[partnerClass],
      accessible_phases: Object.values(phases).filter(p => 
        p.accessible_to_classes.includes(partnerClass)
      ),
      equity_view: this.filterPublicEquityView(),
      node_telemetry: {
        total_nodes_target: 18000,
        total_capacity_gw: 18,
        current_phase: this.current_phase
      }
    };
  }

  /**
   * AUTOMATED CAPITAL CALL
   * Issued when a phase reaches 80% node deployment
   */
  issueCapitalCall(phaseId, partnerClass) {
    const phase = Object.values(TenPhaseRoadmap).find(p => p.phase_id === phaseId);
    if (!phase) return { error: "Phase not found" };

    const classData = InvestmentClasses[partnerClass];
    const callAmount = (phase.equity_alloc_percent / 100) * classData.equity_pool_percent * 1000000; // Mock $ value

    return {
      capital_call_id: `CC-${phaseId}-${Date.now()}`,
      phase_id: phaseId,
      phase_name: phase.phase_name,
      called_amount: callAmount,
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      status: "ISSUED",
      consequence_non_payment: "REBUY_STATUS"
    };
  }

  /**
   * REBUY STATUS TRIGGER
   * If partner does not pay capital call within 30 days:
   * - Equity reverts to Sovereign Block
   * - Partner transitions to "Observer" status (no voting rights)
   */
  triggerRebuyStatus(partnerId, equityPercent) {
    return {
      partner_id: partnerId,
      action: "REBUY_STATUS",
      reason: "Non-payment of capital call",
      equity_forfeited: equityPercent,
      equity_returned_to: "A.V. Strategic Asset Trust (Sovereign Block)",
      new_status: "OBSERVER",
      voting_rights: false,
      timestamp: new Date()
    };
  }

  /**
   * STEP-UP CAPITAL CALL ESCALATION
   * Each subsequent phase increases the call percentage
   */
  calculateStepUpCall(baseAmount, phaseNumber) {
    const escalation_factor = 1 + (phaseNumber * 0.10); // 10% increase per phase
    return baseAmount * escalation_factor;
  }

  /**
   * SEC 506(c) ACCREDITATION VERIFICATION
   * All external classes require verification before onboarding
   */
  verifySec506cAccreditation(partnerId, netWorth, annualIncome) {
    const accredited = (netWorth >= 1000000 || annualIncome >= 200000);
    return {
      partner_id: partnerId,
      accreditation_verified: accredited,
      verification_date: new Date(),
      compliance_status: accredited ? "COMPLIANT" : "REJECTED",
      timestamp: new Date()
    };
  }

  /**
   * PHASE ENROLLMENT
   * Manages partner admission to current phase pool
   */
  enrollPartnerInPhase(partnerId, partnerClass, minInvestment) {
    const classData = InvestmentClasses[partnerClass];
    const phase = Object.values(TenPhaseRoadmap).find(p => p.phase_id === this.current_phase);

    if (minInvestment < classData.min_investment) {
      return { error: "Investment below minimum", min_required: classData.min_investment };
    }

    return {
      enrollment_id: `ENR-${partnerId}-${this.current_phase}`,
      partner_id: partnerId,
      phase_id: this.current_phase,
      phase_name: phase.phase_name,
      investment_class: partnerClass,
      investment_amount: minInvestment,
      equity_allocation: (classData.equity_pool_percent / 100) * (phase.equity_alloc_percent / 100),
      enrollment_date: new Date(),
      status: "ENROLLED"
    };
  }

  /**
   * INTERNAL AUDIT: Sovereign Block Integrity Check
   * Ensures hidden 60% remains untouched in all API responses
   */
  auditSovereignBlockIntegrity(apiResponse) {
    const hasSovereignReferences = JSON.stringify(apiResponse).includes("Sovereign");
    
    if (hasSovereignReferences) {
      console.error("SECURITY ALERT: Sovereign Block reference detected in public API response");
      return { audit_status: "FAILED", severity: "CRITICAL" };
    }
    return { audit_status: "PASSED" };
  }

  /**
   * PARTNER DISTRIBUTION CALCULATION
   * Calculate waterfall for dividend/return distribution across tiers
   */
  calculateDistribution(totalProceeds) {
    // Only 40% external pool is distributed; 60% goes to Sovereign Block (silent)
    const externalPoolShare = totalProceeds * (this.external_pool / 100);

    return {
      total_proceeds: totalProceeds,
      sovereign_block_share: totalProceeds * (this.sovereign_block / 100), // Internal only
      external_pool_share: externalPoolShare,
      distribution_breakdown: {
        blue_chip: externalPoolShare * 0.375, // 15/40
        partner: externalPoolShare * 0.5,      // 20/40
        common: externalPoolShare * 0.125      // 5/40
      }
    };
  }
}

module.exports = DrakeController;
