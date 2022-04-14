<script lang="ts">
    import { onMount } from "svelte";
    import type { User } from "../types";
    import Todos from "./Todos.svelte";
    import Folder from './Folder.svelte';

    let expanded;
    let accessToken = "";
    let loading = true;
    let user: User | null = null;
    let page: "todos" | "contact" = tsvscode.getState()?.page || "todos";

    $: {
        tsvscode.setState({ page });
    }

    let root = [
		{ type: 'file', name: 'quarterly-results.xlsx' },
		{ type: 'file', name: 'treadmill.gif' },
		{ type: 'file', name: 'rope-jumping.gif' },
		{ type: 'file', name: 'cat-roomba.gif' },
		{ type: 'file', name: 'duck-shuffle.gif' },
		{ type: 'file', name: 'monkey-on-a-pig.gif' },
		{ type: 'file', name: 'TODO.md' }
	];


    onMount(async () => {
        window.addEventListener("message", async (event) => {
            const message = event.data;
            
            switch (message.type) {
                case "token":
                    try{
                        accessToken = message.value;
                        console.log("accessToken::", accessToken);
                        const response = await fetch(`${apiBaseUrl}/me/token/${accessToken}`, {
                            headers: {
                                authorization: `Bearer ${accessToken}`,
                            },
                        });
                        const userInfo = await response.json();
                    
                        console.log("userInfo::", userInfo);
                        user = userInfo;
                        user?.githubId = userInfo[0].github_id;
                        user?.id = userInfo[0].id;
                        user?.name = userInfo[0].name;

                        console.log(message.type, user);
                        loading = false;
                    }
                    catch(err){
                        console.log("onMount " + message.type, err.message);
                        loading = false;
                    }
            }
        });

        tsvscode.postMessage({ type: "get-token", value: undefined });
    });
</script>
<style>
    :global(*) {
		margin: 0;
		padding: 0;
	}
	
	:global([data-accordion]) {
		list-style: none;
		margin-bottom: 1rem;
	}

	:global([data-accordion-item] button) {
		border: 0;
		border-bottom: 1px solid #e0e0e0;
		background: none;
		font: inherit;
		line-height: inherit;
		color: inherit;
		cursor: pointer;
		padding: 0.5rem 1rem;
		width: 100%;
		text-align: left;
		margin: 0;
	}

	:global([data-accordion-item] [role="region"]) {
		padding: 1rem;
	}

	.container{
        width: 100%;
        margin: 0 auto; /* Center the DIV horizontally */
    }
    .fixed-footer{
        width: 100%;
        position: fixed;        
        background: #333;
        padding: 0px;
        color: #fff;
    }
    .fixed-footer{
        bottom: 0;
    }    
    /* Some more styles to beutify this example */
    .container p{
        line-height: 200px; /* Create scrollbar to test positioning */
    }

</style>


{#if loading}
<div>Scanning...</div>
{:else if user}
	<div class="container">
		<Folder name="BlinkTrustAI" files={root} expanded/>
	</div>    
	<div class="fixed-footer">
		<button
			on:click={() => {
				accessToken = '';
				user = null;
				tsvscode.postMessage({ type: 'logout', value: undefined });
			}}>logout</button>   
	</div>

{:else}

You have not yet signed with GitHub
<button
    on:click={() => {
        tsvscode.postMessage({ type: 'authenticate', value: undefined });
    }}>Sign in</button>
{/if}

