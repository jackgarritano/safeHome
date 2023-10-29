import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Slider, FormGroup, Button, Box } from '@mui/material';
import { insertOnboardingData } from '../utils/db';
import SupabaseContext from '../components/SupabaseContext';
import useAuthentication from "../hooks/useAuthentication";




export default function HouseData() {
	const {authenticated, userId} = useAuthentication();
	const location = useLocation();
	const supabase = useContext(SupabaseContext);
	const [formData, setFormData] = useState({
		name: '',
		trip_item_exists: false,
		sharp_corner_exists: false,
		handle_bar_exists: false,
		room_brightness: '',
		clear_path_to_light_exists: false,
        easy_flashlight_placement_exists: false,
		lamp_within_reach_exists: false,
		lit_bed_to_bath_exists: false,
		secured_carpets_exists: false,
		bed_telephone_access_exists: false,
		trip_bed_to_bath_exists: false
	});

	// Handler for inputs change
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => {
			return { ...prevFormData, [name]: value };
		});
	};

    // Handler for checkbox change
	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		setFormData((prevFormData) => {
			return { ...prevFormData, impairments: { ...prevFormData.impairments, [name]: checked } }
		});
	};

    // Handler for form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		insertHouseData(supabase, formData, userId);
	};


	// Now we build the form UI
	return (
		<Box sx={{ m: 4 }}>
			
			<form onSubmit={handleSubmit}>
				<h2>House Info</h2>
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
					name="name"
					value={formData.name}
					onChange={handleInputChange}
				/>
				<br></br>
				<br></br>
				{/* Impairments Checkboxes */}
				<FormControl component="fieldset" margin="normal">
					<Typography gutterBottom variant="body1">
						Check all boxes that apply to the current room.
					</Typography>
					<FormGroup>
						<FormControlLabel
							control={<Checkbox checked={formData.trip_item_exists} onChange={handleCheckboxChange} name="trip_item_exists" />}
							label="History of past falls"
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.sharp_corner_exists} onChange={handleCheckboxChange} name="sharp_corner_exists" />}
							label="Use of assistive devices"
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.handle_bar_exists} onChange={handleCheckboxChange} name="handle_bar_exists" />}
							label="Incontinence"
                        />
                        <FormControlLabel
							control={<Checkbox checked={formData.clear_path_to_light_exists} onChange={handleCheckboxChange} name="clear_path_to_light_exists" />}
							label="History of past falls"
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.easy_flashlight_placement_exists} onChange={handleCheckboxChange} name="easy_flashlight_placement_exists" />}
							label="Use of assistive devices"
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.lamp_within_reach_exists} onChange={handleCheckboxChange} name="lamp_within_reach_exists" />}
							label="Incontinence"
                        />
                        <FormControlLabel
							control={<Checkbox checked={formData.lit_bed_to_bath_exists} onChange={handleCheckboxChange} name="lit_bed_to_bath_exists" />}
							label="History of past falls"
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.secured_carpets_exists} onChange={handleCheckboxChange} name="secured_carpets_exists" />}
							label="Use of assistive devices"
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.bed_telephone_access_exists} onChange={handleCheckboxChange} name="bed_telephone_access_exists" />}
							label="Incontinence"
                        />
                        <FormControlLabel
							control={<Checkbox checked={formData.trip_bed_to_bath_exists} onChange={handleCheckboxChange} name="trip_bed_to_bath_exists" />}
							label="History of past falls"
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