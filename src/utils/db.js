export {insertOnboardingData};

async function insertOnboardingData(supabase, formData, id){
	const upsertData = {
		...formData,
	};
	if(id){
		upsertData['id'] = id;
	}
	const {data, error} = await supabase
		.from('user_info')
		.upsert(upsertData)
		.select()
}