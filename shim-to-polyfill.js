"use module"
export async function ShimToPolyfill( globalName, fallbackModuleModule){
	const g= globalThis[ globalName]
	if( g!== undefined){
		return g
	}
	const
		m= await import( fallbackModule),
		pick= m[ globalName]|| m.default[ globalName]|| m.default
	if( !pick){
		throw new Error( "Could not find ${globalName}")
	}
	return pick
}
export {
	ShimToPolyfill as default,
	ShimToPolyfill as shimToPolyfill
}
