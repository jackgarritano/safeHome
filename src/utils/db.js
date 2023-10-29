export { insertOnboardingData, insertHouseData, insertBedroomData };

async function insertOnboardingData(supabase, formData, id) {
	const upsertData = {
		id,
		name: formData['name'],
		age: formData['age'],
		mobility_level: formData['mobility_level'],
		eyesight: formData['eyesight'],
		muscle_strength: formData['muscle_strength'],
		past_fall_history: formData['impairments']['past_fall_history'],
		assistive_devices_usage: formData['impairments']['assistive_devices_usage'],
		incontinence: formData['impairments']['incontinence']
	};
	const { data, error } = await supabase
		.from('user_info')
		.upsert(upsertData)
		.select()
	console.log(error);
}


async function insertHouseData(supabase, formData, id) {
	const { data, error } = await supabase
		.from('houses')
		.upsert({ user_id: id, ...formData })
		.select()
}

async function insertBedroomData(supabase, formData, id) {
	const { data, error } = await supabase
		.from('bedrooms')
		.upsert({ house_id: id, ...formData })
		.select()
	console.log('error', error);
}


/*TODO:
Need to get all houses for a given user id
Need to get all rooms for a given house id
*/

async function getAllHouses(supabase, user_id) {
	const { data, error } = await supabase
		.from('houses')
		.select(`
			*,
			bathrooms (*),
			bedrooms (*),
			kitchens (*),
			living_rooms (*),
			stairs (*),
		`)
		.eq('user_id', user_id)
}