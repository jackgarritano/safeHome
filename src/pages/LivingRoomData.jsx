import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Slider, FormGroup, Button, Box } from '@mui/material';
import { insertRoomData } from '../utils/db';
import SupabaseContext from '../components/SupabaseContext';
import useAuthentication from "../hooks/useAuthentication";
import useQueryParam from '../utils/useQueryParam';
import { useNavigate } from 'react-router-dom';


export default function LivingRoomData() {
	const { authenticated, userId } = useAuthentication();
	const houseId = useQueryParam('house_id');
	const navigate = useNavigate();
	const supabase = useContext(SupabaseContext);
	const [formData, setFormData] = useState({
		room_name: '',
		trip_item_exists: false,
		sharp_corner_exists: false,
		handle_bar_exists: false,
		room_brightness: 10,
		clear_path_to_light_exists: false,
		easy_flashlight_placement_exists: false,
		furniture_out_of_traffic_exists: false,
		easy_access_main_seating_exists: false,
		secured_electrical_cords_exists: false,
		adequate_lighting_exists: false,
		clutter_lead_to_fall_exists: false
	});

	// Handler for inputs change
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => {
			return { ...prevFormData, [name]: value };
		});
	};

	// Handler for slider change
	const handleSliderChange = (fieldName) => (event, newValue) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[fieldName]: newValue,  // dynamic field name
		}));
	};

	// Handler for checkbox change
	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		setFormData((prevFormData) => {
			return { ...prevFormData, ...prevFormData, [name]: checked }
		});
	};

	// Handler for form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		insertRoomData(supabase, formData, houseId, 'living_rooms')
			.then(res => navigate(`/house?id=${houseId}`));
	};


	// Now we build the form UI
	return (
		<Box sx={{ m: 4 }}>

			<form onSubmit={handleSubmit}>
				<h2>Living Room Info</h2>
				{/* <br></br> */}
				<Typography gutterBottom variant="body1">
					What is this room name?
				</Typography>
				{/* Name Input */}
				<TextField
					fullWidth
					margin="normal"
					label="Room Name"
					variant="outlined"
					name="room_name"
					value={formData.room_name}
					onChange={handleInputChange}
				/>
				<br></br>
				<br></br>

				{/* Mobility Slider */}
				<Box sx={{ my: 2 }}>
					<Typography gutterBottom variant="body1">
						How bright is the room?
					</Typography>
					<Slider
						aria-label="Room Brightness"
						valueLabelDisplay="auto"
						step={1}
						marks
						min={1}
						max={10}
						name="room_brightness"
						value={formData.room_brightness}
						onChange={handleSliderChange('room_brightness')}
					/>
				</Box>

				{/* Impairments Checkboxes */}
				<FormControl component="fieldset" margin="normal">
					<Typography gutterBottom variant="body1">
						Check the boxes for the statements that are true for your current room.
					</Typography>
					<FormGroup>
						<FormControlLabel
							control={<Checkbox checked={formData.trip_item_exists} onChange={handleCheckboxChange} name="trip_item_exists" />}
							label="There are items that could potentially come loose and cause tripping."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.sharp_corner_exists} onChange={handleCheckboxChange} name="sharp_corner_exists" />}
							label="There are sharp corners that could cause harm when tripping."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.handle_bar_exists} onChange={handleCheckboxChange} name="handle_bar_exists" />}
							label="There are handlebar/rails that the elderly can hold on to."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.clear_path_to_light_exists} onChange={handleCheckboxChange} name="clear_path_to_light_exists" />}
							label="The flashlights are in easy-to-find places in case of power outages."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.furniture_out_of_traffic_exists} onChange={handleCheckboxChange} name="furniture_out_of_traffic_exists" />}
							label="Coffee tables, magazine racks, plant stands, and other furniture pieces are out of high-traffic areas."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.easy_access_main_seating_exists} onChange={handleCheckboxChange} name="easy_access_main_seating_exists" />}
							label="The main seating is easy to get in and out of."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.secured_electrical_cords_exists} onChange={handleCheckboxChange} name="secured_electrical_cords_exists" />}
							label="Electrical cords and other wires are secured out of walking paths."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.adequate_lighting_exists} onChange={handleCheckboxChange} name="adequate_lighting_exists" />}
							label="The lighting is adequate for reading and other activities to prevent eye strain."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.clutter_lead_to_fall_exists} onChange={handleCheckboxChange} name="clutter_lead_to_fall_exists" />}
							label="There are obstacles or clutter that could lead to falls."
						/>
					</FormGroup>
				</FormControl>


				<Box sx={{ marginTop: 3 }}> {/* Adjusts margin to your preference */}
					<Button type="submit" variant="contained" color="primary">
						Submit
					</Button>
				</Box>
			</form>
		</Box>
	);
}