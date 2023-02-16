// Set and remove error-status for the specified category
export function setErrorStatus(changeErrorStatusList, category, msg) {
	changeErrorStatusList((errorStatusList) => ({...errorStatusList, [category]: msg})) ;
}
export function removeErrorStatus(changeErrorStatusList, category) {
	changeErrorStatusList((errorStatusList) => {
		const newerrorStatusList = {...errorStatusList} ;
		delete newerrorStatusList[category] ;
		return newerrorStatusList ;
	}) ;
}

// Retrieve active (non-blank) error
export function getError(errorStatusList) {
	const values = Object.values(errorStatusList) ;
	if (values.length === 0) return null ;
	let activeMsg = '' ;
	for (const msg of values) {
		if (msg) activeMsg = msg ;
	}
	return activeMsg ;
}

// Get HTML-formatted message
export function getMessageHtml(msg) {
	if (!msg) return <div className="text-center">&nbsp;</div> ;
	return <div className='text-center text-danger'>{msg}</div> ;
}

// Returns boolean denoting whether there is currently an error
export function isError(errorStatusList) {
	return (getError(errorStatusList) !== null) ;
}