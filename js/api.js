class UserAPI {
    constructor() {
        // --- ADVERTENCIA DE SEGURIDAD ---
        // Almacenar contraseñas en texto plano en localStorage es INSEGURO.
        // Esto es solo para fines de demostración. NUNCA hagas esto en producción.
        this.initialUsers = {
            'alex@correo.com': {
                username: 'Alex', email: 'alex@correo.com', password: 'password123', avatar: AVATARS[0], joined: '2024-05-10', friends: ['maria'], gems: 150, rewardStreak: 0, lastRewardClaimDate: null,
                progress: {
                    'Inglés': { xp: 450, weeklyXP: 120, streak: 3, activeDays: [], lives: 5, xpBoosters: 1, streakFreezes: 0 },
                    'Checo': { xp: 120, weeklyXP: 50, streak: 1, activeDays: [], lives: 5, xpBoosters: 0, streakFreezes: 0 }
                }
            },
            'maria@correo.com': {
                username: 'Maria', email: 'maria@correo.com', password: 'password123', avatar: AVATARS[1], joined: '2024-03-22', friends: ['alex', 'pablo'], gems: 500, rewardStreak: 0, lastRewardClaimDate: null,
                progress: {
                    'Inglés': { xp: 1250, weeklyXP: 300, streak: 12, activeDays: [], lives: 5, xpBoosters: 0, streakFreezes: 1 },
                    'Checo': { xp: 0, weeklyXP: 0, streak: 0, activeDays: [], lives: 5, xpBoosters: 0, streakFreezes: 0 }
                }
            },
            'carlos@correo.com': {
                username: 'Carlos', email: 'carlos@correo.com', password: 'password123', avatar: AVATARS[2], joined: '2024-06-01', friends: [], gems: 25, rewardStreak: 0, lastRewardClaimDate: null,
                progress: {
                    'Inglés': { xp: 80, weeklyXP: 80, streak: 1, activeDays: [], lives: 5, xpBoosters: 0, streakFreezes: 0 },
                    'Checo': { xp: 250, weeklyXP: 150, streak: 2, activeDays: [], lives: 5, xpBoosters: 0, streakFreezes: 0 }
                }
            }
        };
        this.users = this.loadAllUsers();
        this.ensureProgressStructure();
    }

    ensureProgressStructure() {
        const languages = Object.keys(LESSONS);
        Object.values(this.users).forEach(user => {
            if (user.gems === undefined) user.gems = 0;
            if (user.rewardStreak === undefined) user.rewardStreak = 0;
            if (user.lastRewardClaimDate === undefined) user.lastRewardClaimDate = null;
            if (!user.progress) user.progress = {};

            languages.forEach(lang => {
                if (!user.progress[lang]) {
                    user.progress[lang] = { xp: 0, weeklyXP: 0, streak: 0, activeDays: [], lives: 5, xpBoosters: 0, streakFreezes: 0 };
                }
            });
        });
        this.saveAllUsers();
    }
    
    checkAndResetWeeklyLeaderboard() {
        const now = new Date();
        const lastReset = new Date(localStorage.getItem('weeklyResetTimestamp') || 0);
        const timeSinceReset = now.getTime() - lastReset.getTime();
        
        const isMonday = now.getDay() === 1; 
        if (isMonday && timeSinceReset > (24 * 60 * 60 * 1000)) { 
            Object.values(this.users).forEach(user => {
                Object.keys(user.progress).forEach(lang => {
                    user.progress[lang].weeklyXP = 0;
                });
            });
            this.saveAllUsers();
            localStorage.setItem('weeklyResetTimestamp', now.toISOString());
        }
    }


    loadAllUsers() {
        const savedUsers = localStorage.getItem('englishAppAllUsers');
        if (savedUsers) {
            return JSON.parse(savedUsers);
        }
        localStorage.setItem('englishAppAllUsers', JSON.stringify(this.initialUsers));
        return this.initialUsers;
    }

    saveAllUsers() {
        localStorage.setItem('englishAppAllUsers', JSON.stringify(this.users));
    }

    getUserByEmail(email) {
        if (!email) return undefined;
        return this.users[email.toLowerCase()];
    }

    getAllUsers() {
        return Object.values(this.users);
    }
    
    registerUser({ username, email, password }) {
        const lowerCaseEmail = email.toLowerCase();
        if (this.users[lowerCaseEmail]) {
            return { success: false, message: 'Este correo electrónico ya está registrado.' };
        }

        const newUser = {
            username,
            email: lowerCaseEmail,
            password,
            avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
            joined: new Date().toISOString(),
            friends: [],
            gems: 0,
            rewardStreak: 0,
            lastRewardClaimDate: null,
            progress: {}
        };
        
        const languages = Object.keys(LESSONS);
        languages.forEach(lang => {
            newUser.progress[lang] = { xp: 0, weeklyXP: 0, streak: 0, activeDays: [], lives: 5, xpBoosters: 0, streakFreezes: 0 };
        });

        this.users[lowerCaseEmail] = newUser;
        this.saveAllUsers();
        return { success: true, user: newUser };
    }

    updateUser(user) {
        if (user && user.email) {
            this.users[user.email.toLowerCase()] = user;
            this.saveAllUsers();
        }
    }
    
    // MÉTODO AÑADIDO
    updatePassword(email, newPassword) {
        const user = this.getUserByEmail(email);
        if (user) {
            user.password = newPassword;
            this.updateUser(user);
            return true;
        }
        return false;
    }

    getCurrentUser() {
        const sessionData = localStorage.getItem('englishAppSession');
        return sessionData ? JSON.parse(sessionData) : null;
    }
    
    saveSession(user) {
        localStorage.setItem('englishAppSession', JSON.stringify({ email: user.email }));
    }

    clearSession() {
        localStorage.removeItem('englishAppSession');
    }
}