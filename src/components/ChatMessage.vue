<script setup>
import ChatLoading from './ChatLoading.vue'

defineProps(['chatMessage'])

const setMessageClass = (sender) => {
    if (sender === 'me') {
        return 'message-sent'
    }

    return 'message-received'
}
</script>

<template>
    <div class="chat-message" :class="setMessageClass(chatMessage.sender)">
        <ChatLoading v-if="chatMessage.message === 'Loading'" />
        <p v-else>{{ chatMessage.message }}</p>
    </div>

    <div v-if="chatMessage.options" class="message-options-wrapper">
        <p
            v-for="option in chatMessage.options"
            :key="option"
            class="chat-message message-option"
            @click="sendMessage({ sender: 'me', message: option })"
        >
            {{ option }}
        </p>
    </div>
</template>

<style scoped>
.chat-message {
    position: relative;
    display: flex;

    max-width: 20rem;
    width: fit-content;

    padding: 10px 16px;
}

.message-received {
    background-color: #f0f2f7;
    border-radius: 25px 25px 25px 8px; /* Ver melhor essas bordas nas telas pequenas*/

    margin-bottom: 20px;
}

.message-sent {
    background-color: #623cea;
    color: #fff;
    border-radius: 25px 25px 8px 25px;
    margin-left: auto;

    margin-bottom: 20px;
}

.message-options-wrapper {
    gap: 10px;
    display: flex;
    flex-direction: column;

    margin-top: 10px;
    margin-bottom: 20px;
}

.message-option {
    background-color: #fff;
    color: #303030;
    border: 1px solid #303030;
    border-radius: 30px;

    cursor: pointer;
}
</style>
