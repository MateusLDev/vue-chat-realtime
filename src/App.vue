<script setup>
import { ref, onMounted, watch } from 'vue'
import AOS from 'aos'

import Chat from './components/Chat.vue'

import ChatOpenner from './components/ChatOpenner.vue'

onMounted(() => {
    AOS.init()
    sendMessage(firstMessage)
})

const showChat = ref(null)
const userMessage = ref('')
const faqBottom = ref()

const firstMessage = {
    sender: 'robot',
    message: 'Olá, sou o Erick, seu assistente virtual!<br>Para começar nos informe seu nome'
}
// const firstMessage = {
//     sender: 'robot',
//     message: 'Olá, sou o Erick, seu assistente virtual! Como posso te ajudar?',
//     options: [
//         'Não reconheço o e-mail cadastrado',
//         'Confirmação de cadastro',
//         'Esqueci e-mail/senha',
//         'Cadastro menor de idade'
//     ]
// }

const messages = ref([])

watch(
    messages,
    async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
        scrollToBottom()

        if (messages.value[messages.value.length - 1].message === 'Mateus') {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            sendMessage({ sender: 'robot', message: 'Loading' })

            await new Promise((resolve) => setTimeout(resolve, 2000))
            updateRobotMessageAfterLoading('Muito bem, agora me informe seu e-mail')
        }

        if (messages.value[messages.value.length - 1].message === 'teste@teste.com') {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            sendMessage({ sender: 'robot', message: 'Loading' })

            const indexOfLoading = messages.value.find((item) => item.message === 'Loading')

            await new Promise((resolve) => setTimeout(resolve, 2000))
            messages.value.splice(messages.value.indexOf(indexOfLoading), 1)
            sendMessage({
                sender: 'robot',
                message: 'Muito bem! Como posso te ajudar?',
                options: [
                    'Não reconheço o e-mail cadastrado',
                    'Confirmação de cadastro',
                    'Esqueci e-mail/senha',
                    'Cadastro menor de idade'
                ]
            })


        }

        if (messages.value[messages.value.length - 1].message === 'Cadastro menor de idade') {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            sendMessage({ sender: 'robot', message: 'Loading' })

            await new Promise((resolve) => setTimeout(resolve, 2000))
            updateRobotMessageAfterLoading(
                'Para cadastrar um menor de idade utilize seu CPF e logo abaixo, coloque o do menor'
            )
            await new Promise((resolve) => setTimeout(resolve, 2000))
            sendMessage({
                sender: 'robot',
                message: 'Essa mensagem foi util?',
                options: ['Sim', 'Não']
            })
        }


        // if (messages.value[messages.value.length - 1].sender === 'me') {
        //     await new Promise((resolve) => setTimeout(resolve, 1000))
        //     sendMessage({ sender: 'robot', message: 'Loading' })

        //     await new Promise((resolve) => setTimeout(resolve, 2000))
        //     updateRobotMessageAfterLoading(
        //         'Para cadastrar um menor de idade utilize seu CPF e logo abaixo, coloque o do menor'
        //     )
        //     await new Promise((resolve) => setTimeout(resolve, 2000))
        //     sendMessage({
        //         sender: 'robot',
        //         message: 'Essa mensagem foi util?',
        //         options: ['Sim', 'Não']
        //     })
        // }
    },
    { deep: true }
)

const openChat = () => {
    showChat.value = !showChat.value
}

const scrollToBottom = () => {
    const div = document.getElementById('conversation')
    div.scrollTo({
        top: div.scrollHeight,
        behavior: 'smooth'
    })
}

const sendMessage = (chatData) => {
    if (chatData.message === '') return

    messages.value.push({
        sender: chatData.sender,
        message: chatData.message,
        ...(chatData.options && { options: chatData.options })
    })

    if (chatData.sender === 'me') {
        userMessage.value = ''
    }
}

const updateRobotMessageAfterLoading = (message) => {
    const lastMessage = messages.value.length - 1
    messages.value[lastMessage].message = message
}

const setMessageClass = (sender) => {
    if (sender === 'me') {
        return 'message-sent'
    }

    return 'message-received'
}
</script>

<template>
    <!-- <Chat v-if="showChat" /> -->
    <transition name="slide-fade">
        <div class="faq-chat" v-if="showChat">
            <div class="chat-faq-title">
                <div class="user-details">
                    <v-avatar class="mr-3">
                        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
                    </v-avatar>
                    <div class="user-name">Erick Jhony</div>
                </div>

                <div class="close-chat" @click="openChat()">
                    <v-icon icon="mdi-close" size="25"></v-icon>
                </div>
            </div>

            <div class="chat-faq-body" ref="faqBottom" id="conversation">
                <template v-for="item in messages" :key="item">
                    <div
                        class="chat-message"
                        :class="setMessageClass(item.sender)"
                        data-aos="fade-up"
                        data-aos-anchor="#conversation"
                    >
                        <div
                            class="snippet"
                            data-title="dot-flashing"
                            v-if="item.message === 'Loading'"
                        >
                            <div class="stage">
                                <div class="dot-flashing"></div>
                            </div>
                        </div>
                        <p v-else v-html="item.message"></p>
                    </div>

                    <div
                        v-if="item.options"
                        class="message-options-wrapper"
                        data-aos="fade-up"
                        data-aos-anchor="#conversation"
                    >
                        <p
                            v-for="option in item.options"
                            :key="option"
                            class="chat-message message-option"
                            @click="sendMessage({ sender: 'me', message: option })"
                        >
                            {{ option }}
                        </p>
                    </div>
                </template>
            </div>

            <div class="chat-faq-footer">
                <div class="chat-input">
                    <input
                        type="text"
                        placeholder="Escreva sua mensagem..."
                        v-model="userMessage"
                        @keyup.enter="sendMessage({ sender: 'me', message: userMessage })"
                    />
                </div>

                <div class="send-icon">
                    <v-btn
                        icon="mdi-send"
                        size="x-small"
                        color="#623CEA"
                        @click="sendMessage({ sender: 'me', message: userMessage })"
                    ></v-btn>
                </div>
            </div>
        </div>
    </transition>

    <ChatOpenner v-if="!showChat" @click="openChat()" />
</template>

<style scoped>
.dot-flashing {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background-color: #623cea;
    color: #623cea;
    animation: dot-flashing 1s infinite linear alternate;
    animation-delay: 0.5s;

    margin: 8px 16px;
}
.dot-flashing::before,
.dot-flashing::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
}
.dot-flashing::before {
    left: -15px;
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background-color: #623cea;
    color: #623cea;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0s;
}
.dot-flashing::after {
    left: 15px;
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background-color: #623cea;
    color: #623cea;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 1s;
}

@keyframes dot-flashing {
    0% {
        background-color: #623cea;
    }
    50%,
    100% {
        background-color: rgba(99, 61, 235, 0.2);
    }
}
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(30px);
    opacity: 0;
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.faq-chat {
    width: 100%;
    height: 100vh;

    overflow: hidden;
    position: absolute;

    @media screen and (min-width: 1024px) {
        right: 1rem;
        bottom: 1.5rem;

        width: 25rem;
        height: auto;
        border-radius: 12px;
    }
}

.chat-faq-title {
    background-color: #623cea;
    box-shadow: 0px 15px 10px -15px #111;
    padding: 14px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user-details {
    display: flex;
    align-items: center;
}

.close-chat {
    cursor: pointer;
}

.user-name {
    color: #fff;
}

.chat-faq-body {
    background-color: #fff;
    padding: 20px 16px;

    color: #000;

    overflow-y: scroll;
    height: calc(100% - 129px);

    flex-direction: column;

    @media screen and (min-width: 769px) and (max-width: 1024px) {
        height: 400px;
    }

    @media screen and (min-width: 1300px) {
        height: 450px;
    }
}

.chat-message {
    position: relative;
    display: flex;

    max-width: 20rem;
    width: fit-content;

    padding: 9px 14px;
}

.message-received {
    background-color: #f0f2f7;
    border-radius: 20px 20px 20px 8px;

    margin-bottom: 10px;
}

.message-received input {
    background-color: #fff;
}

.message-sent {
    background-color: #623cea;
    color: #fff;
    border-radius: 20px 20px 8px 20px;

    margin: 20px 0 20px auto;
}

.message-options-wrapper {
    gap: 10px;
    display: flex;
    flex-wrap: wrap;

    margin-top: 10px;
}

.message-option {
    background-color: #fff;
    color: #303030;
    border: 1px solid #303030;
    border-radius: 20px;

    cursor: pointer;
}

.chat-faq-footer {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    border-top: 1px solid #dad7d7;

    /* position: fixed;
    bottom: 0; */

    @media screen and (min-width: 1024px) {
        position: relative;
    }
}

.chat-faq-footer input {
    padding: 8px 0;
    outline: none;

    width: 60vw;

    @media screen and (min-width: 1024px) {
        width: 300px;
    }
}
</style>
