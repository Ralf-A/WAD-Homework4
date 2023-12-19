<template>
    <div>
        <div class="contact-info">
            <h1>About Us</h1>
            <p class="group-name">Group AO</p>
            <p class="members-heading">Members:</p>
            <ul class="member-list">
                <li>Oliver Puusalu
                    <p>+3729592131</p>
                </li>
                <li>Ralf Animägi
                    <p>+37295592131</p>

                </li>
                
                <li>Karl Oskar Jaagosild
                    <p>+37296592131</p>

                </li>
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
    background-color: #333;
    padding: 20px;
    border-radius: 10px;
    margin: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center; /* Center text */
}

.group-name {
    font-size: 24px;
    font-weight: bold;
}

.members-heading {
    font-size: 18px;
    margin-top: 10px;
}

.member-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center; /* Center items horizontally */
}

.member-list li {
    font-size: 16px;
    margin: 0 10px; /* Add some space between items */
    border: 1px solid #fff; /* Add a border to create individual boxes */
    padding: 8px;
    border-radius: 5px;
}

body {
    background-color: rgb(63, 63, 63);
    color: black;
    font-family: 'Arial', sans-serif;
}

</style>