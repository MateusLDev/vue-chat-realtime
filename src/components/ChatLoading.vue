<template>
    <div class="snippet" data-title="dot-flashing" v-if="item.message === 'Loading'">
        <div class="stage">
            <div class="dot-flashing"></div>
        </div>
    </div>
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
        background-color: #623CEA;
    }
    50%,
    100% {
        background-color: rgba(99, 61, 235, 0.2)
    }
}
</style>
