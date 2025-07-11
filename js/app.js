document.addEventListener('DOMContentLoaded', () => {

    class EnglishApp {
        constructor() {
            this.userAPI = new UserAPI();
            this.ui = new UIManager();
            this.currentUser = null;
            this.selectedLanguage = null;
            this.currentProgress = null;
            this.vocabularyModules = [];
            // --- NUEVAS PROPIEDADES PARA LA LECCIÓN ---
            this.currentLessonData = null;
            this.currentExerciseIndex = 0;
            this.lessonScore = 0;
            this.selectedMatchItem = null;
            this.matchedPairs = 0;
        }

        init() {
            this.userAPI.checkAndResetWeeklyLeaderboard();
            this.addEventListeners();
            this.checkSession();
        }

        checkSession() {
            const session = this.userAPI.getCurrentUser();
            if (session && session.email) {
                this.currentUser = this.userAPI.getUserByEmail(session.email);
                if (this.currentUser) {
                    this.ui.switchScreen('languageSelection');
                } else {
                    // Si el usuario de la sesión no se encuentra, limpiar sesión y mostrar login
                    this.userAPI.clearSession();
                    this.ui.switchScreen('login');
                }
            } else {
                this.ui.switchScreen('login');
            }
        }

        addEventListeners() {
            // Formularios de autenticación
            this.ui.elements.loginForm.addEventListener('submit', this.handleLogin.bind(this));
            this.ui.elements.registerForm.addEventListener('submit', this.handleRegister.bind(this));

            // Enlaces para cambiar entre login y registro
            document.getElementById('show-register-link').addEventListener('click', (e) => {
                e.preventDefault();
                this.ui.switchScreen('register');
            });
            document.getElementById('show-login-link').addEventListener('click', (e) => {
                e.preventDefault();
                this.ui.switchScreen('login');
            });

            // Eventos existentes de la aplicación
            document.querySelectorAll('.language-option').forEach(option => {
                option.addEventListener('click', (e) => this.handleLanguageSelection(e.currentTarget.dataset.lang));
            });
            document.getElementById('logout-button').addEventListener('click', this.handleLogout.bind(this));
            this.ui.elements.profileIconContainer.addEventListener('click', () => this.ui.renderProfileModal(this));
            document.getElementById('close-profile-modal-button').addEventListener('click', () => this.ui.closeModal('profile'));
            this.ui.elements.profileModal.addEventListener('click', (e) => { if (e.target === e.currentTarget) this.ui.closeModal('profile'); });
            document.getElementById('trophy-icon').addEventListener('click', () => this.ui.renderLeaderboardModal(this));
            document.getElementById('close-leaderboard-modal-button').addEventListener('click', () => this.ui.closeModal('leaderboard'));
            this.ui.elements.leaderboardModal.addEventListener('click', (e) => { if (e.target === e.currentTarget) this.ui.closeModal('leaderboard'); });

            document.getElementById('store-icon').addEventListener('click', () => this.ui.renderStoreModal(this));
            document.getElementById('close-store-modal-button').addEventListener('click', () => this.ui.closeModal('store'));
            this.ui.elements.storeModal.addEventListener('click', (e) => { if (e.target === e.currentTarget) this.ui.closeModal('store'); });

            document.getElementById('daily-reward-icon').addEventListener('click', () => this.ui.renderDailyRewardsModal(this));
            this.ui.elements.closeDailyRewardsModalButton.addEventListener('click', () => this.ui.closeModal('dailyRewards'));
            this.ui.elements.dailyRewardsModal.addEventListener('click', (e) => { if (e.target === e.currentTarget) this.ui.closeModal('dailyRewards'); });

            document.getElementById('start-learning-btn').addEventListener('click', () => this.ui.openModal('lessonType'));
            this.ui.elements.closeLessonTypeModalButton.addEventListener('click', () => this.ui.closeModal('lessonType'));
            this.ui.elements.lessonTypeModal.addEventListener('click', (e) => { if (e.target === e.currentTarget) this.ui.closeModal('lessonType'); });

            this.ui.elements.startVocabBtn.addEventListener('click', () => {
                this.ui.closeModal('lessonType');
                this.ui.showView('lessonsView');
            });
            document.getElementById('back-to-dashboard-btn').addEventListener('click', () => {
                this.ui.renderDashboard(this);
                this.ui.showView('dashboardView');
            });
            this.ui.elements.changeLanguageBtn.addEventListener('click', () => this.ui.switchScreen('languageSelection'));
            // --- NUEVO LISTENER PARA EL MODAL DE LECCIÓN ---
            document.getElementById('close-lesson-modal-button').addEventListener('click', () => this.ui.closeModal('lesson'));
        }

        handleLogin(e) {
            e.preventDefault();
            this.ui.clearErrors();
            const email = this.ui.elements.loginEmailInput.value.trim();
            const password = this.ui.elements.loginPasswordInput.value;
            const user = this.userAPI.getUserByEmail(email);

            if (user && user.password === password) { // ¡COMPARACIÓN INSEGURA!
                this.currentUser = user;
                this.userAPI.saveSession(this.currentUser);
                this.ui.switchScreen('languageSelection');
            } else {
                this.ui.displayLoginError('Correo o contraseña incorrectos.');
            }
        }

        handleRegister(e) {
            e.preventDefault();
            this.ui.clearErrors();
            const username = this.ui.elements.registerUsernameInput.value.trim();
            const email = this.ui.elements.registerEmailInput.value.trim();
            const password = this.ui.elements.registerPasswordInput.value;
            const passwordConfirm = this.ui.elements.registerPasswordConfirmInput.value;

            if (!username || !email || !password || !passwordConfirm) {
                this.ui.displayRegisterError('Todos los campos son obligatorios.');
                return;
            }
            if (password.length < 6) {
                this.ui.displayRegisterError('La contraseña debe tener al menos 6 caracteres.');
                return;
            }
            if (password !== passwordConfirm) {
                this.ui.displayRegisterError('Las contraseñas no coinciden.');
                return;
            }

            const result = this.userAPI.registerUser({ username, email, password });

            if (result.success) {
                alert('¡Registro completado! Ahora inicia sesión para comenzar.');
                this.ui.clearRegisterInputs();
                this.ui.switchScreen('login');
            } else {
                this.ui.displayRegisterError(result.message);
            }
        }

        handleChangePassword(e) {
            e.preventDefault();
            const messageEl = document.getElementById('change-password-message');
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;

            messageEl.style.color = '#E53E3E'; // Color de error por defecto

            if (!currentPassword || !newPassword || !confirmNewPassword) {
                messageEl.textContent = 'Todos los campos son obligatorios.';
                return;
            }

            if (this.currentUser.password !== currentPassword) {
                messageEl.textContent = 'La contraseña actual es incorrecta.';
                return;
            }

            if (newPassword.length < 6) {
                messageEl.textContent = 'La nueva contraseña debe tener al menos 6 caracteres.';
                return;
            }

            if (newPassword !== confirmNewPassword) {
                messageEl.textContent = 'Las nuevas contraseñas no coinciden.';
                return;
            }

            // Si todo es correcto
            this.userAPI.updatePassword(this.currentUser.email, newPassword);
            messageEl.style.color = '#48BB78'; // Color de éxito
            messageEl.textContent = '¡Contraseña actualizada con éxito!';

            // Limpiar formulario
            e.target.reset();
        }

        handleLanguageSelection(language) {
            this.selectedLanguage = language;
            this.vocabularyModules = LESSONS[language];
            this.currentProgress = this.currentUser.progress[language];
            this.userAPI.updateUser(this.currentUser);
            this.renderMainApp();
        }

        handleLogout() {
            this.userAPI.updateUser(this.currentUser);
            this.userAPI.clearSession();
            this.currentUser = null;
            this.selectedLanguage = null;
            this.currentProgress = null;
            this.vocabularyModules = [];
            this.ui.clearLoginInputs();
            this.ui.switchScreen('login');
        }

        checkForDailyReward() {
            const now = new Date();
            const todayStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
            const lastClaimStr = this.currentUser.lastRewardClaimDate;
            if (lastClaimStr !== todayStr) {
                this.ui.showRewardNotification(true);
            } else {
                this.ui.showRewardNotification(false);
            }
        }

        calculateLevel(xp) { return Math.floor(xp / XP_PER_LEVEL) + 1; }
        getXpForLevel(level) { return (level - 1) * XP_PER_LEVEL; }

        getLeagueForLevel(level) {
            for (let i = LEAGUES.length - 1; i >= 0; i--) {
                if (level >= LEAGUES[i].minLevel) {
                    return LEAGUES[i];
                }
            }
            return LEAGUES[0];
        }

        updateStreak() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const lastDayActive = this.currentProgress.activeDays.length > 0 ? new Date(this.currentProgress.activeDays[this.currentProgress.activeDays.length - 1] + 'T00:00:00') : null;

            if (!lastDayActive) {
                this.currentProgress.streak = 1;
            } else {
                const diffDays = Math.ceil((today - lastDayActive) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    this.currentProgress.streak++;
                } else if (diffDays > 1) {
                    if (this.currentProgress.streakFreezes > 0) {
                        this.currentProgress.streakFreezes--;
                    } else {
                        this.currentProgress.streak = 1;
                    }
                }
            }
            const todayStr = today.toISOString().slice(0, 10);
            if (!this.currentProgress.activeDays.includes(todayStr)) {
                this.currentProgress.activeDays.push(todayStr);
            }
            if (!this.currentProgress.streakFreezes) this.currentProgress.streakFreezes = 0;
        }

        renderMainApp() {
            const userLevel = this.calculateLevel(this.currentProgress.xp);
            this.ui.renderWelcomeMessage(this.currentUser, userLevel, this.selectedLanguage);
            this.ui.updateHeaderAvatar(this.currentUser);
            this.ui.renderVocabularyGrid(userLevel, (module) => this.handleModuleClick(module), this.vocabularyModules);
            this.ui.renderDashboard(this);
            this.ui.showView('dashboardView');
            this.ui.switchScreen('app');
            this.checkForDailyReward();
        }

        handleMatchAttempt(clickedItem) {
            // No hacer nada si el item ya está correcto o es el mismo
            if (clickedItem.classList.contains('correct') || clickedItem === this.selectedMatchItem) {
                if (this.selectedMatchItem) this.selectedMatchItem.classList.remove('selected');
                this.selectedMatchItem = null;
                return;
            }

            const exercise = this.currentLessonData.exercises[this.currentExerciseIndex];
            const feedbackContainer = document.getElementById('feedback-container');
            feedbackContainer.innerHTML = ''; // Limpiar feedback

            // Si es la primera selección
            if (!this.selectedMatchItem) {
                this.selectedMatchItem = clickedItem;
                clickedItem.classList.add('selected');
                return;
            }

            // Si es la segunda selección
            const firstItem = this.selectedMatchItem;
            const secondItem = clickedItem;

            // Evitar seleccionar dos de la misma columna
            if (firstItem.parentElement.id === secondItem.parentElement.id) {
                firstItem.classList.remove('selected');
                secondItem.classList.add('selected');
                this.selectedMatchItem = secondItem;
                return;
            }

            // Comprobar si la pareja es correcta
            const esItem = (firstItem.parentElement.id === 'es-column') ? firstItem : secondItem;
            const enItem = (firstItem.parentElement.id === 'en-column') ? firstItem : secondItem;
            const correctPairData = exercise.pairs.find(p => p.es === esItem.dataset.text);

            if (correctPairData && correctPairData.en === enItem.dataset.text) {
                // ACIERTO
                firstItem.classList.remove('selected');
                secondItem.classList.remove('selected');
                firstItem.classList.add('correct');
                secondItem.classList.add('correct');
                this.matchedPairs++;
                this.selectedMatchItem = null;

                // Comprobar si se ha completado el ejercicio
                if (this.matchedPairs === exercise.pairs.length) {
                    this.lessonScore++;
                    this.currentExerciseIndex++;
                    feedbackContainer.innerHTML = `<p class="feedback correct">¡Todas las parejas encontradas!</p>`;
                    document.getElementById('next-exercise-btn').style.display = 'inline-block';
                }
            } else {
                // FALLO
                firstItem.classList.add('incorrect');
                secondItem.classList.add('incorrect');
                this.selectedMatchItem = null;

                setTimeout(() => {
                    firstItem.classList.remove('incorrect', 'selected');
                    secondItem.classList.remove('incorrect', 'selected');
                }, 800);
            }
        }


        handleModuleClick(module) {
            // Si el módulo tiene datos de ejercicios
            if (module.data && module.data.exercises) {
                this.startLesson(module.data);
            } else {
                // Comportamiento anterior para módulos simples
                this.updateStreak();
                let xpGained = 50;
                const gemsGained = 5;
                let alertMessage = `¡Módulo de ${module.title} completado!\nHas ganado ${xpGained} XP y ${gemsGained} gemas 💎.`;

                this.currentProgress.xp += xpGained;
                this.currentProgress.weeklyXP += xpGained;
                this.currentUser.gems += gemsGained;

                alert(alertMessage);

                this.userAPI.updateUser(this.currentUser);
                this.ui.renderDashboard(this);
                this.ui.showView('dashboardView');
            }
        }

        // --- NUEVO MOTOR DE LÓGICA PARA LECCIONES ---

        startLesson(lessonData) {
            this.currentLessonData = lessonData;
            this.currentExerciseIndex = 0;
            this.lessonScore = 0;
            this.selectedMatchItem = null;
            this.matchedPairs = 0;


            this.ui.elements.lessonContent.innerHTML = `
                <div id="lesson-teach-view" class="lesson-view"></div>
                <div id="lesson-exercise-view" class="lesson-view"></div>
                <div id="lesson-results-view" class="lesson-view"></div>
            `;

            this.ui.openModal('lesson');

            if (!lessonData.sections || lessonData.sections.length === 0) {
                this.startExercises();
            } else {
                this.ui.renderLessonInstructionView(lessonData, this);
            }
        }

        startExercises() {
            this.loadNextExercise();
        }

        loadNextExercise() {
            if (this.currentExerciseIndex < this.currentLessonData.exercises.length) {
                const exercise = this.currentLessonData.exercises[this.currentExerciseIndex];
                this.ui.renderExercise(exercise, this.currentExerciseIndex + 1, this.currentLessonData.exercises.length, this);
            } else {
                this.showLessonResults();
            }
        }

    checkSingleColorAnswer(inputElement) {
        if (inputElement.disabled) return;

        const exercise = this.currentLessonData.exercises[this.currentExerciseIndex];
        const correctAnswers = exercise.colors;
        const parentItem = inputElement.closest('.color-item');
        const index = parseInt(parentItem.dataset.index, 10);

        const feedbackEl = inputElement.nextElementSibling;
        const userAnswer = inputElement.value.trim().toLowerCase();
        const correctAnswerData = correctAnswers[index];
        const correctAnswer = correctAnswerData.name.toLowerCase();

        const isGrayAlternative = (correctAnswer.includes('gray') && userAnswer === correctAnswer.replace('gray', 'grey'));

        inputElement.classList.remove('correct', 'incorrect');

        if (userAnswer === correctAnswer || isGrayAlternative) {
            inputElement.classList.add('correct');
            feedbackEl.textContent = '¡Correcto!';
            feedbackEl.className = 'color-feedback correct';
            inputElement.disabled = true; 
            inputElement.parentElement.querySelector('.show-answer-btn').disabled = true;
        } else {
            inputElement.classList.add('incorrect');
            feedbackEl.textContent = 'Inténtalo de nuevo';
            feedbackEl.className = 'color-feedback incorrect';
        }
        
        this.checkColorGridCompletion();
    }


         checkExerciseAnswer() {
            const exercise = this.currentLessonData.exercises[this.currentExerciseIndex];
            const feedbackContainer = document.getElementById('feedback-container');
            feedbackContainer.innerHTML = '';

            let isCorrect = false;

            switch (exercise.type) {
                case 'imageChoice': 
                case 'multipleChoice':
                    const selectedOption = document.querySelector('.choice-option.selected, .image-choice-option.selected');
                    if (!selectedOption) return this.ui.showRequirementMessage("Por favor, selecciona una respuesta.");
                    isCorrect = selectedOption.dataset.answer.toLowerCase() === exercise.answer.toLowerCase();
                    if (isCorrect) this.lessonScore++;
                    this.ui.showExerciseFeedback(isCorrect, exercise.answer, this);
                    this.currentExerciseIndex++;
                    break;

                case 'fillInTheBlank':
                    const inputFill = document.getElementById('fill-in-blank-input');
                    if (!inputFill.value.trim()) return this.ui.showRequirementMessage("Por favor, escribe una respuesta.");
                    isCorrect = inputFill.value.trim().toLowerCase() === exercise.answer.toLowerCase();
                    if (isCorrect) this.lessonScore++;
                    this.ui.showExerciseFeedback(isCorrect, exercise.answer, this);
                    this.currentExerciseIndex++;
                    break;
                
                case 'numberToWords':
                    const inputWords = document.getElementById('number-exercise-input');
                    if (!inputWords.value.trim()) return this.ui.showRequirementMessage("Por favor, escribe una respuesta.");
                    const userAnswerWords = inputWords.value.trim().toLowerCase().replace(/,/g, '').replace(/\s+/g, ' ');
                    isCorrect = userAnswerWords === exercise.answer.toLowerCase().replace(/,/g, '').replace(/\s+/g, ' ');
                    if (isCorrect) this.lessonScore++;
                    this.ui.showExerciseFeedback(isCorrect, exercise.answer, this);
                    this.currentExerciseIndex++;
                    break;

                case 'wordsToNumber':
                    const inputNumber = document.getElementById('number-exercise-input');
                    if (!inputNumber.value.trim()) return this.ui.showRequirementMessage("Por favor, escribe una respuesta.");
                    const userAnswerNumber = inputNumber.value.trim().replace(/,/g, '').replace(/\s/g, '');
                    isCorrect = userAnswerNumber === exercise.answer.toString();
                    if (isCorrect) this.lessonScore++;
                    this.ui.showExerciseFeedback(isCorrect, exercise.answer, this);
                    this.currentExerciseIndex++;
                    break;

                 
                case 'familyTree':
                    const treeInputs = document.querySelectorAll('.member-input');
                    let treeCorrectCount = 0;
                    treeInputs.forEach((input, index) => {
                        if (input.value.trim().toLowerCase() === exercise.members[index].toLowerCase()) {
                            treeCorrectCount++;
                        }
                    });
                    this.lessonScore += treeCorrectCount;
                    this.currentExerciseIndex++;
                    this.loadNextExercise();
                    break;

                case 'colorGrid':
                    const allColorInputs = document.querySelectorAll('.color-input');
                    let correctCount = 0;
                    
                    allColorInputs.forEach((input, index) => {
                        if (input.classList.contains('revealed') || input.disabled) {
                            return;
                        }

                        const userAnswer = input.value.trim().toLowerCase();
                        const correctAnswer = exercise.colors[index].name.toLowerCase();
                        const feedbackEl = input.closest('.input-with-button-wrapper').nextElementSibling;

                        const isGrayAlternative = (correctAnswer.includes('gray') && userAnswer === correctAnswer.replace('gray', 'grey'));

                        if (userAnswer === correctAnswer || isGrayAlternative) {
                            input.classList.add('correct');
                            feedbackEl.textContent = '¡Correcto!';
                            feedbackEl.className = 'color-feedback correct';
                            correctCount++;
                        } else {
                            input.classList.add('incorrect');
                            feedbackEl.textContent = `Correcto: ${exercise.colors[index].name}`;
                            feedbackEl.className = 'color-feedback incorrect';
                        }
                        input.disabled = true;
                        input.nextElementSibling.disabled = true;
                    });

                    this.lessonScore += correctCount;
                    const totalItems = exercise.colors.length;
                    const finalMessage = `¡Ejercicio completado! Puntuación: ${correctCount} de ${totalItems}.`;
                    
                    this.ui.showExerciseFeedback(false, finalMessage, this);
                    
                    const finalFeedbackEl = document.querySelector('#feedback-container .feedback');
                    if(finalFeedbackEl) {
                        finalFeedbackEl.classList.remove('incorrect');
                        finalFeedbackEl.classList.add('correct');
                    }

                    this.currentExerciseIndex++;
                    break;

                case 'bodyParts': // --- NUEVO CASE ---
                    const bodyInputs = document.querySelectorAll('.body-part-input');
                    let bodyCorrectCount = 0;
                    bodyInputs.forEach(input => {
                        const index = parseInt(input.dataset.index, 10);
                        const userAnswer = input.value.trim().toLowerCase();
                        const correctAnswer = exercise.parts[index].name.toLowerCase();

                        if (userAnswer === correctAnswer) {
                            bodyCorrectCount++;
                            input.classList.add('correct');
                            input.disabled = true;
                        } else {
                            input.classList.add('incorrect');
                        }
                    });

                    this.lessonScore += bodyCorrectCount;
                    const totalParts = exercise.parts.length;
                    const finalBodyMessage = `¡Comprobado! Has acertado ${bodyCorrectCount} de ${totalParts}.`;

                    this.ui.showExerciseFeedback(false, finalBodyMessage, this);

                    // Opcional: mostrar las respuestas correctas en los campos incorrectos
                    bodyInputs.forEach(input => {
                        if (input.classList.contains('incorrect')) {
                            const index = parseInt(input.dataset.index, 10);
                            input.value = exercise.parts[index].name;
                            input.disabled = true;
                        }
                    });
                    
                    this.currentExerciseIndex++;
                    break;
            }
        
        }


showSingleColorAnswer(buttonElement) {
    if (buttonElement.disabled) return;

    const exercise = this.currentLessonData.exercises[this.currentExerciseIndex];
    const index = parseInt(buttonElement.dataset.index, 10);
    const correctAnswer = exercise.colors[index].name;

    const wrapper = buttonElement.closest('.input-with-button-wrapper');
    const inputElement = wrapper.querySelector('.color-input');
    const feedbackEl = wrapper.nextElementSibling;

    inputElement.value = correctAnswer;
    inputElement.classList.add('revealed'); 

    feedbackEl.textContent = 'Respuesta mostrada';
    feedbackEl.className = 'color-feedback';
    
    inputElement.focus();
}

    checkColorGridCompletion() {
        const exercise = this.currentLessonData.exercises[this.currentExerciseIndex];
        const totalColors = exercise.colors.length;
        const resolvedCount = document.querySelectorAll('.color-input.correct, .color-input.revealed').length;

        if (resolvedCount === totalColors) {
            this.lessonScore = document.querySelectorAll('.color-input.correct').length;

            const feedbackContainer = document.getElementById('feedback-container');
            feedbackContainer.innerHTML = `<p class="feedback correct">¡Ejercicio completado! Has acertado ${this.lessonScore} de ${totalColors}.</p>`;

            const nextBtn = document.getElementById('next-exercise-btn');
            nextBtn.textContent = 'Ver Resultados';
            nextBtn.style.display = 'inline-block';
        }
    }

        showLessonResults() {
            const totalQuestions = this.currentLessonData.exercises.length;
            const percentage = totalQuestions > 0 ? (this.lessonScore / totalQuestions) : 0;

            const xpGained = Math.round(50 * percentage);
            const gemsGained = Math.round(5 * percentage);

            this.updateStreak();
            this.currentProgress.xp += xpGained;
            this.currentProgress.weeklyXP += xpGained;
            this.currentUser.gems += gemsGained;
            this.userAPI.updateUser(this.currentUser);

            this.ui.renderLessonResultsView(this.lessonScore, totalQuestions, xpGained, gemsGained, this);
            this.ui.renderDashboard(this);
        }

        handleClaimDailyReward() {
            const now = new Date();
            const todayStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

            const lastClaimStr = this.currentUser.lastRewardClaimDate;

            if (lastClaimStr === todayStr) {
                alert("Ya has reclamado la recompensa de hoy.");
                return;
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let lastClaimDate = null;
            if (lastClaimStr) {
                const parts = lastClaimStr.split('-').map(p => parseInt(p, 10));
                lastClaimDate = new Date(parts[0], parts[1] - 1, parts[2]);
            }

            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            let currentStreak = this.currentUser.rewardStreak || 0;

            if (!lastClaimDate || lastClaimDate.getTime() < yesterday.getTime()) {
                currentStreak = 0;
            }

            const rewardIndex = currentStreak % DAILY_REWARDS.length;
            const reward = DAILY_REWARDS[rewardIndex];

            const oldGems = this.currentUser.gems;
            this.currentUser.gems += reward.gems;

            this.currentUser.rewardStreak = currentStreak + 1;
            this.currentUser.lastRewardClaimDate = todayStr;
            this.userAPI.updateUser(this.currentUser);

            this.ui.showRewardNotification(false);
            this.ui.renderDailyRewardsModal(this);

            const gemValueElement = this.ui.elements.gemCounter.querySelector('.value');
            if (gemValueElement) {
                this.ui.animateValue(gemValueElement, oldGems, this.currentUser.gems, 800);
            }
        }

        handlePurchase(itemId, quantity = 1) {
            const item = this.ui.getStoreItem(itemId);
            if (!item) return;

            const totalCost = item.price * quantity;

            if (this.currentUser.gems >= totalCost) {
                this.currentUser.gems -= totalCost;

                if (itemId === 'streak-freeze') {
                    this.currentProgress.streakFreezes = (this.currentProgress.streakFreezes || 0) + quantity;
                } else if (itemId === 'xp-booster') {
                    this.currentProgress.xpBoosters = (this.currentProgress.xpBoosters || 0) + quantity;
                } else if (itemId === 'lives') {
                    this.currentProgress.lives = (this.currentProgress.lives || 0) + quantity;
                }

                this.userAPI.updateUser(this.currentUser);
                alert(`¡Has comprado ${quantity}x "${item.name}"!`);

                this.ui.renderStoreModal(this);
                this.ui.updateHeaderStats(this.currentUser, this.currentProgress);
            } else {
                alert("No tienes suficientes gemas para comprar este artículo.");
            }
        }

        handleAddFriend() {
            const input = document.getElementById('add-friend-input');
            const button = document.getElementById('add-friend-btn');
            const friendUsername = input.value.trim().toLowerCase();
            const originalButtonText = button.innerHTML;
            button.innerHTML = '<span class="spinner"></span>';
            button.disabled = true;

            const handleResult = (message, isError) => {
                this.ui.updateFriendMessage(message, isError);
                button.innerHTML = originalButtonText;
                button.disabled = false;
                if (!isError) {
                    input.value = '';
                    this.ui.renderFriendsList(this.currentUser, this.userAPI.getAllUsers(), this.calculateLevel, this);
                }
            };

            setTimeout(() => {
                if (!friendUsername) { handleResult('El campo no puede estar vacío.', true); return; }
                if (friendUsername === this.currentUser.username.toLowerCase()) { handleResult('No puedes añadirte a ti mismo.', true); return; }
                if (this.currentUser.friends.includes(friendUsername)) { handleResult('¡Ya sois amigos!', true); return; }

                const allUsers = this.userAPI.getAllUsers();
                const friendData = allUsers.find(u => u.username.toLowerCase() === friendUsername);

                if (!friendData) { handleResult('Usuario no encontrado.', true); return; }
                this.currentUser.friends.push(friendUsername);
                friendData.friends.push(this.currentUser.username.toLowerCase());
                this.userAPI.updateUser(this.currentUser);
                this.userAPI.updateUser(friendData);
                handleResult(`Has añadido a ${friendData.username} como amigo!`, false);
            }, 500);
        }

        handleAvatarChange(avatarUrl) {
            this.currentUser.avatar = avatarUrl;
            this.userAPI.updateUser(this.currentUser);
            this.ui.updateAvatarsInUI(avatarUrl);
        }
    }

    const app = new EnglishApp();
    app.init();
});