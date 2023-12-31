import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Slider, FormGroup, Button, Box } from '@mui/material';
import { insertRoomData } from '../utils/db';
import SupabaseContext from '../components/SupabaseContext';
import useAuthentication from "../hooks/useAuthentication";
import useQueryParam from '../utils/useQueryParam';
import { useNavigate } from 'react-router-dom';


export default function BathroomData() {
	const {authenticated, userId} = useAuthentication();
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
		nonslip_mats_exists: false,
		raised_toilet_exists: false,
		support_bars_exists: false,
        regulated_water_temp_exists: false,
        adequate_ventilation_exists: false
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
			return { ...prevFormData,  ...prevFormData, [name]: checked }
		});
	};

    // Handler for form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		insertRoomData(supabase, formData, houseId, 'bathrooms')
			.then(res => navigate(`/house?id=${houseId}`));
	};


	// Now we build the form UI
	return (
		<Box sx={{ m: 4 }}>
			
			<form onSubmit={handleSubmit}>
				<h2>Bathroom Info</h2>
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
							control={<Checkbox checked={formData.nonslip_mats_exists} onChange={handleCheckboxChange} name="nonslip_mats_exists" />}
							label="There are nonslip mats both inside and outside of the shower stalls/bathtub."
                        />
                        <FormControlLabel
							control={<Checkbox checked={formData.raised_toilet_exists} onChange={handleCheckboxChange} name="raised_toilet_exists" />}
							label="There is a raised toilet seat, or one with armrests available."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.support_bars_exists} onChange={handleCheckboxChange} name="support_bars_exists" />}
							label="There are support bars in the shower or tub and next to the toilet."
						/>
                        <FormControlLabel
							control={<Checkbox checked={formData.regulated_water_temp_exists} onChange={handleCheckboxChange} name="regulated_water_temp_exists" />}
							label="The water temperature is regulated to prevent scalding."
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.adequate_ventilation_exists} onChange={handleCheckboxChange} name="adequate_ventilation_exists" />}
							label="The lighting and ventilation are adequate to maintain comfort and prevent mold growth."
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