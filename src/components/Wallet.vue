<script>
</script>
<template>
    <div>
        <h1>Welcome !</h1>
        <p>Balance: {{ balance }}</p>
        <button @click="deposit">Deposit</button>
        <button @click="withdraw">Withdraw</button>
    </div>
</template>
<style scoped>
    button {
        margin: 0 0.5rem;
        color: #bcabff;
        background-color: #000021;
        border: none;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
    }
</style>