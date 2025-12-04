// routing_rules.h
#pragma once

#include <vector>

// Class to hold comprehensive routing-related constants and rules
class RoutingRules {
public:
    // Constructor to initialize rules with sensible defaults
    RoutingRules(
        double res = 0.1, double min_tw = 0.15, double min_ts = 0.15,
        double pad_rad = 0.4,
        int init_layers = 2, int total_layers = 5, double v_cost = 5.0,
        double min_via_d = 0.3, double min_via_ar = 0.1, double min_comp_clear = 0.5,
        double ss_sm_clear = 0.1, double diff_spacing = 0.2, double diff_len_tol = 0.1,
        double max_tl = 1000.0, double min_tl = 0.5, double target_imp = 50.0,
        int reroute_tries = 5, int border_margin = 20)
        : grid_resolution(res),
          min_trace_width(min_tw),
          min_trace_spacing(min_ts),
          pad_blocking_radius(pad_rad),
          effective_blocked_radius(pad_rad + min_ts),
          max_initial_layers(init_layers),
          max_total_layers(total_layers),
          via_cost(v_cost),
          min_via_drill_diameter(min_via_d),
          min_via_annular_ring(min_via_ar),
          min_component_clearance(min_comp_clear),
          silkscreen_to_solder_mask_clearance(ss_sm_clear),
          differential_pair_spacing(diff_spacing),
          differential_pair_length_tolerance(diff_len_tol),
          max_trace_length(max_tl),
          min_trace_length(min_tl),
          target_impedance(target_imp),
          max_reroute_attempts(reroute_tries),
          grid_border_margin(border_margin)
    {
        preferred_layer_directions.reserve(4);
        preferred_layer_directions.push_back(0); // layer 0: horizontal
        preferred_layer_directions.push_back(1); // layer 1: vertical
        // additional layers may be appended externally
    }


    // Public read-only members 
    // --- Grid and Basic Dimensions ---
    const double grid_resolution;            // Grid resolution in mm (e.g., 0.1 mm)
    const double min_trace_width;            // Minimum trace width in mm
    const double min_trace_spacing;          // Minimum trace-to-trace/pad clearance in mm
    const double pad_blocking_radius;        // Radius around pads to block for routing in mm
    const double effective_blocked_radius;   // Calculated blocked radius for pads (pad_blocking_radius + min_trace_spacing)

    // --- Layer Management ---
    const int max_initial_layers;            // Starting number of copper layers for routing grid
    const int max_total_layers;              // Maximum allowed layers for the entire board
    const double via_cost;                   // Additional cost for using a via in routing algorithms
    std::vector<int> preferred_layer_directions; // e.g., {0: horizontal, 1: vertical, ...} (0 for H, 1 for V)

    // --- Manufacturability (DFM) ---
    const double min_via_drill_diameter;     // Minimum via drill diameter in mm
    const double min_via_annular_ring;       // Minimum copper ring around via drill in mm
    const double min_component_clearance;    // Minimum space between component bodies (courtyard) in mm
    const double silkscreen_to_solder_mask_clearance; // Min distance from silkscreen to solder mask opening

    // --- Signal Integrity (SI) & Performance ---
    const double differential_pair_spacing;      // Ideal spacing for differential pairs in mm
    const double differential_pair_length_tolerance; // Max length difference for diff pairs in mm
    const double max_trace_length;               // Maximum allowed trace length for critical nets in mm
    const double min_trace_length;               // Minimum allowed trace length for critical nets in mm (to avoid antenna effect)
    const double target_impedance;               // Target impedance for controlled impedance nets in Ohms

    // --- Router Behavior ---
    const int max_reroute_attempts;          // Max tries for rerouting a segment before giving up
    const int grid_border_margin;            // Extra margin around the board boundary in grid units

    //private variables
    //use get set 
};
