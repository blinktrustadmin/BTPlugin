<script lang="ts">
    import { onMount } from "svelte";
    import { append } from "svelte/internal";
    import type { User } from "../types";
    import Item from './Item.svelte'

    export let user: User;
    export let accessToken: string;
    let text = "";
    let todos: Array<{ text: string; completed: boolean; id: number }> = [];
    let todosItem: {text: string; items:Array<{ text: string; completed: boolean; id: number }>} = {text:"", items:[]}

    async function addTodo(t: string) {
        const response = await fetch(`${apiBaseUrl}/todos`, {
            method: "POST",
            body: JSON.stringify({
                text: t,
            }),
            headers: {
                "content-type": "application/json",
                'Access-Control-Allow-Origin': 'https://app.blinktrustai.com',
                'Access-Control-Allow-Credentials': 'true',
                authorization: `Bearer ${accessToken}`
            },
        });
        todosItem = await response.json();
        console.log("todosItem::", todosItem)
    }

    onMount(async () => {
        window.addEventListener("message", async (event) => {
            const message = event.data;
            switch (message.type) {
                case "new-todo":
                    addTodo(message.value);
                    break;
            }
        });

        const response = await fetch(`${apiBaseUrl}/todo`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Access-Control-Allow-Origin': 'https://app.blinktrustai.com/',
                'Access-Control-Allow-Credentials': 'true'
            },
        });
        todosItem = await response.json();
        
        console.log("todosItem::", todosItem)

    });
</script>

<style>
    /*.complete {
        text-decoration: line-through;
    }*/
</style>
{#each Object.entries(todosItem) as entry}
    <Item {entry} />
{/each}



