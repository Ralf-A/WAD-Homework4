import { createRouter, createWebHashHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import SignUp from "../views/SignUpView.vue";
import LogIn from "../views/LogInView.vue";
import ContactUs from "../views/ContactUs.vue";
import addPost from "../views/addPostView.vue";
import PostDetailView from '@/views/PostDetailView.vue';
import AuthService from '@/services/auth';  // Import AuthService

const routes = [
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/login",
        name: "LogIn",
        component: LogIn,
    },
    {
        path: "/contact",
        name: "ContactUs",
        component: ContactUs,
    },
    {
        path: "/addpost",
        name: "AddPost",
        component: addPost,
        meta: { requiresAuth: true },
    },
    {
        path: '/post/:postId',
        name: 'PostDetail',
        component: PostDetailView,
        props: true,
        meta: { requiresAuth: true }, 
      },
    {
        path: "/",
        name: "main",
        component: MainView,
        meta: { requiresAuth: true }, 
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
router.beforeEach(async (to, from, next) => {
    console.log('Navigation to:', to.name);
    console.log('Requires Auth:', to.meta.requiresAuth);

    if (to.meta.requiresAuth) {
        try {
            const isAuthenticated = await AuthService.authenticated();
            console.log('Is Authenticated:', isAuthenticated);

            if (isAuthenticated !== undefined) {
                // Use strict equality check (!==) to ensure undefined is handled properly
                if (isAuthenticated) {
                    next();
                } else {
                    console.log('Redirecting to login');
                    next('/login');
                }
            } else {
                console.log('Authentication result is undefined');
                next('/login');
            }
        } catch (error) {
            console.error('Error during authentication check:', error);
            next('/login'); // Redirect on error for safety
        }
    } else {
        console.log('No authentication required');
        next();
    }
});




  
export default router;