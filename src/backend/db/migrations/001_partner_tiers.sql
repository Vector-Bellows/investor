-- src/backend/db/migrations/001_partner_tiers.sql
-- PostgreSQL Schema for Vector Bellows 18GW Partner Management

CREATE SCHEMA IF NOT EXISTS vectorbellows;

-- Investment Classes Reference Table
CREATE TABLE vectorbellows.investment_classes (
    class_id VARCHAR(10) PRIMARY KEY,
    tier_name VARCHAR(100) NOT NULL,
    description TEXT,
    min_investment BIGINT NOT NULL,
    equity_pool_percent DECIMAL(5, 2) NOT NULL,
    access_level SMALLINT NOT NULL,
    compliance_required VARCHAR(50) NOT NULL,
    phase_participation VARCHAR(20),
    distribution_rights BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10-Phase Roadmap Reference Table
CREATE TABLE vectorbellows.phases (
    phase_id SMALLINT PRIMARY KEY,
    phase_name VARCHAR(100) NOT NULL,
    node_target BIGINT NOT NULL,
    node_pool_percent DECIMAL(5, 2),
    equity_alloc_percent DECIMAL(5, 2) NOT NULL,
    expected_completion VARCHAR(20),
    status VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partners/Investors Table
CREATE TABLE vectorbellows.partners (
    partner_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_name VARCHAR(200) NOT NULL,
    investment_class VARCHAR(10) NOT NULL REFERENCES vectorbellows.investment_classes(class_id),
    net_worth BIGINT,
    annual_income BIGINT,
    accreditation_verified BOOLEAN DEFAULT false,
    accreditation_date TIMESTAMP,
    enrollment_status VARCHAR(50) DEFAULT 'PENDING',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Phase Enrollments (Track which partners are in which phases)
CREATE TABLE vectorbellows.phase_enrollments (
    enrollment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID NOT NULL REFERENCES vectorbellows.partners(partner_id) ON DELETE CASCADE,
    phase_id SMALLINT NOT NULL REFERENCES vectorbellows.phases(phase_id),
    investment_amount BIGINT NOT NULL,
    equity_allocation DECIMAL(10, 4) NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'ENROLLED',
    UNIQUE(partner_id, phase_id)
);

-- Capital Calls (Automated call system)
CREATE TABLE vectorbellows.capital_calls (
    call_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id SMALLINT NOT NULL REFERENCES vectorbellows.phases(phase_id),
    partner_id UUID NOT NULL REFERENCES vectorbellows.partners(partner_id) ON DELETE CASCADE,
    called_amount BIGINT NOT NULL,
    due_date TIMESTAMP NOT NULL,
    payment_date TIMESTAMP,
    status VARCHAR(50) DEFAULT 'ISSUED',
    call_order SMALLINT, -- Step-up escalation order
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rebuy Status Log (Track equity reverts to Sovereign Block)
CREATE TABLE vectorbellows.rebuy_status (
    rebuy_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID NOT NULL REFERENCES vectorbellows.partners(partner_id) ON DELETE CASCADE,
    triggered_by VARCHAR(50) NOT NULL, -- 'CAPITAL_CALL_DEFAULT', etc.
    equity_forfeited DECIMAL(10, 4) NOT NULL,
    returned_to VARCHAR(100) DEFAULT 'A.V. Strategic Asset Trust',
    previous_status VARCHAR(50),
    new_status VARCHAR(50) DEFAULT 'OBSERVER',
    voting_rights BOOLEAN DEFAULT false,
    triggered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Node Telemetry & Phase Progress
CREATE TABLE vectorbellows.node_telemetry (
    telemetry_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id SMALLINT NOT NULL REFERENCES vectorbellows.phases(phase_id),
    nodes_deployed BIGINT DEFAULT 0,
    nodes_target BIGINT NOT NULL,
    capacity_mw DECIMAL(15, 2) DEFAULT 0,
    capacity_target_mw DECIMAL(15, 2) NOT NULL,
    thermal_efficiency DECIMAL(5, 2),
    uptime_percent DECIMAL(5, 2),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Distribution Waterfall (For dividend/return calculations)
CREATE TABLE vectorbellows.distribution_waterfall (
    waterfall_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    distribution_period VARCHAR(50) NOT NULL,
    total_proceeds BIGINT NOT NULL,
    sovereign_block_share BIGINT NOT NULL, -- 60% (internal reference only)
    external_pool_share BIGINT NOT NULL,   -- 40% (split among classes)
    blue_chip_allocation BIGINT,
    partner_allocation BIGINT,
    common_allocation BIGINT,
    distribution_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEC 506(c) Compliance Log
CREATE TABLE vectorbellows.sec_compliance (
    compliance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID NOT NULL REFERENCES vectorbellows.partners(partner_id) ON DELETE CASCADE,
    accreditation_rule VARCHAR(50) NOT NULL,
    net_worth_qualified BOOLEAN,
    income_qualified BOOLEAN,
    documentation_received BOOLEAN,
    verification_status VARCHAR(50) DEFAULT 'PENDING',
    verified_at TIMESTAMP,
    verified_by VARCHAR(100),
    expires_at TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_partners_class ON vectorbellows.partners(investment_class);
CREATE INDEX idx_partners_status ON vectorbellows.partners(status);
CREATE INDEX idx_enrollments_phase ON vectorbellows.phase_enrollments(phase_id);
CREATE INDEX idx_enrollments_partner ON vectorbellows.phase_enrollments(partner_id);
CREATE INDEX idx_capital_calls_partner ON vectorbellows.capital_calls(partner_id);
CREATE INDEX idx_capital_calls_status ON vectorbellows.capital_calls(status);
CREATE INDEX idx_capital_calls_due_date ON vectorbellows.capital_calls(due_date);
CREATE INDEX idx_rebuy_status_partner ON vectorbellows.rebuy_status(partner_id);
CREATE INDEX idx_telemetry_phase ON vectorbellows.node_telemetry(phase_id);
CREATE INDEX idx_compliance_partner ON vectorbellows.sec_compliance(partner_id);

-- Insert Investment Classes Reference Data
INSERT INTO vectorbellows.investment_classes (class_id, tier_name, description, min_investment, equity_pool_percent, access_level, compliance_required, phase_participation, distribution_rights)
VALUES
  ('BCP', 'Blue Chip Class', 'Institutional grid integration partners with access to full 18GW roadmap.', 1000000, 15, 3, 'SEC 506(c) Accredited Investor', '1-10', true),
  ('PRT', 'Partner Class', '10-Phase Strategic Pool; manages node rollout and expansion rights.', 100000, 20, 2, 'SEC 506(c) Accredited Investor', '3-10', true),
  ('CMN', 'Common Class', 'Retail utility; fractional energy returns and efficiency metrics.', 1000, 5, 1, 'General Onboarding', '8-10', false);

-- Insert 10-Phase Roadmap Reference Data
INSERT INTO vectorbellows.phases (phase_id, phase_name, node_target, node_pool_percent, equity_alloc_percent, expected_completion, status, description)
VALUES
  (1, 'Genesis - Owosso, Michigan', 1800, 10, 4, 'Q4 2026', 'COMPLETE', 'Primary subterranean hub; 20ft monolithic geopolymer vault with full VRC lift.'),
  (2, 'Regional Expansion - Great Lakes Cluster', 1800, 10, 4, 'Q2 2027', 'IN_PROGRESS', 'Distributed satellite nodes across Michigan, Ohio, Indiana.'),
  (3, 'Open Enrollment & Refinement', 1800, 10, 4, 'Q3 2027', 'OPEN_ENROLLMENT', 'Winter Refinement complete; Spring Push initiates.'),
  (4, 'Midwest Saturation', 1800, 10, 4, 'Q4 2027', 'PLANNED', 'Fill remaining Midwest capacity.'),
  (5, 'Eastern Seaboard Integration', 2700, 15, 4, 'Q2 2028', 'PLANNED', 'Atlantic corridor nodes; high-density grid resilience.'),
  (6, 'Western Expansion', 2700, 15, 4, 'Q4 2028', 'PLANNED', 'Pacific coast and Mountain West nodes.'),
  (7, 'Grid Redundancy & Hardening', 1800, 10, 4, 'Q2 2029', 'PLANNED', 'Cross-region failover and EMP resilience nodes.'),
  (8, 'Tertiary Grid Deploy', 1800, 10, 4, 'Q4 2029', 'PLANNED', 'Deep rural and frontier nodes.'),
  (9, 'Saturation & Optimization', 1800, 10, 4, 'Q2 2030', 'PLANNED', 'Final gap-filling and efficiency optimization.'),
  (10, 'End Game - 18,000 Node Network', 0, 0, 4, 'Q4 2030', 'PLANNED', 'Full 18GW continental subterranean grid operational.');
