/*
  # Payment Processing Functions

  1. Functions
    - `increment_project_funds` - Safely increment project amount_raised
    - `update_escrow` - Create or update escrow records
    - `release_escrow_funds` - Release funds for completed milestones

  2. Security
    - Functions use SECURITY DEFINER to safely update records
    - Proper validation and error handling
*/

-- Function to increment project funds atomically
CREATE OR REPLACE FUNCTION increment_project_funds(
  project_id uuid,
  amount numeric
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE projects
  SET
    amount_raised = amount_raised + amount,
    updated_at = now()
  WHERE id = project_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Project not found: %', project_id;
  END IF;
END;
$$;

-- Function to update or create escrow record
CREATE OR REPLACE FUNCTION update_escrow(
  project_id uuid,
  amount numeric
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  escrow_id uuid;
BEGIN
  -- Try to get existing escrow
  SELECT id INTO escrow_id
  FROM escrows
  WHERE escrows.project_id = update_escrow.project_id
  AND status = 'active';

  IF escrow_id IS NULL THEN
    -- Create new escrow
    INSERT INTO escrows (project_id, total_held, total_released, status)
    VALUES (update_escrow.project_id, amount, 0, 'active');
  ELSE
    -- Update existing escrow
    UPDATE escrows
    SET
      total_held = total_held + amount,
      updated_at = now()
    WHERE id = escrow_id;
  END IF;
END;
$$;

-- Function to release escrow funds for a milestone
CREATE OR REPLACE FUNCTION release_escrow_funds(
  milestone_id uuid,
  approved_by uuid
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_milestone record;
  v_escrow record;
  result json;
BEGIN
  -- Get milestone details
  SELECT * INTO v_milestone
  FROM milestones
  WHERE id = milestone_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Milestone not found: %', milestone_id;
  END IF;

  IF v_milestone.status != 'completed' THEN
    RAISE EXCEPTION 'Milestone must be completed before releasing funds';
  END IF;

  -- Get escrow details
  SELECT * INTO v_escrow
  FROM escrows
  WHERE project_id = v_milestone.project_id
  AND status = 'active';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No active escrow found for project';
  END IF;

  IF v_escrow.total_held < v_milestone.amount THEN
    RAISE EXCEPTION 'Insufficient funds in escrow';
  END IF;

  -- Update escrow
  UPDATE escrows
  SET
    total_held = total_held - v_milestone.amount,
    total_released = total_released + v_milestone.amount,
    updated_at = now()
  WHERE id = v_escrow.id;

  -- Create audit log
  INSERT INTO audit_logs (
    entity_type,
    entity_id,
    action,
    performed_by,
    changes
  ) VALUES (
    'escrow',
    v_escrow.id,
    'funds_released',
    approved_by,
    jsonb_build_object(
      'milestone_id', milestone_id,
      'amount', v_milestone.amount,
      'remaining_held', v_escrow.total_held - v_milestone.amount
    )
  );

  result := json_build_object(
    'success', true,
    'amount_released', v_milestone.amount,
    'remaining_held', v_escrow.total_held - v_milestone.amount
  );

  RETURN result;
END;
$$;

-- Add index for faster escrow lookups
CREATE INDEX IF NOT EXISTS idx_escrows_project_status
ON escrows(project_id, status);

-- Add index for donation lookups
CREATE INDEX IF NOT EXISTS idx_donations_donor_status
ON donations(donor_id, status);

CREATE INDEX IF NOT EXISTS idx_donations_project_status
ON donations(project_id, status);
