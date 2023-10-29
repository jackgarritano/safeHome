import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Slider, FormGroup, Button, Box } from '@mui/material';
import { insertBedroomData } from '../utils/db';
import SupabaseContext from '../components/SupabaseContext';
import useAuthentication from "../hooks/useAuthentication";
import useQueryParam from '../utils/useQueryParam';




export default function BedroomData() {
	const {authenticated} = useAuthentication();
	const houseId = useQueryParam('house_id');
	const location = useLocation();
	const supabase = useContext(SupabaseContext);
	const [formData, setFormData] = useState({
		room_name: '',
		trip_item_exists: false,
		sharp_corner_exists: false,
		handle_bar_exists: false,
		room_brightness: 10,
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
			return { ...prevFormData, [name]: checked }
		});
	};

    // Handler for form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		insertBedroomData(supabase, formData, houseId);
	};


	// Now we build the form UI
	return (
		<Box sx={{ m: 4 }}>
			
			<form onSubmit={handleSubmit}>
				<h2>Bedroom Info</h2>
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
							label="There are handlebars/rails that the elderly can hold on to."
                        />
                        <FormControlLabel
							control={<Checkbox checked={formData.clear_path_to_light_exists} onChange={handleCheckboxChange} name="clear_path_to_light_exists" />}
							label="The flashlights are in easy-to-find places in case of power outages."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.easy_flashlight_placement_exists} onChange={handleCheckboxChange} name="easy_flashlight_placement_exists" />}
							label="There is a lamp within reach of your bed in case you need to get up in the middle of the night."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.lamp_within_reach_exists} onChange={handleCheckboxChange} name="lamp_within_reach_exists" />}
							label="The path from the bed to the bathroom is well-lit for safe navigation at night."
                        />
                        <FormControlLabel
							control={<Checkbox checked={formData.lit_bed_to_bath_exists} onChange={handleCheckboxChange} name="lit_bed_to_bath_exists" />}
							label="All carpets and area rugs are secured to the floor to prevent slips or trips."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.secured_carpets_exists} onChange={handleCheckboxChange} name="secured_carpets_exists" />}
							label="There is a telephone accessible from the bed in case of emergencies."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.bed_telephone_access_exists} onChange={handleCheckboxChange} name="bed_telephone_access_exists" />}
							label="There are trip hazards between the bed and the bathroom or closet."
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