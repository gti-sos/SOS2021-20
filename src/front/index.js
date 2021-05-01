import App from './App.svelte';

if (!window.location.hash || window.location.hash == '#') {
    history.replaceState(undefined, undefined, '#/')
}

const app = new App({
	target: document.body,
	props: {
	
	}
});

export default app;