<template>
    <div>
        <div class="contact-info">
            <h1>About Us</h1>
            <p>Group AO</p>
            <p>Members:</p>
            <ul>
                <li>Oliver Puusalu</li>
                <li>Ralf Animägi</li>
                <li>Karl Oskar Jaagosild</li>
            </ul>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
    components: {
        Header,
        Footer,
    },
};
</script>


<style>
    .contact-info {
        color: white;
    }
</style>
