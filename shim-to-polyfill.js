"use module"
export async function ShimToPolyfill( globalName, fallbackModule){
	const g= globalThis[ globalName]
	if( g!== undefined){
		return g
	}
	if( fallbackModule.then){
		fallbackModule= await fallbackModule
	}else{
		fallbackModule= await import( fallbackModule)
	}
	const pick=
		fallbackModule[ globalName]||
		(fallbackModule.default&& fallbackModule.default[ globalName])||
		fallbackModule.default

	if( !pick){
		throw new Error( "Could not find ${globalName}")
	}
	return pick
}
export {
	ShimToPolyfill as default,
	ShimToPolyfill as shimToPolyfill
}
