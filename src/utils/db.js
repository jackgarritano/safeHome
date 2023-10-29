export {insertOnboardingData, insertHouseData};

async function insertOnboardingData(supabase, formData, id){
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
	const {data, error} = await supabase
		.from('user_info')
		.upsert(upsertData)
		.select()
	console.log(error);
}


async function insertHouseData(supabase, formData, id){
	console.log('formdata: ', formData);
	const {data, error} = await supabase
		.from('houses')
		.upsert({id, ...formData})
		.select()
	console.log(error);
}