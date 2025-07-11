const XP_PER_LEVEL = 150;

const MOTIVATIONAL_PHRASES = [
    "¡Es un gran día para aprender algo nuevo!",
    "Cada lección es un paso más hacia la fluidez.",
    "La constancia es la clave del éxito. ¡No te rindas!",
    "¿Listo/a para tu dosis diaria de conocimiento?",
    "El aprendizaje es una aventura. ¿A dónde irás hoy?",
    "¡Tu cerebro está listo para nuevos desafíos!",
    "Sigue así, ¡lo estás haciendo genial!"
];

const createAvatar = (bgColor, figureColor = 'rgba(255,255,255,0.8)') => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${bgColor}"/><g fill="${figureColor}"><circle cx="50" cy="35" r="15"/><path d="M15,90 C15,70 85,70 85,90 Z"/></g></svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const AVATARS = [
    createAvatar('#5A67D8'), createAvatar('#F56565'), createAvatar('#48BB78'),
    createAvatar('#ED8936'), createAvatar('#9F7AEA'), createAvatar('#38B2AC'),
    createAvatar('#ED64A6'), createAvatar('#4299E1'), createAvatar('#718096'),
    createAvatar('#0BC5EA')
];

// --- DATOS LECCIÓN 1 ---
const GREETINGS_VOCABULARY = {
    title: "Saludos y Presentaciones",
    sections: [
        {
            title: "Saludos (Greetings)",
            terms: [
                { es: "Hola", en_formal: "Hello", en_informal: "Hi / Hey" },
                { es: "Buenos días", en_formal: "Good morning", en_informal: "Morning!" },
                { es: "Buenas tardes", en_formal: "Good afternoon", en_informal: null },
                { es: "Buenas noches (al llegar)", en_formal: "Good evening", en_informal: null }
            ]
        },
        {
            title: "Preguntas Comunes (Common Questions)",
            terms: [
                { es: "¿Cómo está usted?", en_formal: "How are you?", en_informal: "How are you doing?" },
                { es: "¿Cómo estás?", en_formal: "How are you?", en_informal: "How’s it going? / What's up?" },
                { es: "¿Qué tal?", en_formal: "How’s everything?", en_informal: "What's new?" },
                { es: "¿Cómo te llamas?", en_formal: "What is your name?", en_informal: "What's your name?" }
            ]
        },
        {
            title: "Respuestas Comunes (Common Responses)",
            terms: [
                { es: "Estoy bien, gracias. ¿Y usted?", en_formal: "I'm fine, thank you. And you?", en_informal: "I'm good, thanks. You?" },
                { es: "Muy bien, gracias.", en_formal: "Very well, thank you.", en_informal: "Pretty good." },
                { es: "No muy bien.", en_formal: "Not so well.", en_informal: "Not so great." },
                { es: "Mi nombre es...", en_formal: "My name is...", en_informal: "I'm..." }
            ]
        },
        {
            title: "Despedidas (Farewells)",
            terms: [
                { es: "Adiós", en_formal: "Goodbye", en_informal: "Bye / Bye-bye" },
                { es: "Hasta luego", en_formal: "See you later", en_informal: "Catch you later" },
                { es: "Hasta pronto", en_formal: "See you soon", en_informal: null },
                { es: "Cuídese / Cuídate", en_formal: "Take care", en_informal: "Take it easy" },
                { es: "Buenas noches (al irse)", en_formal: "Good night", en_informal: "Night!" },
                { es: "Que tenga un buen día", en_formal: "Have a nice day", en_informal: "Have a good one" }
            ]
        }
    ],
    exercises: [
        {
            type: 'multipleChoice',
            question: '¿Cuál es una forma informal de decir "Hello"?',
            options: ['Good evening', 'Hey', 'Goodbye', 'Pleased to meet you'],
            answer: 'Hey'
        },
        {
            type: 'multipleChoice',
            question: 'Si llegas a una cena a las 8 PM, ¿qué saludo es el más apropiado?',
            options: ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
            answer: 'Good evening'
        },
        {
            type: 'fillInTheBlank',
            question: 'Para despedirte por la noche antes de ir a dormir, dices: "Good ____!"',
            answer: 'night'
        },
        {
            type: 'matching',
            title: 'Empareja la pregunta con la respuesta',
            pairs: [
                { es: "How are you?", en: "I'm fine, thank you." },
                { es: "What's your name?", en: "My name is Alex." },
                { es: "See you later", en: "Bye!" },
                { es: "What's up?", en: "Not much." }
            ]
        },
        {
            type: 'multipleChoice',
            question: 'Tu amigo te dice "Catch you later". ¿Qué significa?',
            options: ['Nos vemos luego', 'Te atraparé más tarde', 'Cuídate', 'Buenos días'],
            answer: 'Nos vemos luego'
        },
        {
            type: 'fillInTheBlank',
            question: 'Una forma muy común e informal de preguntar "¿Cómo estás?" es: "How\'s it ____?"',
            answer: 'going'
        },
        {
            type: 'multipleChoice',
            question: '"Have a good one" es una manera informal de decir...',
            options: ['Que te aproveche', 'Pásalo bien', 'Que tengas un buen día', 'Nos vemos'],
            answer: 'Que tengas un buen día'
        }
    ]
};

// --- DATOS LECCIÓN 2 ---
const THE_FAMILY_VOCABULary = {
    title: "Miembros de la Familia",
    sections: [
        {
            title: "Vocabulario Principal",
            terms: [
                { es: "Padres", en_formal: "Parents", en_informal: null },
                { es: "Padre / Madre", en_formal: "Father / Mother", en_informal: "Dad / Mom" },
                { es: "Hijos / Hijos (niños)", en_formal: "Children / Kids", en_informal: null },
                { es: "Hijo / Hija", en_formal: "Son / Daughter", en_informal: null },
                { es: "Hermanos", en_formal: "Siblings", en_informal: null },
                { es: "Hermano / Hermana", en_formal: "Brother / Sister", en_informal: null },
                { es: "Abuelos", en_formal: "Grandparents", en_informal: null },
                { es: "Abuelo / Abuela", en_formal: "Grandfather / Grandmother", en_informal: "Grandpa / Grandma" },
                { es: "Nietos", en_formal: "Grandchildren", en_informal: null },
                { es: "Nieto / Nieta", en_formal: "Grandson / Granddaughter", en_informal: null },
                { es: "Bisabuelos", en_formal: "Great-grandparents", en_informal: null },
                { es: "Bisabuelo / Bisabuela", en_formal: "Great-grandfather / Great-grandmother", en_informal: null },
                { es: "Tatarabuelos", en_formal: "Great-great-grandparents", en_informal: null },
                { es: "Tatarabuelo / Tatarabuela", en_formal: "Great-great-grandfather / Great-great-grandmother", en_informal: null },
                { es: "Tío / Tía", en_formal: "Uncle / Aunt", en_informal: null },
                { es: "Sobrino / Sobrina", en_formal: "Nephew / Niece", en_informal: null },
                { es: "Primo / Prima", en_formal: "Cousin", en_informal: null },
                { es: "Esposo / Esposa", en_formal: "Husband / Wife", en_informal: null },
                { es: "Suegro / Suegra", en_formal: "Father-in-law / Mother-in-law", en_informal: null },
                { es: "Yerno / Nuera", en_formal: "Son-in-law / Daughter-in-law", en_informal: null },
                { es: "Cuñado / Cuñada", en_formal: "Brother-in-law / Sister-in-law", en_informal: null }
            ]
        }
    ],
    exercises: [
        // --- EJERCICIO 1: PERSPECTIVA "YO" ---
        {
            type: 'familyTree',
            size: 'large',
            rowStructure: [2, 2, 4, 4, 4],
            title: 'El Árbol Completo (Tu Ascendencia)',
            question: "Estás en la posición de 'Yo' (⭐). Rellena el árbol completo con los nombres correctos en inglés.",
            perspectiveNode: 'Yo', // Indica qué nodo es el "usuario" 
            placeholders: ['Tatarabuelo', 'Tatarabuela', 'Bisabuelo', 'Bisabuela', 'Abuelo', 'Abuela', 'Tío Abuelo', 'Tía Abuela', 'Padre', 'Madre', 'Tío', 'Tía', 'Hermano', 'Hermana', 'Yo', 'Primo/a'],
            members: [
                'Great-great-grandfather', 'Great-great-grandmother',
                'Great-grandfather', 'Great-grandmother',
                'Grandfather', 'Grandmother', 'Granduncle', 'Grandaunt',
                'Father', 'Mother', 'Uncle', 'Aunt',
                'Brother', 'Sister', 'Me', 'Cousin'
            ]
        },
        {
            type: 'familyTree',
            size: 'large',
            rowStructure: [2, 2, 5],
            title: 'El Árbol Completo la familia de tu esposa/marido desde tu perspectiva',
            question: "Estás en la posición de 'Yo' (⭐). Rellena el árbol completo con los nombres correctos en inglés.",
            perspectiveNode: 'Yo', // Indica qué nodo es el "usuario"      
            placeholders: ['Abuelo de mi Esposa/Marido', 'Abuela de mi Esposa/Marido', 'Suegro', 'Suegra', 'Cuñado', 'Cuñada', 'Esposa', 'Marido', 'Yo'],
            members: [
                'Grandfather-in-law',  // Abuelo de mi Esposa/Marido
                'Grandmother-in-law',  // Abuela de mi Esposa/Marido
                'Father-in-law',       // Suegro
                'Mother-in-law',       // Suegra
                'Brother-in-law',      // Cuñado
                'Sister-in-law',       // Cuñada
                'Wife',                // Esposa
                'Husband',             // Marido
                'Me'                   // Yo
            ]
        },
        {
            type: 'familyTree',
            size: 'large',
            rowStructure: [3, 4, 2, 2],
            title: 'El Árbol Completo (Tu Descendencia)',
            question: "Estás en la posición de 'Yo' (⭐). Rellena el árbol completo con los nombres correctos en inglés.",
            perspectiveNode: 'Yo',
            placeholders: [
                'Yo', 'Esposa', 'Marido',
                'Hijo', 'Hija', 'Yerno', 'Nuera',
                'Nieto', 'Nieta',
                'Bisnieto', 'Bisnieta'
            ],
            members: [
                'Me', 'Wife', 'Husband',
                'Son', 'Daughter', 'Son-in-law', 'Daughter-in-law',
                'Grandson', 'Granddaughter',
                'Great-grandson', 'Great-granddaughter'
            ]
        }
    ]
};

// --- DATOS LECCIÓN 3: COLORES ---
const COLORS_VOCABULARY = {
   exercises: [
    {
        type: 'colorGrid',
        title: 'Nombra los Colores',
        question: 'Escribe el nombre en inglés para cada uno de los 54 colores que se muestran a continuación.',
        colors: [
            { name: 'Red', hex: '#FF0000', label: 'Rojo' },
            { name: 'Blue', hex: '#0000FF', label: 'Azul' },
            { name: 'Yellow', hex: '#FFFF00', label: 'Amarillo' },
            { name: 'Green', hex: '#008000', label: 'Verde' },
            { name: 'Orange', hex: '#FFA500', label: 'Naranja' },
            { name: 'Purple', hex: '#800080', label: 'Morado' },
            { name: 'Black', hex: '#000000', label: 'Negro' },
            { name: 'White', hex: '#FFFFFF', label: 'Blanco' },
            { name: 'Gray', hex: '#808080', label: 'Gris' },
            { name: 'Brown', hex: '#804000', label: 'Marrón' },
            { name: 'Pink', hex: '#FFC0CB', label: 'Rosa' },
            { name: 'Cyan', hex: '#00FFFF', label: 'Cian' },
            { name: 'Magenta', hex: '#FF00FF', label: 'Magenta' },
            { name: 'Lime', hex: '#00FF00', label: 'Lima' },
            { name: 'Teal', hex: '#008080', label: 'Verde azulado' },
            { name: 'Navy', hex: '#000080', label: 'Azul marino' },
            { name: 'Maroon', hex: '#800000', label: 'Granate' },
            { name: 'Olive', hex: '#808000', label: 'Oliva' },
            { name: 'Silver', hex: '#C0C0C0', label: 'Plateado' },
            { name: 'Gold', hex: '#FFD700', label: 'Dorado' },
            { name: 'Beige', hex: '#F5F5DC', label: 'Beige' },
            { name: 'Turquoise', hex: '#40E0D0', label: 'Turquesa' },
            { name: 'Violet', hex: '#EE82EE', label: 'Violeta' },
            { name: 'Crimson', hex: '#DC143C', label: 'Carmesí' },
            { name: 'Salmon', hex: '#FA8072', label: 'Salmón' },
            { name: 'Lavender', hex: '#E6E6FA', label: 'Lavanda' },
            { name: 'Plum', hex: '#DDA0DD', label: 'Ciruela' },
            { name: 'Orchid', hex: '#DA70D6', label: 'Orquídea' },
            { name: 'Sky Blue', hex: '#87CEEB', label: 'Azul cielo' },
            { name: 'Light Green', hex: '#90EE90', label: 'Verde claro' },
            { name: 'Dark Blue', hex: '#00008B', label: 'Azul oscuro' },
            { name: 'Dark Green', hex: '#006400', label: 'Verde oscuro' },
            { name: 'Coral', hex: '#FF7F50', label: 'Coral' },
            { name: 'Mint', hex: '#98FF98', label: 'Menta' },
            { name: 'Chocolate', hex: '#D2691E', label: 'Chocolate' },
            { name: 'Ivory', hex: '#FFFFF0', label: 'Marfil' },
            { name: 'Mustard', hex: '#FFDB58', label: 'Mostaza' },
            { name: 'Peach', hex: '#FFE5B4', label: 'Melocotón' },
            { name: 'Rose', hex: '#FF007F', label: 'Rosado intenso/Fucsia' },
            { name: 'Charcoal', hex: '#36454F', label: 'Carbón' },
            { name: 'Aquamarine', hex: '#7FFFD4', label: 'Aguamarina' },
            { name: 'Bronze', hex: '#CD7F32', label: 'Bronce' },
            { name: 'Azure', hex: '#007FFF', label: 'Azul celeste intenso' },
            { name: 'Pearl', hex: '#EAE0C8', label: 'Perla' },
            { name: 'Sand', hex: '#C2B280', label: 'Arena' },
            { name: 'Amber', hex: '#FFBF00', label: 'Ámbar' },
            { name: 'Ice Blue', hex: '#AFEEEE', label: 'Celeste' },
            { name: 'Lilac', hex: '#C8A2C8', label: 'Lila' }
        ]
    }
]
};

// --- DATOS LECCIÓN 4: NÚMEROS ---
const NUMBERS_VOCABULARY = {
    title: "Números de 0 a 1 Billón",
    sections: [
        {
            title: "Conceptos Básicos (0-19)",
            terms: [
                { es: "0", en_formal: "Zero", en_informal: "oh (en tel.)" },
                { es: "1-10", en_formal: "One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten", en_informal: null },
                { es: "11-19", en_formal: "Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen", en_informal: null }
            ]
        },
        {
            title: "Decenas (20-90)",
            terms: [
                { es: "20", en_formal: "Twenty", en_informal: null },
                { es: "30", en_formal: "Thirty", en_informal: null },
                { es: "40", en_formal: "Forty", en_informal: "¡Ojo! no 'fourty'" },
                { es: "50", en_formal: "Fifty", en_informal: null },
                { es: "60-90", en_formal: "Sixty, Seventy, Eighty, Ninety", en_informal: null },
                { es: "21", en_formal: "Twenty-one", en_informal: "Se usa un guión" },
                { es: "35", en_formal: "Thirty-five", en_informal: "Se usa un guión" }
            ]
        },
        {
            title: "Grandes Números",
            terms: [
                { es: "100", en_formal: "One hundred", en_informal: null },
                { es: "101", en_formal: "One hundred and one", en_informal: "Se usa 'and' (UK)" },
                { es: "1,000", en_formal: "One thousand", en_informal: null },
                { es: "1,000,000", en_formal: "One million", en_informal: null },
                { es: "1,000,000,000", en_formal: "One billion", en_informal: "En inglés, 'a billion' es 'mil millones'" }
            ]
        },
        {
            title: "Ejemplos Complejos",
            terms: [
                { es: "345", en_formal: "Three hundred and forty-five", en_informal: null },
                { es: "5,821", en_formal: "Five thousand, eight hundred and twenty-one", en_informal: null },
                { es: "123,456", en_formal: "One hundred and twenty-three thousand, four hundred and fifty-six", en_informal: null }
            ]
        }
    ],
    exercises: [
        {
            type: 'numberToWords',
            question: 'Escribe el siguiente número en letras:',
            number: '42',
            answer: 'forty-two'
        },
        {
            type: 'wordsToNumber',
            question: 'Escribe las siguientes letras en número:',
            words: 'One hundred and five',
            answer: '105'
        },
        {
            type: 'numberToWords',
            question: 'Escribe el siguiente número en letras:',
            number: '813',
            answer: 'eight hundred and thirteen'
        },
        {
            type: 'wordsToNumber',
            question: 'Escribe las siguientes letras en número:',
            words: 'Two thousand, five hundred',
            answer: '2500'
        },
        {
            type: 'numberToWords',
            question: 'Escribe el siguiente número en letras (¡con comas!):',
            number: '56,987',
            answer: 'fifty-six thousand, nine hundred and eighty-seven'
        },
         {
            type: 'wordsToNumber',
            question: 'Escribe las siguientes letras en número:',
            words: 'One million',
            answer: '1000000'
        }
    ]
};

// =======================================================================
// --- ¡NUEVA LECCIÓN! DATOS LECCIÓN 5: HABITACIONES DE LA CASA ---
// =======================================================================
const ROOMS_VOCABULARY = {
    title: "Habitaciones de la Casa",
    sections: [
        {
            title: "🏠 Habitaciones Principales de una Casa",
            terms: [
                { es: "Sala de estar", en_formal: "Living room/Lounge(UK)", icon: "🛋️" },
                { es: "Comedor", en_formal: "Dining room", icon: "🍽️" },
                { es: "Cocina", en_formal: "Kitchen", icon: "🍳" },
                { es: "Dormitorio, habitación", en_formal: "Bedroom", icon: "🛏️" },
                { es: "Baño", en_formal: "Bathroom", icon: "🚽" },
                { es: "Pasillo", en_formal: "Hallway", icon: "🚪" },
                { es: "Jardín", en_formal: "Garden", icon: "🪴" },
                { es: "Recibidor", en_formal: "Entrance hall / Foyer", icon: "" }     
            ]
        },
        {
            title: "🛏️ Habitaciones Relacionadas con el Dormir",
            terms: [
                { es: "Dormitorio principal", en_formal: "Main bedroom", icon: "👑" },
                { es: "Cuarto de invitados", en_formal: "Guest room / Spare room", icon: "🧑‍🤝‍🧑" },
                { es: "Cuarto del bebé", en_formal: "Nursery", icon: "🍼" },
                { es: "Cuarto infantil", en_formal: "Children's room", icon: "🧸" }
            ]
        },
        {
            title: "💼 Habitaciones Funcionales",
            terms: [
                { es: "Despacho / Estudio", en_formal: "Home office / Study", icon: "💼" },
                { es: "Despensa", en_formal: "Pantry", icon: "🥫" },
                { es: "Cuarto de lavado", en_formal: "Laundry room", icon: "🧺" },
                { es: "Trastero", en_formal: "Storage room / Storeroom", icon: "📦" },
                { es: "Garaje", en_formal: "Garage", icon: "🚗" },
                { es: "Taller", en_formal: "Workshop", icon: "🛠️" }
            ]
        },
        {
            title: "🎮 Habitaciones de Ocio",
            terms: [
                { es: "Sala de juegos", en_formal: "Game room", icon: "🎮" },
                { es: "Sala de cine en casa", en_formal: "Home theater / Media room", icon: "🎬" },
                { es: "Biblioteca", en_formal: "Library", icon: "📚" },
                { es: "Gimnasio", en_formal: "Gym / Exercise room", icon: "💪" }
            ]
        },
        {
            title: "🛁 Cuidado Personal",
            terms: [
                { es: "Baño conectado a Dormitorio", en_formal: "En-suite bathroom", icon: "🚿" },
                { es: "Vestidor", en_formal: "Walk-in closet / Dressing room", icon: "👗" },
                { es: "Sauna", en_formal: "Sauna", icon: "🧖" }
            ]
        },
        {
            title: "🏰 Habitaciones Especializadas",
            terms: [
                { es: "Sótano", en_formal: "Cellar / Basement", icon: "📦" },
                { es: "Ático, desván", en_formal: "Attic / Loft", icon: "🕸️" },
                { es: "Bodega (de vino)", en_formal: "Wine cellar", icon: "🍷" }
            ]
        }
    ],
    exercises: [
        {
            type: 'imageChoice',
            question: '¿Qué habitación es esta?',
            icon: '🛋️',
            options: ['Living room', 'Kitchen', 'Bedroom', 'Bathroom'],
            answer: 'Living room'
        },
        {
            type: 'imageChoice',
            question: '¿Qué habitación es esta?',
            icon: '🍳',
            options: ['Dining room', 'Kitchen', 'Garage', 'Laundry room'],
            answer: 'Kitchen'
        },
        {
            type: 'imageChoice',
            question: '¿Dónde aparcas el coche?',
            icon: '🚗',
            options: ['Attic', 'Basement', 'Garage', 'Study'],
            answer: 'Garage'
        },
        {
            type: 'imageChoice',
            question: '¿Cómo se llama el cuarto de los invitados?',
            icon: '🧑‍🤝‍🧑',
            options: ['Guest room', 'Master bedroom', 'Nursery', 'Children\'s room'],
            answer: 'Guest room'
        },
        {
            type: 'imageChoice',
            question: '¿Dónde lavas la ropa?',
            icon: '🧺',
            options: ['Pantry', 'Workshop', 'Bathroom', 'Laundry room'],
            answer: 'Laundry room'
        },
        {
            type: 'multipleChoice',
            question: '"Attic" y "Loft" se refieren a...',
            options: ['El sótano', 'El ático o desván', 'El garaje', 'La despensa'],
            answer: 'El ático o desván'
        }
    ]
};

// =======================================================================
// --- ¡NUEVA LECCIÓN! DATOS LECCIÓN 6: PARTES DEL CUERPO ---
// =======================================================================
const BODY_PARTS_VOCABULARY = {
    title: "Partes del Cuerpo",
    exercises: [
        {
            type: 'bodyParts',
            question: 'Completa el nombre de cada parte del cuerpo señalada en la imagen.',
            imageUrl: 'body-parts.png', 
            parts: [
                { name: 'head', x: 12, y: 15 },  //1
                { name: 'hair', x: 90, y: 4.5 },   //2
                { name: 'stomach', x: 10, y: 49 },   //3
                { name: 'ear', x: 88, y: 23 },   //4
                { name: 'chest', x: 10, y: 40 },  //5
                { name: 'neck', x: 88, y: 33 },  //6
                { name: 'eyebrow', x: 50, y: 12 },
                { name: 'eye', x: 50, y: 17.5 }, //8
                { name: 'nose', x: 50, y: 23.5 },
                { name: 'mouth', x: 50, y: 30 },   //10
                { name: 'chin', x: 50, y: 36.5 },
                { name: 'arm', x: 48, y: 43 },
                { name: 'elbow', x: 48, y: 50 },
                { name: 'hand', x: 48, y: 56.5 },
                { name: 'finger', x: 48, y: 66 }, //15
                { name: 'foot', x: 46, y: 82 },
                { name: 'Knee', x: 46, y: 76 },
                { name: 'leg', x: 13, y: 69 },
                { name: 'toe', x: 13, y: 88 },
                { name: 'shoulder', x: 90, y: 39 }, //20
                { name: 'back', x: 89, y: 45 },
                { name: 'buttocks', x: 86.5, y: 68.3 },
                { name: 'heel', x: 78, y: 92 },
            ]
        }
    ]
};

// =======================================================================
// --- ¡NUEVA LECCIÓN! DATOS LECCIÓN 7: DECIR LA HORA ---
// =======================================================================
const createClockSVG = (hour, minute) => {
    const hourAngle = (hour % 12 + minute / 60) * 30;
    const minuteAngle = minute * 6;
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="48" fill="var(--card-bg)" stroke="var(--text-color)" stroke-width="3"/><g fill="var(--subtle-text)">${Array.from({length:12}).map((_,i)=>{const angle=i*30;return `<rect x="49" y="6" width="2" height="8" rx="1" transform="rotate(${angle} 50 50)"/>`}).join('')}</g><line x1="50" y1="50" x2="${50+28*Math.sin(hourAngle*Math.PI/180)}" y2="${50-28*Math.cos(hourAngle*Math.PI/180)}" stroke="var(--text-color)" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="50" x2="${50+40*Math.sin(minuteAngle*Math.PI/180)}" y2="${50-40*Math.cos(minuteAngle*Math.PI/180)}" stroke="var(--text-color)" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="50" r="3" fill="var(--primary-color)" stroke="var(--text-color)" stroke-width="1"/></svg>`;
};

const TIME_VOCABULARY = {
    title: "Decir la Hora (Telling the Time)",
    sections: [
        {
            title: "🕒 Preguntar la Hora",
            terms: [
                { es: "¿Qué hora es?", en_formal: "What time is it?", en_informal: "What's the time?" },
                { es: "¿Tienes hora?", en_formal: "Do you have the time?", en_informal: "Got the time?" }
            ]
        },
        {
            title: "⏰ En Punto (O'Clock)",
            terms: [
                { es: "Se usa solo para la hora exacta.", en_formal: "It's one o'clock.", en_informal: "Es la una en punto." },
                { es: "No se dice '13 o'clock'.", en_formal: "It's seven o'clock.", en_informal: "Son las siete en punto." }
            ]
        },
        {
            title: "▶️ Sistema 'Past' y 'To'",
            terms: [
                { es: "'Past' (y/pasadas)", en_formal: "Para los minutos 1-30.", en_informal: "It's ten past three (3:10)" },
                { es: "'To' (menos)", en_formal: "Para los minutos 31-59.", en_informal: "It's twenty to five (4:40)" }
            ]
        },
        {
            title: "🔄 Casos Especiales: Quarter y Half",
            terms: [
                { es: "Y cuarto (15 min)", en_formal: "It's a quarter past...", en_informal: "a quarter past six (6:15)" },
                { es: "Y media (30 min)", en_formal: "It's half past...", en_informal: "half past nine (9:30)" },
                { es: "Menos cuarto (45 min)", en_formal: "It's a quarter to...", en_informal: "a quarter to twelve (11:45)" }
            ]
        },
        {
            title: "🔢 Formato Digital",
            terms: [
                { es: "Se leen los números tal cual.", en_formal: "It's seven twenty-five.", en_informal: "7:25" },
                { es: "Para '0' en minutos, se puede decir 'oh'.", en_formal: "It's four oh five.", en_informal: "4:05" },
                 { es: "Es el formato más común hoy en día.", en_formal: "It's ten forty-five.", en_informal: "10:45" }
            ]
        },
        {
            title: "☀️ AM / PM 🌙",
            terms: [
                { es: "AM (Ante Meridiem)", en_formal: "Desde medianoche hasta mediodía.", en_informal: "12:00 AM - 11:59 AM" },
                { es: "PM (Post Meridiem)", en_formal: "Desde mediodía hasta medianoche.", en_informal: "12:00 PM - 11:59 PM" },
                { es: "Mediodía", en_formal: "Midday / Noon", en_informal: "12:00 PM" },
                { es: "Medianoche", en_formal: "Midnight", en_informal: "12:00 AM" }
            ]
        }
    ],
    exercises: [
        { type: 'imageChoice', question: '¿Qué hora es?', icon: createClockSVG(3, 0), options: ["It's twelve o'clock", "It's three o'clock", "It's thirty o'clock", "It's three past zero"], answer: "It's three o'clock" },
        { type: 'imageChoice', question: '¿Qué hora es?', icon: createClockSVG(5, 10), options: ["It's ten to five", "It's five and ten", "It's ten past five", "It's fifty past ten"], answer: "It's ten past five" },
        { type: 'imageChoice', question: '¿Qué hora es?', icon: createClockSVG(1, 15), options: ["It's fifteen past one", "It's a quarter past one", "It's one and a quarter", "It's a quarter to one"], answer: "It's a quarter past one" },
        { type: 'imageChoice', question: '¿Qué hora es?', icon: createClockSVG(10, 45), options: ["It's forty-five past ten", "It's ten forty-five", "It's a quarter past ten", "It's a quarter to eleven"], answer: "It's a quarter to eleven" },
        { type: 'imageChoice', question: '¿Qué hora es?', icon: createClockSVG(6, 40), options: ["It's forty past six", "It's twenty to seven", "It's twenty past six", "It's forty to seven"], answer: "It's twenty to seven" },
        {
            type: 'multipleChoice',
            question: '¿Cómo se dice <span class="digital-time">08:30</span> en inglés?',
            options: ["It's thirty past eight", "It's half past eight", "It's eight thirty", "Tanto 'half past eight' como 'eight thirty' son correctas"],
            answer: "Tanto 'half past eight' como 'eight thirty' son correctas"
        },
        {
            type: 'fillInTheBlank',
            question: 'Completa la frase para la hora <span class="digital-time">04:25</span>: It\'s twenty-five ____ four.',
            answer: 'past'
        },
        {
            type: 'multipleChoice',
            question: '¿Qué opción es correcta para las <span class="digital-time">12:05</span>?',
            options: ["It's five past twelve", "It's twelve oh-five", "Five minutes past noon", "Todas son correctas"],
            answer: "Todas son correctas"
        },
        {
            type: 'fillInTheBlank',
            question: 'Para decir <span class="digital-time">07:55</span> de forma tradicional, se dice: "It\'s five ____ eight".',
            answer: 'to'
        },
        {
            type: 'multipleChoice',
            question: 'La hora "twenty past two" corresponde a...',
            options: ["2:20", "2:30", "1:40", "12:20"],
            answer: "2:20"
        }
    ]
};

// =======================================================================
// --- ¡NUEVA LECCIÓN! DATOS LECCIÓN 8: DÍAS Y MESES ---
// =======================================================================
const DAYS_AND_MONTHS_VOCABULARY = {
    title: "Días y Meses",
    sections: [
        {
            title: "🗓️ Días de la Semana (Days of the Week)",
            terms: [
                { es: "Lunes", en_formal: "Monday" },
                { es: "Martes", en_formal: "Tuesday" },
                { es: "Miércoles", en_formal: "Wednesday" },
                { es: "Jueves", en_formal: "Thursday" },
                { es: "Viernes", en_formal: "Friday" },
                { es: "Sábado", en_formal: "Saturday" },
                { es: "Domingo", en_formal: "Sunday" }
            ]
        },
        {
            title: "📅 Meses del Año (Months of the Year)",
            terms: [
                { es: "Enero", en_formal: "January" },
                { es: "Febrero", en_formal: "February" },
                { es: "Marzo", en_formal: "March" },
                { es: "Abril", en_formal: "April" },
                { es: "Mayo", en_formal: "May" },
                { es: "Junio", en_formal: "June" },
                { es: "Julio", en_formal: "July" },
                { es: "Agosto", en_formal: "August" },
                { es: "Septiembre", en_formal: "September" },
                { es: "Octubre", en_formal: "October" },
                { es: "Noviembre", en_formal: "November" },
                { es: "Diciembre", en_formal: "December" }
            ]
        },
        {
            title: "✨ Vocabulario Relacionado",
            terms: [
                { es: "Día", en_formal: "Day" },
                { es: "Semana", en_formal: "Week" },
                { es: "Fin de semana", en_formal: "Weekend" },
                { es: "Mes", en_formal: "Month" },
                { es: "Año", en_formal: "Year" },
                { es: "Hoy", en_formal: "Today" },
                { es: "Ayer", en_formal: "Yesterday" },
                { es: "Mañana", en_formal: "Tomorrow" }
            ]
        }
    ],
    exercises: [
        {
            type: 'matching',
            title: 'Empareja los días de la semana',
            pairs: [
                { es: "Lunes", en: "Monday" },
                { es: "Miércoles", en: "Wednesday" },
                { es: "Viernes", en: "Friday" },
                { es: "Domingo", en: "Sunday" }
            ]
        },
        {
            type: 'matching',
            title: 'Empareja los meses del año',
            pairs: [
                { es: "Enero", en: "January" },
                { es: "Abril", en: "April" },
                { es: "Julio", en: "July" },
                { es: "Octubre", en: "October" }
            ]
        },
        {
            type: 'multipleChoice',
            question: '¿Qué día va después de "Tuesday"?',
            options: ['Monday', 'Thursday', 'Wednesday', 'Friday'],
            answer: 'Wednesday'
        },
        {
            type: 'multipleChoice',
            question: '¿Qué mes está entre "July" y "September"?',
            options: ['June', 'October', 'August', 'May'],
            answer: 'August'
        },
        {
            type: 'fillInTheBlank',
            question: 'El día antes de "Sunday" es ____.',
            answer: 'Saturday'
        },
        {
            type: 'fillInTheBlank',
            question: 'El segundo mes del año es "February", que en español es ____.',
            answer: 'Febrero'
        },
        {
            type: 'multipleChoice',
            question: 'El "weekend" está formado por...',
            options: ['Monday and Tuesday', 'Friday and Saturday', 'Saturday and Sunday', 'Sunday and Monday'],
            answer: 'Saturday and Sunday'
        }
    ]
};

// =======================================================================
// --- ¡NUEVA LECCIÓN! DATOS LECCIÓN 9: EL TIEMPO (CLIMA) ---
// =======================================================================
const WEATHER_VOCABULARY = {
    title: "El Tiempo (The Weather)",
    sections: [
        {
            title: "☀️ Condiciones Generales y Temperatura",
            terms: [
                { es: "Soleado", en_formal: "Sunny" },
                { es: "Nublado", en_formal: "Cloudy" },
                { es: "Lluvioso", en_formal: "Rainy" },
                { es: "Ventoso", en_formal: "Windy" },
                { es: "Nevado", en_formal: "Snowy" },
                { es: "Caluroso", en_formal: "Hot" },
                { es: "Cálido / Templado", en_formal: "Warm" },
                { es: "Fresco", en_formal: "Cool" },
                { es: "Frío", en_formal: "Cold" },
                { es: "Helado / Congelado", en_formal: "Freezing" }
            ]
        },
        {
            title: "💧 Precipitación y Cielo",
            terms: [
                { es: "Lluvia", en_formal: "Rain" },
                { es: "Llovizna", en_formal: "Drizzle" },
                { es: "Chubasco / Chaparrón", en_formal: "Shower" },
                { es: "Nieve", en_formal: "Snow" },
                { es: "Granizo", en_formal: "Hail" },
                { es: "Niebla", en_formal: "Fog" },
                { es: "Bruma / Neblina", en_formal: "Mist" },
                { es: "Despejado", en_formal: "Clear" },
                { es: "Cubierto / Encráulico", en_formal: "Overcast" }
            ]
        },
        {
            title: "🌪️ Fenómenos Extremos",
            terms: [
                { es: "Tormenta", en_formal: "Storm" },
                { es: "Tormenta eléctrica", en_formal: "Thunderstorm" },
                { es: "Rayo / Relámpago", en_formal: "Lightning" },
                { es: "Trueno", en_formal: "Thunder" },
                { es: "Inundación", en_formal: "Flood" },
                { es: "Sequía", en_formal: "Drought" },
                { es: "Huracán", en_formal: "Hurricane" }
            ]
        },
        {
            title: "💬 Frases Útiles",
            terms: [
                { es: "¿Qué tiempo hace?", en_formal: "What's the weather like?" },
                { es: "Hace sol.", en_formal: "It's sunny." },
                { es: "Está lloviendo.", en_formal: "It's raining." },
                { es: "Hace frío hoy.", en_formal: "It's cold today." }
            ]
        }
    ],
    exercises: [
        { type: 'imageChoice', question: '¿Qué tiempo hace?', icon: '☀️', options: ["It's cloudy", "It's sunny", "It's hot", "It's clear"], answer: "It's sunny" },
        { type: 'imageChoice', question: '¿Qué tiempo hace?', icon: '🌧️', options: ["It's drizzling", "It's a shower", "It's raining", "It's a storm"], answer: "It's raining" },
        { type: 'imageChoice', question: '¿Qué tiempo hace?', icon: '❄️', options: ["It's hailing", "It's cold", "It's snowing", "It's freezing"], answer: "It's snowing" },
        { type: 'imageChoice', question: '¿Qué tiempo hace?', icon: '💨', options: ["It's windy", "It's a breeze", "It's stormy", "It's cool"], answer: "It's windy" },
        {
            type: 'matching',
            title: 'Empareja la temperatura',
            pairs: [
                { es: "Caluroso", en: "Hot" },
                { es: "Fresco", en: "Cool" },
                { es: "Frío", en: "Cold" },
                { es: "Templado", en: "Warm" }
            ]
        },
        {
            type: 'multipleChoice',
            question: 'Una lluvia muy ligera se llama...',
            options: ['Shower', 'Drizzle', 'Downpour', 'Flood'],
            answer: 'Drizzle'
        },
        {
            type: 'multipleChoice',
            question: 'El flash de luz durante una tormenta es...',
            options: ['Thunder', 'Fog', 'Lightning', 'Storm'],
            answer: 'Lightning'
        },
        {
            type: 'fillInTheBlank',
            question: 'Cuando hace muchísimo frío, puedes decir que está ____.',
            answer: 'freezing'
        }
    ]
};

// =======================================================================
// --- ¡NUEVA LECCIÓN! DATOS LECCIÓN 10: EMOCIONES Y SENTIMIENTOS ---
// =======================================================================
const EMOTIONS_VOCABULARY = {
    title: "Emociones y Sentimientos",
    sections: [
        {
            title: "😊 Sentimientos Positivos",
            terms: [
                { es: "Feliz", en_formal: "Happy" },
                { es: "Emocionado/a", en_formal: "Excited" },
                { es: "Orgulloso/a", en_formal: "Proud" },
                { es: "Tranquilo/a, en calma", en_formal: "Calm" },
                { es: "Relajado/a", en_formal: "Relaxed" },
                { es: "Seguro/a de sí mismo/a", en_formal: "Confident" }
            ]
        },
        {
            title: "☹️ Sentimientos Negativos",
            terms: [
                { es: "Triste", en_formal: "Sad" },
                { es: "Enojado/a, enfadado/a", en_formal: "Angry" },
                { es: "Asustado/a, con miedo", en_formal: "Scared / Afraid" },
                { es: "Preocupado/a", en_formal: "Worried" },
                { es: "Cansado/a", en_formal: "Tired" },
                { es: "Aburrido/a", en_formal: "Bored" }
            ]
        },
        {
            title: "🤔 Sentimientos Complejos",
            terms: [
                { es: "Sorprendido/a", en_formal: "Surprised" },
                { es: "Confundido/a", en_formal: "Confused" },
                { es: "Avergonzado/a", en_formal: "Embarrassed" },
                { es: "Celoso/a", en_formal: "Jealous" },
                { es: "Tímido/a", en_formal: "Shy" }
            ]
        },
        {
            title: "💬 Frases Útiles",
            terms: [
                { es: "¿Cómo te sientes?", en_formal: "How do you feel?" },
                { es: "Me siento feliz.", en_formal: "I feel happy." },
                { es: "¿Estás bien?", en_formal: "Are you okay?" },
                { es: "Estoy un poco cansado/a.", en_formal: "I'm a bit tired." }
            ]
        }
    ],
    exercises: [
        { type: 'imageChoice', question: '¿Cómo se siente?', icon: '😊', options: ["Sad", "Angry", "Happy", "Tired"], answer: "Happy" },
        { type: 'imageChoice', question: '¿Cómo se siente?', icon: '😠', options: ["Happy", "Angry", "Scared", "Bored"], answer: "Angry" },
        { type: 'imageChoice', question: '¿Cómo se siente?', icon: '😢', options: ["Sad", "Excited", "Proud", "Confident"], answer: "Sad" },
        { type: 'imageChoice', question: '¿Cómo se siente?', icon: '🤔', options: ["Surprised", "Jealous", "Confused", "Shy"], answer: "Confused" },
        {
            type: 'matching',
            title: 'Empareja el sentimiento',
            pairs: [
                { es: "Asustado", en: "Scared" },
                { es: "Orgulloso", en: "Proud" },
                { es: "Preocupado", en: "Worried" },
                { es: "Relajado", en: "Relaxed" }
            ]
        },
        {
            type: 'multipleChoice',
            question: 'Si ganas un premio, probablemente te sientas...',
            options: ['Sad', 'Bored', 'Proud', 'Angry'],
            answer: 'Proud'
        },
        {
            type: 'fillInTheBlank',
            question: 'Cuando no entiendes algo, te sientes ____.',
            answer: 'confused'
        }
    ]
};

// =======================================================================
// --- ¡NUEVA LECCIÓN! DATOS LECCIÓN 11: ROPA Y MODA ---
// =======================================================================
const CLOTHING_VOCABULARY = {
    title: "Ropa y Moda",
    sections: [
        {
            title: "👕 Parte Superior (Tops)",
            terms: [
                { es: "Camiseta", en_formal: "T-shirt" },
                { es: "Camisa", en_formal: "Shirt" },
                { es: "Blusa", en_formal: "Blouse" },
                { es: "Suéter, jersey", en_formal: "Sweater / Jumper" },
                { es: "Chaqueta", en_formal: "Jacket" },
                { es: "Abrigo", en_formal: "Coat" }
            ]
        },
        {
            title: "👖 Parte Inferior (Bottoms)",
            terms: [
                { es: "Pantalones", en_formal: "Trousers / Pants" },
                { es: "Vaqueros, jeans", en_formal: "Jeans" },
                { es: "Pantalones cortos", en_formal: "Shorts" },
                { es: "Falda", en_formal: "Skirt" }
            ]
        },
        {
            title: "👗 Ropa de Cuerpo Entero y Calzado",
            terms: [
                { es: "Vestido", en_formal: "Dress" },
                { es: "Traje", en_formal: "Suit" },
                { es: "Chándal", en_formal: "Tracksuit" },
                { es: "Zapatos", en_formal: "Shoes" },
                { es: "Botas", en_formal: "Boots" },
                { es: "Zapatillas de deporte", en_formal: "Trainers / Sneakers" },
                { es: "Sandalias", en_formal: "Sandals" }
            ]
        },
        {
            title: "👒 Accesorios y Otros",
            terms: [
                { es: "Sombrero / Gorro", en_formal: "Hat" },
                { es: "Bufanda", en_formal: "Scarf" },
                { es: "Guantes", en_formal: "Gloves" },
                { es: "Cinturón", en_formal: "Belt" },
                { es: "Corbata", en_formal: "Tie" },
                { es: "Gafas", en_formal: "Glasses" },
                { es: "Calcetines", en_formal: "Socks" },
                { es: "Pijama", en_formal: "Pyjamas" }
            ]
        }
    ],
    exercises: [
        { type: 'imageChoice', question: '¿Qué prenda es?', icon: '👕', options: ["Shirt", "T-shirt", "Blouse", "Sweater"], answer: "T-shirt" },
        { type: 'imageChoice', question: '¿Qué prenda es?', icon: '👖', options: ["Trousers", "Shorts", "Jeans", "Tracksuit"], answer: "Jeans" },
        { type: 'imageChoice', question: '¿Qué prenda es?', icon: '👗', options: ["Skirt", "Suit", "Coat", "Dress"], answer: "Dress" },
        { type: 'imageChoice', question: '¿Qué calzado es?', icon: '👟', options: ["Shoes", "Boots", "Sandals", "Trainers"], answer: "Trainers" },
        {
            type: 'multipleChoice',
            question: '¿Qué te pones en los pies en invierno?',
            options: ['Sandals', 'Boots', 'Shorts', 'A hat'],
            answer: 'Boots'
        },
        {
            type: 'multipleChoice',
            question: 'Un atuendo formal para un hombre suele ser un...',
            options: ['Tracksuit', 'Dress', 'Suit', 'T-shirt'],
            answer: 'Suit'
        },
        {
            type: 'fillInTheBlank',
            question: 'Para mantener tus manos calientes, te pones ____.',
            answer: 'gloves'
        },
        {
            type: 'matching',
            title: 'Empareja los accesorios',
            pairs: [
                { es: "Cinturón", en: "Belt" },
                { es: "Bufanda", en: "Scarf" },
                { es: "Corbata", en: "Tie" },
                { es: "Gafas", en: "Glasses" }
            ]
        }
    ]
};


const VOCABULARY_MODULES_ENGLISH = [
    { id: 1, title: 'Greetings', description: 'Saludos y despedidas', minLevel: 1, wordCount: 25, data: GREETINGS_VOCABULARY },
    { id: 2, title: 'The Family', description: 'Miembros de la familia', minLevel: 1, wordCount: 30, data: THE_FAMILY_VOCABULary },
    { id: 3, title: 'Body Parts', description: 'Aprende el cuerpo humano', minLevel: 1, wordCount: 19, data: BODY_PARTS_VOCABULARY },
    { id: 4, title: 'Days and Months', description: 'El calendario', minLevel: 1, wordCount: 27, data: DAYS_AND_MONTHS_VOCABULARY },
    { id: 5, title: 'Colors', description: 'Colores, tonos y matices', minLevel: 2, wordCount: 54, data: COLORS_VOCABULARY },
    { id: 6, title: 'The Weather', description: 'Vocabulario del clima', minLevel: 2, wordCount: 30, data: WEATHER_VOCABULARY },
    { id: 7, title: 'Emotions', description: 'Sentimientos y estados de ánimo', minLevel: 2, wordCount: 25, data: EMOTIONS_VOCABULARY },
    { id: 8, title: 'Numbers 0-1 Billion', description: 'Aprende a contar', minLevel: 2, wordCount: 40, data: NUMBERS_VOCABULARY },
    { id: 9, title: 'The House', description: 'Habitaciones y partes de la casa', minLevel: 3, wordCount: 30, data: ROOMS_VOCABULARY },
    { id: 10, title: 'Telling the Time', description: 'Aprende a decir la hora', minLevel: 3, wordCount: 20, data: TIME_VOCABULARY },
    { id: 11, title: 'Clothing', description: 'Ropa, calzado y accesorios', minLevel: 3, wordCount: 35, data: CLOTHING_VOCABULARY },
    { id: 12, title: 'At the Restaurant', description: 'Comida y cómo ordenar', minLevel: 4, wordCount: 40 },
    { id: 13, 'title': 'Daily Routines', description: 'Verbos y actividades', minLevel: 5, wordCount: 35 },
    { id: 14, title: 'Traveling', description: 'En el aeropuerto y hotel', minLevel: 6, wordCount: 50 },
    { id: 15, title: 'At Work', description: 'Profesiones y oficina', minLevel: 7, wordCount: 45 },
    { id: 16, title: 'Future Tenses', description: 'Gramática avanzada', minLevel: 8, wordCount: 25 },
    { id: 17, title: 'Idioms', description: 'Expresiones comunes', minLevel: 9, wordCount: 30 }
];

const VOCABULARY_MODULES_CZECH = [
    { id: 1, title: 'Pozdravy', description: 'Saludos y despedidas', minLevel: 1, wordCount: 15 },
    { id: 2, title: 'Rodina', description: 'Miembros de la familia', minLevel: 1, wordCount: 20 },
    { id: 3, title: 'Barvy a čísla', description: 'Colores y números', minLevel: 2, wordCount: 30 },
    { id: 4, title: 'V restauraci', description: 'Comida y cómo ordenar', minLevel: 3, wordCount: 40 },
    { id: 5, title: 'Denní rutina', description: 'Verbos y actividades', minLevel: 4, wordCount: 35 },
    { id: 6, title: 'Cestování', description: 'En el aeropuerto y hotel', minLevel: 5, wordCount: 50 },
    { id: 7, title: 'V práci', description: 'Profesiones y oficina', minLevel: 6, wordCount: 45 },
    { id: 8, title: 'Budoucí časy', description: 'Gramática avanzada', minLevel: 7, wordCount: 25 },
    { id: 9, title: 'Idiomy', description: 'Expresiones comunes', minLevel: 8, wordCount: 30 }
];


const LESSONS = {
    'Inglés': VOCABULARY_MODULES_ENGLISH,
    'Checo': VOCABULARY_MODULES_CZECH
};


const LEAGUES = [
    { name: 'Bronce', minLevel: 0, icon: '🥉', color: '#CD7F32' },
    { name: 'Plata', minLevel: 10, icon: '🥈', color: '#C0C0C0' },
    { name: 'Oro', minLevel: 30, icon: '🥇', color: '#FFD700' },
    { name: 'Diamante', minLevel: 50, icon: '💎', color: '#4299E1' }
];

const DAILY_REWARDS = [
    { day: 1, gems: 10, icon: '💎' },
    { day: 2, gems: 15, icon: '💎' },
    { day: 3, gems: 20, icon: '💎' },
    { day: 4, gems: 25, icon: '💎' },
    { day: 5, gems: 30, icon: '💎' },
    { day: 6, gems: 40, icon: '💎' },
    { day: 7, gems: 100, icon: '🎁' }
];