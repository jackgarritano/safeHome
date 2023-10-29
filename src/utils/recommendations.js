export {
	generateBathroomRecs,
	generateBedroomRecs,
	generateHouseRecs,
	generateKitchenRecs,
	generateLivingRoomRecs,
	generateStairsRecs
};

function generateHouseRecs(
	{
		name,
		age,
		mobility_level,
		eyesight,
		muscle_strength,
		past_fall_history,
		assistive_devices_usage,
		incontinence
	},
	{
		num_people,
		num_elderly,
		type_house,
		temp,
		num_floors
	}) {
	const recommendations = [];


	// Check the type of house to provide specific recommendations
	if (type_house === 'apartment/condo') {
		recommendations.push("Consult with your building management about the possibility of adding additional safety features in common areas, such as handrails in hallways and ramps at entrances.");
	} else if (type_house === 'house') {
		recommendations.push("Consider a professional home safety assessment to identify potential areas for improvement, such as adding ramps, stair lifts, or widening doorways for better accessibility.");
	}

	// Recommendations for houses in areas with extreme temperatures
	if (temp === 'hot') {
		recommendations.push("Ensure the home is equipped with adequate air conditioning. During heatwaves, check in more frequently if elderly residents are living alone.");
	} else if (temp === 'cold') {
		recommendations.push("Ensure proper heating is installed and functioning in all rooms. Consider insulating windows and doors to prevent drafts.");
	}

	// If the house has multiple floors, address the associated risks, especially for elderly residents
	if (num_floors > 1) {
		recommendations.push("Install sturdy handrails on both sides of staircases. For those with mobility issues, consider adding a chair lift or an elevator.");
	}

	// Special considerations based on the number of elderly residents
	if (num_elderly > 0) {
		recommendations.push("Ensure that pathways are clear of cords and clutter to prevent tripping hazards. Area rugs should be secured to the floor to avoid slips.");
		recommendations.push("Install grab bars in essential areas like bathrooms and consider bedside support rails. Make sure living spaces are well-lit to aid those with poor eyesight.");
		recommendations.push("Keep a list of emergency contacts in a central location. For those with more serious health concerns, consider a medical alert system for immediate assistance.");
	}

	// If there's a history of falls or health concerns, provide recommendations accordingly
	if (past_fall_history) {
		recommendations.push("Place non-slip mats under area rugs and add anti-slip coatings to tile or wooden floors.");
	}
	if (incontinence) {
		recommendations.push("Plan for easy access to the bathroom, possibly adjusting bedroom arrangements or considering nighttime lighting solutions.");
	}

	// General wellness and safety checks based on the number of people in the house
	if (num_people > 4) {
		recommendations.push("Regularly check smoke detectors and carbon monoxide alarms, ensuring they are functional in all main areas and sleeping quarters.");
	}

	return recommendations;
}


function generateBedroomRecs(
	{
		name,
		age,
		mobility_level,
		eyesight,
		muscle_strength,
		past_fall_history,
		assistive_devices_usage,
		incontinence
	},
	{
		num_people,
		num_elderly,
		type_house,
		temp,
		num_floors },

	{
		house_id,
		trip_item_exists,
		sharp_corner_exists,
		handle_bar_exists,
		room_brightness,
		clear_path_to_light_exists,
		easy_flashlight_placement_exists,
		lamp_within_reach_exists,
		lit_bed_to_bath_exists,
		secured_carpets_exists,
		bed_telephone_access_exists,
		trip_bed_to_bath_exists
	}) {
	const recommendations = [];

	// Personal information concerns
	if (age >= 65 && mobility_level <= 3) {
		recommendations.push("Consider a bedroom on the first floor to avoid stairs.");
	}

	if (eyesight <= 3 && room_brightness <= 5) {
		recommendations.push("Increase room brightness to prevent eye strain. Consider higher lumen light bulbs or additional lighting fixtures.");
	}

	if (past_fall_history && !secured_carpets_exists) {
		recommendations.push("Secure all carpets and rugs to the floor to reduce trip hazards.");
	}

	if (assistive_devices_usage && !handle_bar_exists) {
		recommendations.push("Install handlebars/rails around the bedroom and bathroom area to assist with mobility.");
	}

	if (incontinence && !lit_bed_to_bath_exists) {
		recommendations.push("Ensure the path from the bed to the bathroom is well-lit at night, possibly with motion-activated lights.");
	}

	// General safety concerns based on the safety questionnaire
	if (trip_item_exists) {
		recommendations.push("Remove or secure any items that could potentially come loose and cause tripping.");
	}

	if (sharp_corner_exists) {
		recommendations.push("Cover sharp corners with padding or guards to prevent injury in case of a fall.");
	}

	if (!clear_path_to_light_exists) {
		recommendations.push("Rearrange furniture to create clear paths to light switches that aren't near room entrances.");
	}

	if (!easy_flashlight_placement_exists) {
		recommendations.push("Place flashlights in easy-to-find places in case of power outages.");
	}

	if (!lamp_within_reach_exists) {
		recommendations.push("Keep a lamp within reach of your bed to use when getting up in the middle of the night.");
	}

	if (!bed_telephone_access_exists) {
		recommendations.push("Ensure a telephone is accessible from the bed in case of emergencies.");
	}

	if (trip_bed_to_bath_exists) {
		recommendations.push("Clear any trip hazards between the bed and the bathroom or closet.");
	}

	// Check if the room's temperature is adequate for the elderly
	if (temp < 64.4 || temp > 75.2) { // Temperatures in Fahrenheit
		recommendations.push("Maintain a room temperature between 64.4 and 75.2 degrees Fahrenheit for optimal comfort and safety.");
	}

	// If the house has multiple floors and elderly individuals, consider specific safety precautions
	if (num_floors > 1 && num_elderly > 0) {
		recommendations.push("Ensure stairways are equipped with secure handrails, adequate lighting, and non-slip surfaces.");
	}
	return recommendations;
}


function generateKitchenRecs(
	{
		name,
		age,
		mobility_level,
		eyesight,
		muscle_strength,
		past_fall_history,
		assistive_devices_usage,
		incontinence
	},
	{
		num_people,
		num_elderly,
		type_house,
		temp,
		num_floors
	},
	{
		trip_item_exists,
		sharp_corner_exists,
		handle_bar_exists,
		room_brightness,
		clear_path_to_light_exists,
		easy_flashlight_placement_exists,
		reachable_kitchen_items_exists,
		reachable_extinguisher_exists,
		nonslip_rugs_exists

	}) {
	const recommendations = [];

	// Check if items in the kitchen are within reach
	if (!reachable_kitchen_items_exists) {
		recommendations.push("Rearrange kitchen items to ensure that they are easily accessible. Frequently used items should be placed on lower shelves, reducing the need for reaching or bending.");
	}

	// Fire safety in the kitchen
	if (!reachable_extinguisher_exists) {
		recommendations.push("Install a fire extinguisher in an easily accessible location in the kitchen. Make sure all occupants know how to use it in case of a fire.");
	}

	// Assess the floor's safety
	if (!nonslip_rugs_exists) {
		recommendations.push("Replace regular rugs with non-slip rugs or add non-slip mats underneath existing rugs to prevent slipping hazards.");
	}


	// Check the need for handlebars based on personal mobility concerns
	if (!handle_bar_exists && mobility_level < 3) { // assuming 1 to 5 scale, lower means less mobility
		recommendations.push("Install handlebars or grab rails around the kitchen, particularly in areas where support is necessary for standing from a seated position.");
	}

	// Assess lighting in the kitchen, which is crucial for individuals with compromised eyesight
	if (room_brightness < 3) { // assuming scale of 1 to 5, lower means less brightness
		recommendations.push("Improve lighting in the kitchen, ensuring that all areas are well-lit, with extra lighting under cabinets if necessary.");
	}

	// Consider the history of past falls
	if (past_fall_history) {
		recommendations.push("Clear the kitchen area of any clutter and ensure that pathways are wide and unobstructed. Consider the layout and organize the space to minimize trip hazards.");
	}

	// If the person uses assistive devices, ensure the kitchen accommodates these
	if (assistive_devices_usage) {
		recommendations.push("Make sure the kitchen allows for adequate maneuverability with assistive devices like walkers or wheelchairs. This may require repositioning furniture or widening pathways.");
	}

	// Special considerations if there is a concern about incontinence
	if (incontinence) {
		recommendations.push("Plan the kitchen layout to allow quick and easy access to the bathroom. This may influence where the individual spends most of their time and how they navigate the space.");
	}

	return recommendations;
}


function generateLivingRoomRecs(
	{
		name,
		age,
		mobility_level,
		eyesight,
		muscle_strength,
		past_fall_history,
		assistive_devices_usage,
		incontinence
	},
	{
		num_people,
		num_elderly,
		type_house,
		temp,
		num_floors
	},
	{
		id,
		house_id,
		trip_item_exists,
		sharp_corner_exists,
		handle_bar_exists,
		room_brightness,
		clear_path_to_light_exists,
		easy_flashlight_placement_exists,
		furniture_out_of_traffic_exists,
		easy_access_main_seating_exists,
		secured_electrical_cords_exists,
		adequate_lighting_exists,
		clutter_lead_to_fall_exists,

	}
) {
	const recommendations = [];

	// Check for furniture potentially causing obstruction or hazards
	if (!furniture_out_of_traffic_exists) {
		recommendations.push("Consider rearranging furniture to ensure clear walkways, minimizing the risk of bumps and falls. Keep high-traffic areas free from obstacles such as coffee tables and magazine racks.");
	}

	// Assess if the main seating is accessible and easy to use
	if (!easy_access_main_seating_exists) {
		recommendations.push("Adjust the main seating to be more accessible. Consider chairs with armrests for support and seats that are at a good height for easy sitting and standing.");
	}

	// Check if electrical cords are safely secured and out of the way
	if (!secured_electrical_cords_exists) {
		recommendations.push("Secure all electrical cords out of walking paths to avoid tripping hazards. Use cord organizers or covers as necessary.");
	}

	// Check the adequacy of lighting for various activities
	if (!adequate_lighting_exists) {
		recommendations.push("Improve lighting conditions, especially in areas of the room used for reading or other activities that require good visibility. Adequate lighting helps prevent eye strain and accidents.");
	}

	// Determine if clutter or other obstacles are present that could cause falls
	if (clutter_lead_to_fall_exists) {
		recommendations.push("It's important to regularly clear any clutter from the floor and ensure there are no obstacles that could lead to trips and falls.");
	}

	// Additional checks can be made for more specific conditions or user needs
	// For instance, if the user has a history of falls, specific muscle weakness, poor eyesight, etc., additional precautions might be recommended.

	// Example: Check if there are sharp corners that could cause harm
	if (sharp_corner_exists) {
		recommendations.push("For added safety, particularly if falls have occurred in the past, consider installing corner guards on sharp furniture edges.");
	}

	// Example: Evaluate the need for handlebars or support, especially for individuals with mobility issues
	if (!handle_bar_exists && mobility_level < 3) { // Assuming mobility_level is on a scale of 1 to 5
		recommendations.push("Based on your mobility difficulties, installing handlebars in certain areas of the living room could provide necessary support and help prevent falls.");
	}

	// Depending on the level of detail in the responses, you can continue to add more conditions and appropriate recommendations to enhance the living room's safety and comfort.

	return recommendations;
}

function generateBathroomRecs(
	{
		name,
		age,
		mobility_level,
		eyesight,
		muscle_strength,
		past_fall_history,
		assistive_devices_usage,
		incontinence
	},
	{
		num_people,
		num_elderly,
		type_house,
		temp,
		num_floors
	},
	{
		id,
		house_id,
		trip_item_exists,
		sharp_corner_exists,
		handle_bar_exists,
		room_brightness,
		clear_path_to_light_exists,
		easy_flashlight_placement_exists,
		nonslip_mats_exists,
		raised_toilet_exists,
		support_bars_exists,
		regulated_water_temp_exists,
		adequate_ventilation_exists,

	}
) {
	const recommendations = [];

	// Check for the presence of nonslip mats in critical areas
	if (!nonslip_mats_exists) {
		recommendations.push("Place nonslip mats both inside and outside of the shower stall or bathtub to prevent slips and falls.");
	}

	// Assess the need for a specialized toilet seat for ease of use
	if (!raised_toilet_exists) {
		recommendations.push("Consider installing a raised toilet seat or one with armrests for greater comfort and support during transfers.");
	}

	// Verify the installation of support bars in key areas for stability
	if (!support_bars_exists) {
		recommendations.push("Install support bars in the shower or tub area and next to the toilet for added stability and support.");
	}

	// Ensure water temperature control to prevent potential scalding incidents
	if (!regulated_water_temp_exists) {
		recommendations.push("Set up a water temperature regulator or anti-scald device to maintain safe water temperature and prevent burns.");
	}

	// Confirm proper lighting and ventilation
	if (!adequate_ventilation_exists) {
		recommendations.push("Ensure adequate ventilation and lighting in the bathroom to prevent mold growth and maintain good visibility, especially for individuals with reduced eyesight.");
	}

	// Additional checks based on personal history or specific health concerns
	// Example: Evaluate the risk of trips and falls due to items on the floor or sharp corners
	if (trip_item_exists) {
		recommendations.push("Keep the bathroom floor clear of items that could cause tripping. Consider additional storage or organization solutions to maintain a clear space.");
	}

	if (sharp_corner_exists) {
		recommendations.push("For households with individuals at risk of falls, padding or guards for sharp corners in the bathroom can help prevent injuries.");
	}

	// The function can be further expanded with more personalized recommendations based on the comprehensive assessment of the individual's health status, past incidents, and specific needs within the bathroom setting.

	return recommendations;
}


function generateStairsRecs(
	{
		name,
		age,
		mobility_level,
		eyesight,
		muscle_strength,
		past_fall_history,
		assistive_devices_usage,
		incontinence
	},
	{
		num_people,
		num_elderly,
		type_house,
		temp,
		num_floors
	},
	{
		id,
		house_id,
		trip_item_exists,
		sharp_corner_exists,
		handle_bar_exists,
		room_brightness,
		clear_path_to_light_exists,
		easy_flashlight_placement_exists,
		handrails_exists,
		even_steps_exists,
		adequate_lighting_exists,
		clear_of_trip_hazards_exists,
		visible_edges_exists,
	}
) {
	const recommendations = [];

	// Check the existence of handrails
	if (!handrails_exists) {
		recommendations.push("Install handrails on both sides of the stairways. Handrails are essential for balance and support.");
	}

	// Assess the condition of the steps
	if (!even_steps_exists) {
		recommendations.push("Repair any uneven, loose, or broken areas on steps to prevent missteps and potential falls.");
	}

	// Verify the adequacy of lighting around stairways
	if (!adequate_lighting_exists) {
		recommendations.push("Enhance lighting in the stairway area. Consider easy-to-reach switches, motion-activated lights, or well-placed wall sconces to illuminate every step clearly.");
	}

	// Ensure stairways are clear of potential trip hazards
	if (!clear_of_trip_hazards_exists) {
		recommendations.push("Keep staircases free of clutter or any items that could lead to tripping. Regularly check for objects left on the stairs.");
	}

	// Make sure the edges of the steps are visible
	if (!visible_edges_exists) {
		recommendations.push("Improve the visibility of step edges by using safety treads or contrasting paint. Clearly visible steps help prevent falls, especially for individuals with impaired vision.");
	}

	// Additional checks can be based on personal health history or specific concerns, e.g., past fall incidents.
	if (past_fall_history) {
		recommendations.push("Given the history of falls, consider additional safety measures like stairlifts, non-slip treads, or refitting stairs with shallower steps.");
	}

	// Further personalization could be based on the number of elderly individuals in the house or specific mobility concerns.
	if (num_elderly > 1 || assistive_devices_usage) {
		recommendations.push("For households with multiple seniors or those using assistive devices, explore more extensive stair modifications for enhanced safety.");
	}

	// The function can be expanded further based on a more detailed assessment of the individual's health status, mobility, and the house's specifics.

	return recommendations;
}