class UIManager {
    constructor() {
        this.elements = {
            // Pantallas de autenticación
            loginScreen: document.getElementById('login-screen'),
            registerScreen: document.getElementById('register-screen'),
            appScreen: document.getElementById('app-screen'),
            languageSelectionScreen: document.getElementById('language-selection-screen'),

            // --- NUEVOS ELEMENTOS DEL MODAL DE LECCIÓN ---
            lessonModal: document.getElementById('lesson-modal'),
            lessonContent: document.getElementById('lesson-content'),

            // Formularios
            loginForm: document.getElementById('login-form'),
            registerForm: document.getElementById('register-form'),

            // Inputs Login
            loginEmailInput: document.getElementById('login-email'),
            loginPasswordInput: document.getElementById('login-password'),
            loginError: document.getElementById('login-error'),

            // Inputs Registro
            registerUsernameInput: document.getElementById('register-username'),
            registerEmailInput: document.getElementById('register-email'),
            registerPasswordInput: document.getElementById('register-password'),
            registerPasswordConfirmInput: document.getElementById('register-password-confirm'),
            registerError: document.getElementById('register-error'),

            // Elementos de la App (existentes)
            welcomeMessage: document.getElementById('welcome-message'),
            profileIconContainer: document.getElementById('profile-icon-container'),
            gemCounter: document.getElementById('gem-counter'),
            lifeCounter: document.getElementById('life-counter'),
            dashboardView: document.getElementById('dashboard-view'),
            lessonsView: document.getElementById('lessons-view'),
            dashboardGreeting: document.getElementById('dashboard-greeting'),
            dashboardMotivation: document.getElementById('dashboard-motivation'),
            dashboardProgressBar: document.getElementById('dashboard-progress-bar'),
            dashboardXpText: document.getElementById('dashboard-xp-text'),
            dashboardStreak: document.getElementById('dashboard-streak'),
            dashboardLevel: document.getElementById('dashboard-level'),
            dashboardLeagueIcon: document.getElementById('dashboard-league-icon'),
            dashboardLeagueName: document.getElementById('dashboard-league-name'),
            dashboardModules: document.getElementById('dashboard-modules'),
            dashboardLanguage: document.getElementById('dashboard-language'),
            dashboardLanguageFlag: document.getElementById('dashboard-language-flag'),
            dashboardWords: document.getElementById('dashboard-words'),
            changeLanguageBtn: document.getElementById('change-language-btn'),
            headerProgressBar: document.getElementById('header-progress-bar'),
            vocabularyGrid: document.getElementById('vocabulary-grid'),
            profileModal: document.getElementById('profile-modal'),
            profileModalContent: document.getElementById('modal-profile-content'),
            leaderboardModal: document.getElementById('leaderboard-modal'),
            leaderboardContainer: document.getElementById('leaderboard-container'),
            storeModal: document.getElementById('store-modal'),
            storeContent: document.getElementById('store-content'),
            dailyRewardIcon: document.getElementById('daily-reward-icon'),
            rewardNotificationDot: document.getElementById('reward-notification-dot'),
            dailyRewardsModal: document.getElementById('daily-rewards-modal'),
            dailyRewardsContent: document.getElementById('daily-rewards-content'),
            closeDailyRewardsModalButton: document.getElementById('close-daily-rewards-modal-button'),
            lessonTypeModal: document.getElementById('lesson-type-modal'),
            closeLessonTypeModalButton: document.getElementById('close-lesson-type-modal-button'),
            startVocabBtn: document.getElementById('start-vocab-btn'),
        };
        this.currentCalendarDate = new Date();
        this.storeItems = [
            { id: 'streak-freeze', name: 'Congelador de Racha', description: 'Protege tu racha por un día de inactividad.', price: 150, icon: '❄️', type: 'single' },
            { id: 'xp-booster', name: 'Potenciador de XP', description: 'Duplica el XP ganado en tu próxima lección.', price: 200, icon: '🚀', type: 'single' },
            { id: 'lives', name: 'Vidas Extra', description: 'Consigue más intentos para los quizzes. Cada vida cuesta 5 gemas.', price: 5, icon: '❤️', type: 'quantity' }
        ];
    }

   renderLessonInstructionView(lessonData, app) {
        const teachView = document.getElementById('lesson-teach-view');

        let html = `
            <div class="lesson-header-container">
                 <h2>${lessonData.title}</h2>
                 <p>Estudia el siguiente vocabulario. Cuando estés listo, haz clic en "Empezar Ejercicios" para poner a prueba tus conocimientos.</p>
            </div>
            <div class="lesson-vocab-container">
        `;

        lessonData.sections.forEach(section => {
            // Detecta si esta sección usa iconos o el formato formal/informal
            const hasIcons = section.terms.some(term => term.icon);

            html += `
                <div class="lesson-section">
                    <h3>${section.title}</h3>
                    <table class="vocab-table">
                        <thead>
                            <tr>
                                <th>Español</th>
                                <th>Inglés</th>
                                <th>${hasIcons ? 'Icono' : 'Inglés (Informal)'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${section.terms.map(term => `
                                <tr>
                                    <td>${term.es}</td>
                                    <td>${term.en_formal || '—'}</td>
                                    <td>${hasIcons ? `<span class="vocab-icon">${term.icon}</span>` : (term.en_informal || '—')}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        });

        html += `
            </div>
            <div class="lesson-footer-container">
                <button id="start-exercise-btn" class="lesson-button">Empezar Ejercicios</button>
            </div>
        `;

        teachView.innerHTML = html;
        teachView.classList.add('active');

        document.getElementById('start-exercise-btn').addEventListener('click', () => {
            app.startExercises();
        });
    }

renderExercise(exercise, progress, total, app) {
    const exerciseView = document.getElementById('lesson-exercise-view');

    let contentHTML = '';
    switch (exercise.type) {
        case 'multipleChoice':
            contentHTML = this.renderMultipleChoiceExercise(exercise);
            break;
        case 'fillInTheBlank':
            contentHTML = this.renderFillInTheBlankExercise(exercise);
            break;
        case 'matching':
            contentHTML = this.renderMatchingExercise(exercise);
            break;
        case 'familyTree':
            const rowStructure = exercise.rowStructure || [4, 4, 4, 4];
            contentHTML = this.renderFamilyTreeExercise(exercise, rowStructure);
            break;
        case 'colorGrid':
            contentHTML = this.renderColorGridExercise(exercise);
            break;
        case 'numberToWords':
            contentHTML = this.renderNumberToWordsExercise(exercise);
            break;
        case 'wordsToNumber':
            contentHTML = this.renderWordsToNumberExercise(exercise);
            break;
        case 'imageChoice':
            contentHTML = this.renderImageChoiceExercise(exercise);
            break;
        case 'bodyParts': // --- NUEVO CASO ---
            contentHTML = this.renderBodyPartsExercise(exercise);
            break;
    }

     exerciseView.innerHTML = `
        <div class="lesson-exercise-header">
            <p>Pregunta ${progress} de ${total}</p>
            <div class="lesson-progress-bar-container">
                <div class="lesson-progress-bar" style="width: ${((progress - 1) / total) * 100}%"></div>
            </div>
        </div>
        <div class="lesson-exercise-content">
            ${contentHTML}
        </div>
        <div class="lesson-exercise-footer">
             <div id="feedback-container"></div>
             <button id="check-answer-btn" class="lesson-button" style="display: ${exercise.type === 'matching' || exercise.type === 'colorGrid' ? 'none' : 'inline-block'};">Comprobar</button>
             <button id="next-exercise-btn" class="lesson-button" style="display: none;">Continuar</button>
        </div>
    `;

    document.getElementById('lesson-teach-view').classList.remove('active');
    document.getElementById('lesson-results-view').classList.remove('active');
    exerciseView.classList.add('active');

    document.getElementById('next-exercise-btn').addEventListener('click', () => {
        if (exercise.type === 'matching') {
            app.matchedPairs = 0;
        }
        app.loadNextExercise()
    });

    const checkBtn = document.getElementById('check-answer-btn');
    if(checkBtn.style.display !== 'none') {
        checkBtn.addEventListener('click', () => app.checkExerciseAnswer());
    }

    // --- MANEJADORES DE EVENTOS PARA CADA TIPO DE EJERCICIO ---
    if (exercise.type === 'matching') {
        document.querySelectorAll('.match-item').forEach(item => {
            item.addEventListener('click', () => app.handleMatchAttempt(item));
        });
    } else if (exercise.type === 'multipleChoice' || exercise.type === 'imageChoice') {
        const choiceButtons = document.querySelectorAll('.choice-option, .image-choice-option');
        choiceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const currentSelected = document.querySelector('.selected');
                if (currentSelected) {
                    currentSelected.classList.remove('selected');
                }
                button.classList.add('selected');
            });
        });
    } else if (exercise.type === 'colorGrid') {
        document.querySelectorAll('.color-input').forEach(input => {
            input.addEventListener('blur', (e) => app.checkSingleColorAnswer(e.target));
            input.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    app.checkSingleColorAnswer(e.target);
                }
            });
        });
        document.querySelectorAll('.show-answer-btn').forEach(button => {
            button.addEventListener('click', (e) => app.showSingleColorAnswer(e.target));
        });
    }
}
// EN: Ingles/js/ui.js

renderBodyPartsExercise(exercise) {
    return `
        <p class="exercise-question">${exercise.question}</p>
        <div id="body-parts-container" class="body-parts-container">
            <img src="${exercise.imageUrl}" alt="Diagrama del cuerpo humano" class="body-parts-image">
            ${exercise.parts.map((part, index) => `
                <div class="body-part-label" style="left: ${part.x}%; top: ${part.y}%;">
                    <input type="text" 
                           class="body-part-input" 
                           data-index="${index}" 
                           placeholder="..." 
                           autocomplete="off" 
                           autocorrect="off" 
                           spellcheck="false">
                </div>
            `).join('')}
        </div>
    `;
}

// --- NUEVA FUNCIÓN PARA RENDERIZAR "IMAGE CHOICE" ---
renderImageChoiceExercise(exercise) {
    const shuffledOptions = [...exercise.options].sort(() => Math.random() - 0.5);
    return `
        <p class="exercise-question">${exercise.question}</p>
        <div class="image-choice-target-icon">${exercise.icon}</div>
        <div class="image-choice-grid">
            ${shuffledOptions.map(option => `
                <button class="image-choice-option" data-answer="${option}">${option}</button>
            `).join('')}
        </div>
    `;
}

// --- NUEVA FUNCIÓN PARA RENDERIZAR "NUMBER TO WORDS" ---
renderNumberToWordsExercise(exercise) {
    return `
        <p class="exercise-question">${exercise.question}</p>
        <div class="number-display-container">
            <span class="number-display">${exercise.number}</span>
        </div>
        <input type="text" id="number-exercise-input" class="number-exercise-input" placeholder="Escribe en letras..." autocomplete="off" autocorrect="off" spellcheck="false">
    `;
}

// --- NUEVA FUNCIÓN PARA RENDERIZAR "WORDS TO NUMBER" ---
renderWordsToNumberExercise(exercise) {
    return `
        <p class="exercise-question">${exercise.question}</p>
        <div class="number-display-container">
            <span class="number-display as-text">${exercise.words}</span>
        </div>
        <input type="text" id="number-exercise-input" class="number-exercise-input" placeholder="Escribe en números..." autocomplete="off" autocorrect="off" spellcheck="false">
    `;
}

renderColorGridExercise(exercise) {
    return `
        <p class="exercise-question">${exercise.title}</p>
        <p style="color: var(--subtle-text); font-size: 0.9rem; margin-top: -15px; margin-bottom: 20px;">${exercise.question}</p>
        <div class="color-grid-exercise-container">
            ${exercise.colors.map((color, index) => `
                <div class="color-item" data-index="${index}">
                    <svg class="color-circle-svg" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" fill="${color.hex}" />
                    </svg>
                    <div class="color-input-group">
                        <label class="color-label" for="color-input-${index}">${color.label}</label>
                        <div class="input-with-button-wrapper">
                            <input type="text" id="color-input-${index}" class="color-input" placeholder="english name..." autocomplete="off" autocorrect="off" spellcheck="false" />
                            <button class="show-answer-btn" data-index="${index}" title="Mostrar respuesta">💡</button>
                        </div>
                        <div class="color-feedback"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

    renderMultipleChoiceExercise(exercise) {
        const shuffledOptions = [...exercise.options].sort(() => Math.random() - 0.5);
        return `
            <p class="exercise-question">${exercise.question}</p>
            <div class="multiple-choice-options">
                ${shuffledOptions.map(option => `
                    <button class="choice-option" data-answer="${option}">${option}</button>
                `).join('')}
            </div>
        `;
    }

    renderFillInTheBlankExercise(exercise) {
        return `
            <p class="exercise-question">${exercise.question.replace('____', '<input type="text" id="fill-in-blank-input" placeholder="escribe aquí">')}</p>
        `;
    }

    renderMatchingExercise(exercise) {
        const leftItems = [...exercise.pairs].sort(() => Math.random() - 0.5);
        const rightItems = [...exercise.pairs].sort(() => Math.random() - 0.5);

        return `
             <p class="exercise-question">${exercise.title}</p>
             <div class="matching-game-container">
                <div class="matching-column" id="es-column">
                    ${leftItems.map(item => `
                        <div class="match-item" data-text="${item.es}">${item.es}</div>
                    `).join('')}
                </div>
                <div class="matching-column" id="en-column">
                     ${rightItems.map(item => `
                        <div class="match-item" data-text="${item.en}">${item.en}</div>
                    `).join('')}
                </div>
            </div>
        `;
    }


    renderFamilyTreeExercise(exercise, rowStructure = [4, 4, 4, 4]) {
        const createMember = (placeholder, index) => {
            const isPerspectiveNode = placeholder === exercise.perspectiveNode;
            return `
            <div class="tree-member ${isPerspectiveNode ? 'user-perspective-node' : ''}" data-placeholder="${placeholder}">
                <div class="member-label">${isPerspectiveNode ? `⭐ ${placeholder} (Tú)` : placeholder}</div>
                <input type="text" class="member-input" data-index="${index}" placeholder="Escribe aquí..." autocomplete="off" autocorrect="off" spellcheck="false" />
                <div class="feedback-text"></div>
            </div>
        `;
        };

        const placeholders = exercise.placeholders;
        let htmlRows = '';
        let currentIndex = 0;

        for (let rowCount of rowStructure) {
            const rowPlaceholders = placeholders.slice(currentIndex, currentIndex + rowCount);
            if (rowPlaceholders.length === 0) break;
            const rowHtml = rowPlaceholders.map((ph, idx) => createMember(ph, currentIndex + idx)).join('');
            htmlRows += `<div class="tree-row">${rowHtml}</div>`;
            currentIndex += rowCount;
        }

        return `
        <p class="exercise-question">${exercise.title}</p>
        <p style="color: var(--subtle-text); font-size: 0.9rem; margin-top: -15px; margin-bottom: 20px;">${exercise.question}</p>
        <div class="family-tree-exercise-container">
            <div class="family-tree-gigantic-container">
                ${htmlRows}
            </div>
        </div>
    `;
    }



    /**
     * --- NUEVA FUNCIÓN PARA RENDERIZAR EL ÁRBOL GRANDE ---
     * @param {object} exercise - Los datos del ejercicio desde constants.js.
     * @returns {string} El HTML del ejercicio.
     */
    renderLargeFamilyTreeExercise(exercise) {
        return `
            <p class="exercise-question">${exercise.title}</p>
            <p style="color: var(--subtle-text); font-size: 0.9rem; margin-top: -15px; margin-bottom: 20px;">${exercise.question}</p>
            <div class="family-tree-large-container">
                <div class="tree-row">
                    <div class="tree-member">
                        <div class="member-avatar">👴🏻</div>
                        <input type="text" class="member-input" placeholder="Bisabuelo" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                    <div class="tree-member">
                        <div class="member-avatar">👵🏻</div>
                        <input type="text" class="member-input" placeholder="Bisabuela" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                </div>
                <div class="tree-row">
                     <div class="tree-member">
                        <div class="member-avatar">👴</div>
                        <input type="text" class="member-input" placeholder="Abuelo" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                    <div class="tree-member">
                        <div class="member-avatar">👵</div>
                        <input type="text" class="member-input" placeholder="Abuela" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                    <div class="tree-member">
                        <div class="member-avatar">👴</div>
                        <input type="text" class="member-input" placeholder="Abuelo" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                    <div class="tree-member">
                        <div class="member-avatar">👵</div>
                        <input type="text" class="member-input" placeholder="Abuela" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                </div>
                <div class="tree-row">
                    <div class="tree-member">
                        <div class="member-avatar">👨</div>
                        <input type="text" class="member-input" placeholder="Padre" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                    <div class="tree-member">
                        <div class="member-avatar">👩</div>
                        <input type="text" class="member-input" placeholder="Madre" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                    <div class="tree-member">
                        <div class="member-avatar">👨‍🦰</div>
                        <input type="text" class="member-input" placeholder="Tío" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                    <div class="tree-member">
                        <div class="member-avatar">👩‍🦰</div>
                        <input type="text" class="member-input" placeholder="Tía" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                </div>
                <div class="tree-row">
                    <div class="tree-member">
                        <div class="member-avatar">👦</div>
                        <input type="text" class="member-input" placeholder="Hermano" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                    <div class="tree-member" style="border-color: var(--primary-color);">
                        <div class="member-avatar" style="background-color: var(--primary-color);">⭐</div>
                        <input type="text" class="member-input" placeholder="Yo" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                    <div class="tree-member">
                        <div class="member-avatar">👧</div>
                        <input type="text" class="member-input" placeholder="Hermana" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                    <div class="tree-member">
                        <div class="member-avatar">🧑</div>
                        <input type="text" class="member-input" placeholder="Primo/a" autocomplete="off" autocorrect="off" spellcheck="false">
                        <div class="feedback-text"></div>
                    </div>
                </div>
            </div>
        `;
    }

    showExerciseFeedback(isCorrect, correctAnswer, app) {
        const feedbackContainer = document.getElementById('feedback-container');
        const checkButton = document.getElementById('check-answer-btn');
        const nextButton = document.getElementById('next-exercise-btn');

        checkButton.style.display = 'none';
        nextButton.style.display = 'inline-block';

        if (isCorrect) {
            feedbackContainer.innerHTML = `<p class="feedback correct">¡Correcto! 👍</p>`;
        } else {
            feedbackContainer.innerHTML = `<p class="feedback incorrect">Respuesta incorrecta. La respuesta era: <strong>${correctAnswer}</strong></p>`;
        }

        if (app.currentExerciseIndex >= app.currentLessonData.exercises.length - 1) {
            nextButton.textContent = 'Ver Resultados';
        }
    }

    renderLessonResultsView(score, total, xp, gems, app) {
        const resultsView = document.getElementById('lesson-results-view');
        resultsView.innerHTML = `
            <div class="lesson-results">
                <h3>¡Lección Completada!</h3>
                <p>Tu puntuación final: <strong>${score} de ${total} correctas.</strong></p>
                <p>Has ganado <strong>${xp} XP</strong> y <strong>${gems} gemas 💎</strong>.</p>
                <button id="close-lesson-btn" class="lesson-button">Volver a las lecciones</button>
            </div>
        `;
        document.getElementById('lesson-exercise-view').classList.remove('active');
        resultsView.classList.add('active');

        document.getElementById('close-lesson-btn').addEventListener('click', () => {
            this.closeModal('lesson');
            app.ui.renderDashboard(app);
            app.ui.showView('dashboardView');
        });
    }

    showRequirementMessage(message) {
        const feedbackContainer = document.getElementById('feedback-container');
        if (feedbackContainer) {
            feedbackContainer.innerHTML = `<p class="feedback warning">${message}</p>`;
            setTimeout(() => {
                if (feedbackContainer.innerHTML.includes(message)) {
                    feedbackContainer.innerHTML = '';
                }
            }, 3000);
        }
    }

    displayLoginError(message) {
        this.elements.loginError.textContent = message;
    }

    displayRegisterError(message) {
        this.elements.registerError.textContent = message;
    }

    clearErrors() {
        this.elements.loginError.textContent = '';
        this.elements.registerError.textContent = '';
        const changePassMsg = document.getElementById('change-password-message');
        if (changePassMsg) changePassMsg.textContent = '';
    }

    clearLoginInputs() {
        this.elements.loginEmailInput.value = '';
        this.elements.loginPasswordInput.value = '';
    }

    clearRegisterInputs() {
        this.elements.registerUsernameInput.value = '';
        this.elements.registerEmailInput.value = '';
        this.elements.registerPasswordInput.value = '';
        this.elements.registerPasswordConfirmInput.value = '';
    }

    getStoreItem(itemId) {
        return this.storeItems.find(item => item.id === itemId);
    }

    updateHeaderStats(user, progress) {
        if (this.elements.gemCounter) {
            const gemValueElement = this.elements.gemCounter.querySelector('.value');
            const currentGems = parseInt(gemValueElement.textContent, 10);
            const newGems = user.gems;

            if (!isNaN(currentGems) && currentGems !== newGems) {
                this.animateValue(gemValueElement, currentGems, newGems, 800);
            } else {
                gemValueElement.textContent = newGems;
            }
        }
        if (this.elements.lifeCounter) {
            const lifeValueElement = this.elements.lifeCounter.querySelector('.value');
            const currentLives = parseInt(lifeValueElement.textContent, 10);
            const newLives = progress.lives;

            if (!isNaN(currentLives) && currentLives !== newLives) {
                this.animateValue(lifeValueElement, currentLives, newLives, 800);
            } else {
                lifeValueElement.textContent = newLives;
            }
        }
    }

    switchScreen(screenName) {
        document.querySelectorAll('.screen.active').forEach(s => s.classList.remove('active'));
        const elementKey = screenName + 'Screen';
        if (this.elements[elementKey]) {
            this.elements[elementKey].classList.add('active');
        }
    }

    showView(viewId) {
        const currentView = document.querySelector('.view.active');
        const nextView = this.elements[viewId];
        if (currentView === nextView) return;
        if (currentView) {
            currentView.classList.add('fade-out');
            setTimeout(() => {
                currentView.classList.remove('active', 'fade-out');
                nextView.classList.add('active');
            }, 300);
        } else {
            nextView.classList.add('active');
        }
    }

    renderDashboard(app) {
        const user = app.currentUser;
        const progress = app.currentProgress;
        const userLevel = app.calculateLevel(progress.xp);
        const userLeague = app.getLeagueForLevel(userLevel);
        const xpForCurrentLevel = app.getXpForLevel(userLevel);
        const xpForNextLevel = app.getXpForLevel(userLevel + 1);
        const xpProgress = progress.xp - xpForCurrentLevel;
        const xpNeededForNext = xpForNextLevel - xpForCurrentLevel;
        const progressPercentage = xpNeededForNext > 0 ? (xpProgress / xpNeededForNext) * 100 : 100;
        const modulesCompleted = app.vocabularyModules.filter(m => userLevel >= m.minLevel).length;
        const learnedWords = app.vocabularyModules.filter(m => userLevel >= m.minLevel).reduce((total, module) => total + (module.wordCount || 0), 0);
        this.elements.dashboardGreeting.textContent = `¡Hola de nuevo, ${user.username}!`;
        this.elements.dashboardMotivation.textContent = MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)];
        this.elements.dashboardStreak.innerHTML = `🔥 ${progress.streak}`;
        this.elements.dashboardProgressBar.style.width = `${progressPercentage}%`;
        this.elements.dashboardXpText.textContent = `${progress.xp} / ${xpForNextLevel} XP`;
        this.elements.dashboardLevel.textContent = `Nivel ${userLevel}`;
        this.elements.dashboardLeagueIcon.textContent = userLeague.icon;
        this.elements.dashboardLeagueName.textContent = userLeague.name;
        this.elements.dashboardModules.textContent = `${modulesCompleted}/${app.vocabularyModules.length}`;
        this.elements.dashboardLanguage.textContent = app.selectedLanguage;
        this.elements.dashboardWords.textContent = learnedWords;
        if (this.elements.headerProgressBar) {
            this.elements.headerProgressBar.style.width = `${progressPercentage}%`;
        }
        this.elements.dashboardLanguageFlag.className = 'widget-icon-flag';
        if (app.selectedLanguage === 'Inglés') {
            this.elements.dashboardLanguageFlag.classList.add('flag-gb');
        } else if (app.selectedLanguage === 'Checo') {
            this.elements.dashboardLanguageFlag.classList.add('flag-cz');
        }
        this.updateHeaderStats(user, progress);
    }

    renderWelcomeMessage(user, level, language) {
        this.elements.welcomeMessage.innerHTML = `<span class="username-text">${user.username}</span> <span class="details-text">(${language} - Nivel ${level})</span>`;
    }

    updateHeaderAvatar(user) {
        this.elements.profileIconContainer.innerHTML = `<img src="${user.avatar}" alt="User Avatar">`;
    }

    openModal(modalName) {
        const modal = this.elements[modalName + 'Modal'];
        if (modal) modal.classList.add('active');
    }

    closeModal(modalName) {
        const modal = this.elements[modalName + 'Modal'];
        if (modal) modal.classList.remove('active');
    }

    renderVocabularyGrid(userLevel, onModuleClick, vocabularyModules) {
        this.elements.vocabularyGrid.innerHTML = '';
        vocabularyModules.forEach((module, index) => {
            const isUnlocked = userLevel >= module.minLevel;
            const card = document.createElement('div');
            card.className = `vocab-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            card.style.animationDelay = `${index * 60}ms`;
            card.innerHTML = `<div class="level-tag">Lvl ${module.minLevel}</div><h3>${module.title}</h3><p>${module.description}</p>${!isUnlocked ? '<div class="lock-icon">🔒</div>' : ''}`;
            if (isUnlocked) {
                card.addEventListener('click', () => onModuleClick(module));
            }
            this.elements.vocabularyGrid.appendChild(card);
        });
    }

    renderLeaderboardModal(app) {
        const container = this.elements.leaderboardContainer;
        container.innerHTML = `
            <div class="modal-tabs-container">
                <div class="modal-tabs">
                    <button class="tab-button active" data-type="weekly">Semanal</button>
                    <button class="tab-button" data-type="historical">Histórico</button>
                </div>
                <div class="tab-underline"></div>
            </div>
            <div id="leaderboard-content"></div>
        `;

        const content = container.querySelector('#leaderboard-content');
        const tabs = container.querySelectorAll('.tab-button');
        const underline = container.querySelector('.tab-underline');

        const moveUnderline = (targetTab) => {
            underline.style.left = `${targetTab.offsetLeft}px`;
            underline.style.width = `${targetTab.offsetWidth}px`;
        }

        const render = (type) => {
            const xpKey = type === 'weekly' ? 'weeklyXP' : 'xp';
            const title = type === 'weekly' ? 'Clasificación Semanal' : 'Clasificación Histórica';
            this.renderLeaderboard(app, xpKey, title, content);
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                container.querySelector('.tab-button.active').classList.remove('active');
                e.target.classList.add('active');
                moveUnderline(e.target);
                render(e.target.dataset.type);
            });
        });

        render('weekly');
        setTimeout(() => moveUnderline(container.querySelector('.tab-button.active')), 50);

        this.openModal('leaderboard');
    }

    renderLeaderboard(app, xpKey, title, container) {
        const { userAPI, currentUser, calculateLevel, getLeagueForLevel, selectedLanguage } = app;
        const allUsers = userAPI.getAllUsers();
        const sortedUsers = [...allUsers].sort((a, b) => {
            const xpA = a.progress[selectedLanguage]?.[xpKey] || 0;
            const xpB = b.progress[selectedLanguage]?.[xpKey] || 0;
            return xpB - xpA;
        });

        let listHTML = `<h2>🏆 ${title} de ${selectedLanguage} 🏆</h2><ul class="leaderboard-list">`;
        sortedUsers.forEach((user, index) => {
            const rank = index + 1;
            const userProgress = user.progress[selectedLanguage];
            if (!userProgress) return;

            const level = calculateLevel(userProgress.xp);
            const league = getLeagueForLevel(level);
            let rankClass = 'rank';
            if (rank === 1) rankClass += ' top-1';
            if (rank === 2) rankClass += ' top-2';
            if (rank === 3) rankClass += ' top-3';
            listHTML += `
                <li class="leaderboard-item ${user.username === currentUser.username ? 'current-user-rank' : ''}">
                    <span class="${rankClass}">${rank}</span>
                    <img src="${user.avatar}" alt="${user.username}" class="leaderboard-avatar">
                    <div class="leaderboard-user-info">
                        <span class="leaderboard-name">${user.username}</span>
                        <span class="leaderboard-league" style="color: ${league.color};">${league.icon} ${league.name}</span>
                    </div>
                    <span class="leaderboard-xp">${userProgress[xpKey] || 0} XP</span>
                </li>`;
        });
        listHTML += '</ul>';
        container.innerHTML = listHTML;
    }

    renderStoreModal(app) {
        const container = this.elements.storeContent;
        const user = app.currentUser;

        container.innerHTML = `
            <div class="store-header">
                <h2>Tienda</h2>
                <div class="gem-balance">
                    <span>Tu Saldo:</span>
                    <strong>${user.gems} 💎</strong>
                </div>
            </div>
            <div class="store-items-grid">
                ${this.storeItems.map(item => this.renderStoreItem(item, user)).join('')}
            </div>
        `;

        this.storeItems.forEach(item => {
            if (item.type === 'single') {
                const buyButton = container.querySelector(`#buy-${item.id}`);
                if (buyButton && !buyButton.disabled) {
                    buyButton.addEventListener('click', () => app.handlePurchase(item.id));
                }
            } else if (item.type === 'quantity') {
                const quantityInput = container.querySelector(`#quantity-${item.id}`);
                const minusBtn = container.querySelector(`#minus-${item.id}`);
                const plusBtn = container.querySelector(`#plus-${item.id}`);
                const buyBtn = container.querySelector(`#buy-${item.id}`);
                const priceDisplay = container.querySelector(`#price-${item.id}`);

                const updatePrice = () => {
                    const quantity = parseInt(quantityInput.value);
                    const totalCost = quantity * item.price;
                    priceDisplay.innerHTML = `${totalCost} 💎`;
                    buyBtn.disabled = user.gems < totalCost;
                };

                minusBtn.addEventListener('click', () => {
                    if (quantityInput.value > 1) {
                        quantityInput.value--;
                        updatePrice();
                    }
                });
                plusBtn.addEventListener('click', () => {
                    quantityInput.value++;
                    updatePrice();
                });
                buyBtn.addEventListener('click', () => {
                    app.handlePurchase(item.id, parseInt(quantityInput.value));
                });
                updatePrice();
            }
        });

        this.openModal('store');
    }

    renderStoreItem(item, user) {
        if (item.type === 'quantity') {
            return `
            <div class="store-item">
                <div class="item-icon">${item.icon}</div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                </div>
                <div class="item-action quantity">
                    <div class="quantity-selector">
                        <button id="minus-${item.id}">-</button>
                        <input type="number" id="quantity-${item.id}" value="1" min="1" readonly>
                        <button id="plus-${item.id}">+</button>
                    </div>
                    <button id="buy-${item.id}" class="buy-button" data-item-id="${item.id}">
                        <span id="price-${item.id}">${item.price} 💎</span>
                    </button>
                </div>
            </div>`;
        }

        const canAfford = user.gems >= item.price;
        return `
            <div class="store-item ${!canAfford ? 'disabled' : ''}">
                <div class="item-icon">${item.icon}</div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                </div>
                <div class="item-action">
                    <button id="buy-${item.id}" class="buy-button" ${!canAfford ? 'disabled' : ''}>
                        ${item.price} 💎
                    </button>
                </div>
            </div>
        `;
    }

    showRewardNotification(shouldShow) {
        if (this.elements.rewardNotificationDot) {
            this.elements.rewardNotificationDot.style.display = shouldShow ? 'block' : 'none';
        }
    }

    renderDailyRewardsModal(app) {
        const container = this.elements.dailyRewardsContent;
        const user = app.currentUser;

        const now = new Date();
        const todayStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
        const lastClaimStr = user.lastRewardClaimDate;

        const hasClaimedToday = lastClaimStr === todayStr;

        let lastClaimDate = null;
        if (lastClaimStr) {
            const parts = lastClaimStr.split('-').map(p => parseInt(p, 10));
            lastClaimDate = new Date(parts[0], parts[1] - 1, parts[2]);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        let displayStreak = user.rewardStreak || 0;
        let effectiveStreak = user.rewardStreak || 0;

        if (lastClaimDate && lastClaimDate.getTime() < yesterday.getTime()) {
            effectiveStreak = 0;
        }

        if (hasClaimedToday) {
            displayStreak = user.rewardStreak;
        } else {
            displayStreak = effectiveStreak;
        }

        const claimableDayIndex = hasClaimedToday ? -1 : (effectiveStreak % DAILY_REWARDS.length);

        let modalHTML = `
            <div class="daily-rewards-header">
                <h2>Recompensas Diarias</h2>
                <p>Inicia sesión cada día para conseguir mejores premios. ¡No rompas la racha!</p>
                <p>Tu racha de recompensas: <strong>🔥 ${displayStreak} Días</strong></p>
            </div>
            <div class="daily-rewards-grid">
        `;

        DAILY_REWARDS.forEach((reward, index) => {
            const dayNumber = index + 1;
            let cardClass = 'reward-day-card';
            let buttonHTML = '';

            const historicalClaimIndex = hasClaimedToday ? (displayStreak - 1) % DAILY_REWARDS.length : -1;

            if (index === claimableDayIndex) {
                cardClass += ' claimable';
                buttonHTML = `<button class="claim-button" id="claim-reward-btn-${dayNumber}">Reclamar</button>`;
            } else if (index < effectiveStreak || (hasClaimedToday && index < displayStreak)) {
                cardClass += ' claimed';
                if (index === historicalClaimIndex) {
                    cardClass += ' today';
                }
            } else {
                cardClass += ' locked';
            }

            modalHTML += `
                <div class="${cardClass}">
                    <div class="day-number">Día ${dayNumber}</div>
                    <div class="reward-icon-container"><span class="reward-icon-content">${reward.icon}</span></div>
                    <div class="reward-amount">${reward.gems} Gemas</div>
                    ${buttonHTML}
                </div>
            `;
        });

        modalHTML += `</div>`;
        container.innerHTML = modalHTML;

        const claimButton = container.querySelector('.claim-button');
        if (claimButton) {
            claimButton.addEventListener('click', () => app.handleClaimDailyReward());
        }

        this.openModal('dailyRewards');
    }

    renderProfileModal(app) {
        const user = app.currentUser;
        const progress = app.currentProgress;
        const userLevel = app.calculateLevel(progress.xp);
        const userLeague = app.getLeagueForLevel(userLevel);
        const xpForCurrentLevel = app.getXpForLevel(userLevel);
        const xpForNextLevel = app.getXpForLevel(userLevel + 1);
        const xpProgress = progress.xp - xpForCurrentLevel;
        const xpNeededForNext = xpForNextLevel - xpForCurrentLevel;
        const progressPercentage = xpNeededForNext > 0 ? (xpProgress / xpNeededForNext) * 100 : 100;
        const modulesCompleted = app.vocabularyModules.filter(m => userLevel >= m.minLevel).length;

        this.elements.profileModalContent.innerHTML = `
            <div class="modal-tabs-container">
                <div class="modal-tabs">
                    <button class="tab-button active" data-tab="stats">Estadísticas (${app.selectedLanguage})</button>
                    <button class="tab-button" data-tab="friends">Amigos</button>
                    <button class="tab-button" data-tab="settings">Ajustes</button>
                    <button class="tab-button" data-tab="security">Seguridad</button> 
                </div>
                <div class="tab-underline"></div>
            </div>
            <div class="tab-content">
                <div id="stats-tab" class="tab-pane active">
                    <div class="profile-header"><div class="profile-avatar"><img src="${user.avatar}"></div><h2 class="profile-username">${user.username}</h2><p class="profile-joined">Usuario desde ${new Date(user.joined).toLocaleDateString("es-ES", { year: 'numeric', month: 'long' })}</p></div>
                    <div class="profile-stats">
                        <div class="stat"><h4>${userLevel}</h4><p>Nivel</p></div>
                        <div class="stat"><h4>${modulesCompleted}</h4><p>Módulos</p></div>
                        <div class="stat"><h4>🔥 ${progress.streak}</h4><p>Racha</p></div>
                        <div class="stat">
                            <h4 style="color: ${userLeague.color}; font-size: 1.5rem;">${userLeague.icon}</h4>
                            <p>${userLeague.name}</p>
                        </div>
                    </div>
                    <div class="xp-progress-section"><h5>Progreso al Nivel ${userLevel + 1}</h5><div class="progress-bar-container"><div class="progress-bar" style="width: ${progressPercentage}%;"></div></div><p class="xp-text">${progress.xp} / ${xpForNextLevel} XP</p></div>
                    <div class="divider"></div>
                    <div class="calendar-section"><div class="calendar-nav"><button id="prev-month-btn">&lt;</button><h5 id="calendar-month-year"></h5><button id="next-month-btn">&gt;</button></div><div class="streak-calendar" id="streak-calendar"></div></div>
                </div>
                <div id="friends-tab" class="tab-pane">
                    <div class="add-friend-section"><input type="text" id="add-friend-input" placeholder="Nombre de usuario del amigo..."><button id="add-friend-btn">Añadir</button></div>
                    <div id="friend-request-message"></div><div id="friends-list"></div>
                </div>
                <div id="settings-tab" class="tab-pane">
                    <div class="profile-settings"><h5>Ajustes Generales</h5><div class="setting-item"><label for="theme-toggle">Modo Oscuro</label><div class="theme-switch-wrapper"><label class="theme-switch"><input type="checkbox" id="theme-toggle"><span class="slider"></span></label></div></div>
                    <div class="divider"></div><div class="avatar-section"><h5>Elige tu avatar</h5><label for="avatar-upload-input" class="upload-avatar-btn">🖼️ Subir imagen o GIF</label><input type="file" id="avatar-upload-input" accept="image/png, image/jpeg, image/gif"><div class="avatar-gallery" id="avatar-gallery"></div></div></div>
                </div>
                <div id="security-tab" class="tab-pane">
                    <div class="profile-settings" style="padding: 0 20px;">
                        <h5 style="text-align: center; margin-bottom: 20px;">Cambiar Contraseña</h5>
                        <form id="change-password-form">
                            <div class="input-group">
                                <input type="password" id="current-password" placeholder="Contraseña actual" required autocomplete="current-password">
                            </div>
                            <div class="input-group">
                                <input type="password" id="new-password" placeholder="Nueva contraseña" required autocomplete="new-password">
                            </div>
                            <div class="input-group">
                                <input type="password" id="confirm-new-password" placeholder="Confirmar nueva contraseña" required autocomplete="new-password">
                            </div>
                            <button type="submit" class="button-secondary">Cambiar Contraseña</button>
                            <div id="change-password-message" class="auth-error"></div>
                        </form>
                    </div>
                </div>
            </div>`;

        this.currentCalendarDate = new Date();
        this.renderStreakCalendar(progress);
        this.renderFriendsList(user, app.userAPI.getAllUsers(), app.calculateLevel, app);
        this.setupProfileModalListeners(app);
        this.openModal('profile');
    }

    animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    renderFriendComparisonModal(app, friendUser) {
        const language = app.selectedLanguage;
        const myProgress = app.currentProgress;
        const friendProgress = friendUser.progress[language];

        if (!friendProgress || friendProgress.xp === 0) {
            this.elements.profileModalContent.innerHTML = `<button id="back-to-profile-btn" class="back-button">&lt; Volver</button> <p style="padding: 20px; text-align: center;">${friendUser.username} aún no ha comenzado a aprender ${language}.</p>`;
            document.getElementById('back-to-profile-btn').addEventListener('click', () => this.renderProfileModal(app));
            return;
        }

        const myLevel = app.calculateLevel(myProgress.xp);
        const friendLevel = app.calculateLevel(friendProgress.xp);
        const myLeague = app.getLeagueForLevel(myLevel);
        const friendLeague = app.getLeagueForLevel(friendLevel);
        const myModules = app.vocabularyModules.filter(m => myLevel >= m.minLevel).length;
        const friendModules = app.vocabularyModules.filter(m => friendLevel >= m.minLevel).length;
        const myWords = app.vocabularyModules.filter(m => myLevel >= m.minLevel).reduce((t, m) => t + (m.wordCount || 0), 0);
        const friendWords = app.vocabularyModules.filter(m => friendLevel >= m.minLevel).reduce((t, m) => t + (m.wordCount || 0), 0);

        const getWinnerClass = (myStat, friendStat, isMe) => {
            if (myStat > friendStat) return isMe ? 'winner' : 'loser';
            if (friendStat > myStat) return isMe ? 'loser' : 'winner';
            return 'tie';
        };

        this.elements.profileModalContent.innerHTML = `
            <button id="back-to-profile-btn" class="back-button">&lt; Volver a mi perfil</button>
            <div class="comparison-view">
                <div class="comparison-header"><h2>Comparativa en ${language}</h2></div>
                <div class="comparison-body">
                    <div class="comparison-col me">
                        <img src="${app.currentUser.avatar}" class="comparison-avatar">
                        <h3>${app.currentUser.username} (Tú)</h3>
                    </div>
                    <div class="comparison-col friend">
                        <img src="${friendUser.avatar}" class="comparison-avatar">
                        <h3>${friendUser.username}</h3>
                    </div>
                </div>
                <div class="comparison-xp-bar">
                    <div class="xp-bar-fill me" style="width: ${myProgress.xp / (myProgress.xp + friendProgress.xp) * 100}%"></div>
                    <div class="xp-bar-fill friend" style="width: ${friendProgress.xp / (myProgress.xp + friendProgress.xp) * 100}%"></div>
                </div>
                <div class="comparison-stats">
                    <div class="comparison-row">
                        <span id="my-level" class="stat-value ${getWinnerClass(myLevel, friendLevel, true)}">0</span>
                        <span class="stat-label">Nivel</span>
                        <span id="friend-level" class="stat-value ${getWinnerClass(myLevel, friendLevel, false)}">0</span>
                    </div>
                    <div class="comparison-row">
                        <span id="my-xp" class="stat-value ${getWinnerClass(myProgress.xp, friendProgress.xp, true)}">0</span>
                        <span class="stat-label">XP Total</span>
                        <span id="friend-xp" class="stat-value ${getWinnerClass(myProgress.xp, friendProgress.xp, false)}">0</span>
                    </div>
                    <div class="comparison-row">
                        <span id="my-streak" class="stat-value ${getWinnerClass(myProgress.streak, friendProgress.streak, true)}">🔥 0</span>
                        <span class="stat-label">Racha</span>
                        <span id="friend-streak" class="stat-value ${getWinnerClass(myProgress.streak, friendProgress.streak, false)}">🔥 0</span>
                    </div>
                    <div class="comparison-row">
                        <span id="my-words" class="stat-value ${getWinnerClass(myWords, friendWords, true)}">0</span>
                        <span class="stat-label">Palabras</span>
                        <span id="friend-words" class="stat-value ${getWinnerClass(myWords, friendWords, false)}">0</span>
                    </div>
                    <div class="comparison-row">
                        <span id="my-modules" class="stat-value ${getWinnerClass(myModules, friendModules, true)}">0</span>
                        <span class="stat-label">Módulos</span>
                        <span id="friend-modules" class="stat-value ${getWinnerClass(myModules, friendModules, false)}">0</span>
                    </div>
                    <div class="comparison-row">
                        <span class="stat-value" style="color: ${myLeague.color};">${myLeague.icon}</span>
                        <span class="stat-label">Liga</span>
                        <span class="stat-value" style="color: ${friendLeague.color};">${friendLeague.icon}</span>
                    </div>
                </div>
            </div>`;

        const animationDuration = 800;
        this.animateValue(document.getElementById('my-level'), 0, myLevel, animationDuration);
        this.animateValue(document.getElementById('friend-level'), 0, friendLevel, animationDuration);
        this.animateValue(document.getElementById('my-xp'), 0, myProgress.xp, animationDuration);
        this.animateValue(document.getElementById('friend-xp'), 0, friendProgress.xp, animationDuration);
        this.animateValue(document.getElementById('my-words'), 0, myWords, animationDuration);
        this.animateValue(document.getElementById('friend-words'), 0, friendWords, animationDuration);
        this.animateValue(document.getElementById('my-modules'), 0, myModules, animationDuration);
        this.animateValue(document.getElementById('friend-modules'), 0, friendModules, animationDuration);
        const myStreakEl = document.getElementById('my-streak');
        const friendStreakEl = document.getElementById('friend-streak');
        myStreakEl.innerHTML = `🔥 ${myProgress.streak}`;
        friendStreakEl.innerHTML = `🔥 ${friendProgress.streak}`;

        document.getElementById('back-to-profile-btn').addEventListener('click', () => this.renderProfileModal(app));
    }

    setupProfileModalListeners(app) {
        const tabContainer = this.elements.profileModalContent.querySelector('.modal-tabs');
        const tabButtons = tabContainer.querySelectorAll('.tab-button');
        const underline = this.elements.profileModalContent.querySelector('.tab-underline');

        const moveUnderline = (targetTab) => {
            underline.style.left = `${targetTab.offsetLeft}px`;
            underline.style.width = `${targetTab.offsetWidth}px`;
        }
        moveUnderline(tabContainer.querySelector('.active'));

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabContainer.querySelector('.active').classList.remove('active');
                button.classList.add('active');
                moveUnderline(button);

                document.querySelectorAll('.tab-pane.active').forEach(p => p.classList.remove('active'));
                const tabPane = document.getElementById(`${button.dataset.tab}-tab`);
                if (tabPane) tabPane.classList.add('active');
            });
        });

        const changePasswordForm = document.getElementById('change-password-form');
        if (changePasswordForm) {
            changePasswordForm.addEventListener('submit', (e) => app.handleChangePassword(e));
        }

        const prevBtn = document.getElementById('prev-month-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() - 1);
                this.renderStreakCalendar(app.currentProgress);
            });
        }
        const nextBtn = document.getElementById('next-month-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() + 1);
                this.renderStreakCalendar(app.currentProgress);
            });
        }

        const addFriendBtn = document.getElementById('add-friend-btn');
        if (addFriendBtn) {
            addFriendBtn.addEventListener('click', () => app.handleAddFriend());
        }

        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.checked = document.body.getAttribute('data-theme') === 'dark';
            themeToggle.addEventListener('change', () => document.body.setAttribute('data-theme', themeToggle.checked ? 'dark' : 'light'));
        }

        const avatarGallery = document.getElementById('avatar-gallery');
        if (avatarGallery) {
            avatarGallery.innerHTML = AVATARS.map(avatarUrl => `<div class="avatar-option ${avatarUrl === app.currentUser.avatar ? 'selected' : ''}" data-avatar='${avatarUrl}'><img src="${avatarUrl}"></div>`).join('');
            avatarGallery.addEventListener('click', e => {
                const option = e.target.closest('.avatar-option');
                if (option) app.handleAvatarChange(option.dataset.avatar);
            });
        }

        const avatarUploadInput = document.getElementById('avatar-upload-input');
        if (avatarUploadInput) {
            avatarUploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => app.handleAvatarChange(event.target.result);
                    reader.onerror = () => alert("Hubo un error al cargar tu imagen.");
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    renderStreakCalendar(progress) {
        const calendarEl = document.getElementById('streak-calendar');
        if (!calendarEl) return;
        const monthYearEl = document.getElementById('calendar-month-year');
        monthYearEl.textContent = this.currentCalendarDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
        const activeDaysSet = new Set(progress.activeDays);
        let calendarHTML = '<div class="calendar-header"><div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div><div>Dom</div></div><div class="calendar-body">';
        const month = this.currentCalendarDate.getMonth();
        const year = this.currentCalendarDate.getFullYear();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const todayStr = new Date().toISOString().slice(0, 10);
        let startingDay = firstDay.getDay();
        startingDay = (startingDay === 0) ? 6 : startingDay - 1;
        calendarHTML += '<div></div>'.repeat(startingDay);
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            let dayClass = activeDaysSet.has(dateStr) ? 'day active' : 'day neutral';
            if (dateStr === todayStr) dayClass += ' today';
            calendarHTML += `<div class="${dayClass}">${day}</div>`;
        }
        calendarHTML += '</div>';
        calendarEl.innerHTML = calendarHTML;
    }

    renderFriendsList(user, allUsersData, calculateLevel, app) {
        const friendsListEl = document.getElementById('friends-list');
        if (!friendsListEl) return;

        const allUsers = Object.values(allUsersData);

        friendsListEl.innerHTML = user.friends.length === 0
            ? '<p style="text-align:center; color: var(--subtle-text);">Aún no tienes amigos. ¡Añade uno!</p>'
            : user.friends.map(friendUsername => {
                const friendData = allUsers.find(u => u.username.toLowerCase() === friendUsername.toLowerCase());
                if (!friendData) return '';
                const friendProgress = friendData.progress[app.selectedLanguage];
                const friendLevel = friendProgress ? calculateLevel(friendProgress.xp) : 1;
                return `<div class="friend-item clickable" data-username="${friendData.username.toLowerCase()}">
                            <div class="friend-avatar"><img src="${friendData.avatar}"></div>
                            <div class="friend-info"><h5>${friendData.username}</h5><p>Racha (${app.selectedLanguage}): 🔥 ${friendProgress ? friendProgress.streak : 0}</p></div>
                            <span class="leaderboard-level">Nivel ${friendLevel}</span>
                        </div>`;
            }).join('');

        friendsListEl.querySelectorAll('.friend-item.clickable').forEach(item => {
            item.addEventListener('click', () => {
                const username = item.dataset.username;
                const friendData = allUsers.find(u => u.username.toLowerCase() === username);
                if (friendData) {
                    app.ui.renderFriendComparisonModal(app, friendData);
                }
            });
        });
    }

    updateFriendMessage(text, isError) {
        const messageEl = document.getElementById('friend-request-message');
        messageEl.textContent = text;
        messageEl.style.color = isError ? '#E53E3E' : '#48BB78';
    }

    updateAvatarsInUI(avatarUrl) {
        const profileAvatarImg = document.querySelector('.profile-avatar img');
        if (profileAvatarImg) profileAvatarImg.src = avatarUrl;

        const headerAvatarImg = document.querySelector('#profile-icon-container img');
        if (headerAvatarImg) headerAvatarImg.src = avatarUrl;

        document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
        const newSelection = document.querySelector(`.avatar-option[data-avatar='${avatarUrl}']`);
        if (newSelection) newSelection.classList.add('selected');
    }
}