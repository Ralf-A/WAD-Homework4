<!-- Header.vue -->
<template>
    <header>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/contact">Contact Us</router-link> <!-- Added button for Contact Us page -->
        </nav>
    </header>
</template>

<style scoped>

nav {
    text-align: center;
    padding: 30px;
}

nav a {
    font-weight: bold;
    margin: 0px 10px 0px 10px;
    padding: 10px 40px 10px 40px;
    color: #000000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.37);
    border-radius: 4px;
    transition: background-color 0.3s; /* Add transition for a smooth effect */
}

nav a:hover {
    background-color: #ddd; /* Add a slight gray background on hover */
}

nav a.router-link-exact-active {
    color: rgb(32, 248, 237);
}

</style>
